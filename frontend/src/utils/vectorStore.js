export function cosineSimilarity(a, b) {
  const dot = a.reduce((sum, v, i) => sum + v * b[i], 0)
  const magA = Math.sqrt(a.reduce((sum, v) => sum + v * v, 0))
  const magB = Math.sqrt(b.reduce((sum, v) => sum + v * v, 0))
  if (magA === 0 || magB === 0) return 0
  return dot / (magA * magB)
}

export function generateEmbeddingOpenAI(text) {
  // Returns OpenAI embeddings format (1536 dimensions for text-embedding-ada-002)
  const normalized = text.toLowerCase().replace(/[^\w\s]/g, '')
  const words = normalized.split(/\s+/).filter(w => w.length > 0)
  const vector = new Array(1536).fill(0)
  words.forEach((word, idx) => {
    const hash = word.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    vector[idx % 1536] ^= hash
  })
  const magnitude = Math.sqrt(vector.reduce((sum, v) => sum + v * v, 0))
  if (magnitude > 0) {
    vector.forEach((v, i) => (vector[i] = v / magnitude))
  }
  return vector
}

export function generateEmbeddingGemini(text) {
  // Returns Google Gemini embeddings format (768 dimensions)
  const normalized = text.toLowerCase().replace(/[^\w\s]/g, '')
  const words = normalized.split(/\s+/).filter(w => w.length > 0)
  const vector = new Array(768).fill(0)
  words.forEach((word, idx) => {
    const hash = word.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    vector[idx % 768] ^= hash
  })
  const magnitude = Math.sqrt(vector.reduce((sum, v) => sum + v * v, 0))
  if (magnitude > 0) {
    vector.forEach((v, i) => (vector[i] = v / magnitude))
  }
  return vector
}

export function findSimilarMemories(memories, query, topK = 3, dimensions = 1536) {
  const queryEmbedding = generateEmbeddingForDimensions(query, dimensions)
  const scored = memories.map(m => ({
    ...m,
    score: cosineSimilarity(queryEmbedding, m.embedding),
  }))
  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, topK)
}

function generateEmbeddingForDimensions(query, dimensions) {
  const normalized = query.toLowerCase().replace(/[^\w\s]/g, '')
  const words = normalized.split(/\s+/).filter(w => w.length > 0)
  const vector = new Array(dimensions).fill(0)
  words.forEach((word, idx) => {
    const hash = word.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    vector[idx % dimensions] ^= hash
  })
  const magnitude = Math.sqrt(vector.reduce((sum, v) => sum + v * v, 0))
  if (magnitude > 0) {
    vector.forEach((v, i) => (vector[i] = v / magnitude))
  }
  return vector
}

export function memoryToEmbedding(memoryText, model = 'openai') {
  if (model === 'openai') {
    return {
      embedding: generateEmbeddingOpenAI(memoryText),
      dimensions: 1536,
    }
  }
  return {
    embedding: generateEmbeddingGemini(memoryText),
    dimensions: 768,
  }
}