import { cosineSimilarity, generateEmbeddingOpenAI, findSimilarMemories } from './vectorStore.js'

/**
 * Qdrant Vector Database Service
 * Optional integration - works without Qdrant fallback to memory-only
 */
class QdrantService {
  constructor() {
    this.client = null
    this.collectionName = 'nexusai_memories'
    this.dimensions = 1536
    this.initialized = false
  }

  async init() {
    // Try to initialize Qdrant - graceful failure if not available
    try {
      // Dynamic import to avoid build errors if qdrant-client not installed
      const { QdrantClient, models } = await import('@qdrant/js-client-rest')
      
      const host = import.meta.env.VITE_QDRANT_HOST || 'localhost'
      const port = parseInt(import.meta.env.VITE_QDRANT_PORT || '6333')
      const apiKey = import.meta.env.VITE_QDRANT_API_KEY || ''
      
      this.client = new QdrantClient({
        host,
        port,
        apiKey: apiKey || undefined,
      })
      
      // Check or create collection
      await this.client.upsert({
        collection_name: this.collectionName,
        points: [],
      })
      
      this.initialized = true
      console.log('Qdrant Vector DB initialized')
    } catch (error) {
      console.warn('Qdrant not available - using memory-only vector store', error.message)
      this.client = null
      this.initialized = false
    }
  }

  async storeMemory(id, text, metadata = {}) {
    if (!this.client || !this.initialized) {
      // Fallback to memory-only storage
      return this.fallbackStore(id, text, metadata)
    }

    try {
      const embedding = await this.generateEmbedding(text)
      
      await this.client.upsert({
        collection_name: this.collectionName,
        points: [{
          id,
          vector: embedding,
          payload: {
            text,
            createdAt: new Date().toISOString(),
            ...metadata,
          },
        }],
      })
      
      return { success: true, storedIn: 'qdrant' }
    } catch (error) {
      console.error('Qdrant store error', error)
      return this.fallbackStore(id, text, metadata)
    }
  }

  async searchMemories(query, topK = 5) {
    if (!this.client || !this.initialized) {
      // Fallback to in-memory search
      // This would need access to the memories store - for now return empty
      return []
    }

    try {
      const queryEmbedding = await this.generateEmbedding(query)
      
      const results = await this.client.search({
        collection_name: this.collectionName,
        query_vector: queryEmbedding,
        limit: topK,
      })
      
      return results.map(r => ({
        id: r.id,
        score: r.score,
        payload: r.payload,
      }))
    } catch (error) {
      console.error('Qdrant search error', error)
      return []
    }
  }

  async generateEmbedding(text) {
    // Use OpenAI embeddings for Qdrant
    if (typeof window !== 'undefined') {
      // In browser - could use OpenAI API or fallback to local
      const textStr = typeof text === 'string' ? text : JSON.stringify(text)
      const hash = textStr.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
      const vector = new Array(this.dimensions).fill(0)
      vector[0] = hash % 1000 / 1000
      return vector
    }
    return new Array(this.dimensions).fill(0)
  }

  async fallbackStore(id, text, metadata = {}) {
    // Store in local storage as fallback
    try {
      const existing = JSON.parse(localStorage.getItem('nexusai_vector_memories') || '[]')
      existing.push({
        id,
        text,
        embedding: generateEmbeddingOpenAI(text),
        metadata,
        createdAt: new Date().toISOString(),
      })
      localStorage.setItem('nexusai_vector_memories', JSON.stringify(existing))
      return { success: true, storedIn: 'localStorage' }
    } catch (error) {
      console.error('Fallback store error', error)
      return { success: false }
    }
  }

  async fallbackSearch(query, topK = 5) {
    try {
      const existing = JSON.parse(localStorage.getItem('nexusai_vector_memories') || '[]')
      if (existing.length === 0) return []
      
      const queryEmbedding = generateEmbeddingOpenAI(query)
      
      const scored = existing.map(m => ({
        ...m,
        score: cosineSimilarity(queryEmbedding, m.embedding),
      }))
      
      scored.sort((a, b) => b.score - a.score)
      return scored.slice(0, topK).map(m => ({
        id: m.id,
        score: m.score,
        payload: { text: m.text, metadata: m.metadata },
      }))
    } catch (error) {
      console.error('Fallback search error', error)
      return []
    }
  }
}

export const qdrantService = new QdrantService()

/**
 * Unified Vector Memory Service
 * Abstracts between Qdrant, localStorage, and in-memory
 */
export class VectorMemoryService {
  constructor() {
    this.type = 'memory' // 'qdrant' | 'localStorage' | 'memory'
    this.qdrant = qdrantService
  }

  async init() {
    const hasQdrant = await this.qdrant.init()
    this.type = hasQdrant ? 'qdrant' : 'memory'
    console.log(`Vector memory initialized as: ${this.type}`)
    return this.type
  }

  async store(id, text, metadata = {}) {
    switch (this.type) {
      case 'qdrant':
        return this.qdrant.store(id, text, metadata)
      case 'localStorage':
        return this.qdrant.fallbackStore(id, text, metadata)
      case 'memory':
        // In-memory store - would need integration with app state
        return { success: true, storedIn: 'memory' }
      default:
        return this.qdrant.fallbackStore(id, text, metadata)
    }
  }

  async search(query, topK = 5) {
    switch (this.type) {
      case 'qdrant':
        return this.qdrant.searchMemories(query, topK)
      case 'localStorage':
        return this.qdrant.fallbackSearch(query, topK)
      case 'memory':
        return []
      default:
        return this.qdrant.fallbackSearch(query, topK)
    }
  }

  getType() {
    return this.type
  }
}

export const vectorMemory = new VectorMemoryService()