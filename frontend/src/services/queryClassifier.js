/**
 * Query Type Classifier for Model Routing
 * Analyzes user queries and classifies them into types
 * to route to the optimal LLM model.
 */

const CLASSIFICATION_RULES = {
  // Math and logic queries - need strong reasoning
  MATH: {
    patterns: [/(\d+[\+\-\*/\^]\d+)|(algebra)|(calculate)|(solve)|(equation)|(formula)/i],
    minMatch: 1,
    label: 'Math/Logic',
  },
  // Code related
  CODE: {
    patterns: [/(function|var|let|const|def|import|from|class|const|const)/i, /(```|code|program|script|function)/i],
    minMatch: 1,
    label: 'Code',
  },
  // Creative writing
  CREATIVE: {
    patterns: [/(story|poem|write|create|imagine|narrative)/i],
    minMatch: 1,
    label: 'Creative',
  },
  // Analysis and research
  ANALYSIS: {
    patterns: [/(analyze|review|compare|evaluate|explain|discuss|research)/i],
    minMatch: 1,
    label: 'Analysis',
  },
  // Extraction and summarization
  EXTRACTION: {
    patterns: [/(extract|summarize|key points|highlights|digest)/i],
    minMatch: 1,
    label: 'Extraction',
  },
  // Chat/conversational
  CHAT: {
    patterns: [/^(hello|hi|hey|how are|what's up)/i],
    minMatch: 1,
    label: 'Chat',
  },
}

/**
 * Classify a user query into a type based on pattern matching
 * @param {string} query - The user's query text
 * @returns {object} Classification result with type and confidence
 */
export function classifyQuery(query) {
  if (!query || typeof query !== 'string') {
    return { type: 'CHAT', confidence: 0.8, labeled: true }
  }

  const lowerQuery = query.toLowerCase()
  const results = []

  Object.entries(CLASSIFICATION_RULES).forEach(([type, rules]) => {
    const matches = rules.patterns.filter(pattern => pattern.test(lowerQuery))
    if (matches.length >= rules.minMatch) {
      results.push({
        type,
        matchCount: matches.length,
        label: rules.label,
      })
    }
  })

  // If no specific type matched, default to CHAT
  if (results.length === 0) {
    return { type: 'CHAT', confidence: 0.6, labeled: true }
  }

  // Sort by match count (most specific first)
  results.sort((a, b) => b.matchCount - a.matchCount)

  // Calculate confidence based on how many patterns matched
  const topResult = results[0]
  const totalPatterns = Object.values(CLASSIFICATION_RULES).reduce(
    (sum, rules) => sum + rules.patterns.length,
    0
  )
  const confidence = Math.min(0.9, 0.5 + topResult.matchCount * 0.15)

  return {
    type: topResult.type,
    confidence: Math.round(confidence * 100) / 100,
    labeled: true,
    allMatches: results,
  }
}

/**
 * Map query type to optimal model configuration
 * @param {string} queryType - The classified query type
 * @returns {object} Model recommendation with reasoning
 */
export function getModelForQueryType(queryType) {
  const modelMap = {
    MATH: {
      model: 'gpt-4o-mini',
      reason: 'Strong reasoning and math capabilities',
      temperature: 0.3,
    },
    CODE: {
      model: 'gpt-4o-mini',
      reason: 'Best for code generation and debugging',
      temperature: 0.2,
    },
    CREATIVE: {
      model: 'gemini-flash',
      reason: 'Excellent creative writing and ideas',
      temperature: 0.8,
    },
    ANALYSIS: {
      model: 'gpt-4o-mini',
      reason: 'Balanced reasoning for analysis tasks',
      temperature: 0.4,
    },
    EXTRACTION: {
      model: 'gpt-4o-mini',
      reason: 'Precise extraction and summarization',
      temperature: 0.3,
    },
    CHAT: {
      model: 'gpt-4o-mini',
      reason: 'General purpose conversation',
      temperature: 0.7,
    },
  }

  const config = modelMap[queryType] || modelMap.CHAT
  return {
    ...config,
    queryType,
  }
}

/**
 * Get model recommendation based on query analysis
 * Combines classification and routing in one call
 * @param {string} query - The user's query
 * @returns {object} Full recommendation with model, type, and settings
 */
export function getQueryRoutingRecommendation(query) {
  const classification = classifyQuery(query)
  const modelConfig = getModelForQueryType(classification.type)

  return {
    query,
    classifiedType: classification.type,
    model: modelConfig.model,
    temperature: modelConfig.temperature,
    reason: modelConfig.reason,
    confidence: classification.confidence,
    labeled: classification.labeled,
  }
}

export default { classifyQuery, getModelForQueryType, getQueryRoutingRecommendation }