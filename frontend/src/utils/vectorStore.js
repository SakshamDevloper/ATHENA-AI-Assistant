export function cosineSimilarity(a, b) {
  const dot = a.reduce((sum, v, i) => sum + v * b[i], 0)
  const magA = Math.sqrt(a.reduce((sum, v) => sum + v * v, 0))
  const magB = Math.sqrt(b.reduce((sum, v) => sum + v * v, 0))
  if (magA === 0 || magB === 0) return 0
  return dot / (magA * magB)
}

export function generateEmbedding(text) {
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

export function findSimilarMemories(memory embeddings, query, topK = 3) {
  const queryEmbedding = generateEmbedding(query)
  const scores = memories.map(m => ({
    ...m,
    score: cosineSimilarity(queryEmbedding, m.embedding),
  }))
  scores.sort((a, b) => b.score - a.score)
  return scores.slice(0, topK)
}