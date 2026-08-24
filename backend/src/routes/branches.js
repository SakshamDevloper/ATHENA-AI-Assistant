import { Router } from 'express'
import { getCollection } from '../services/memory/store.js'

const router = Router()

router.post('/', async (req, res) => {
  try {
    const { parentSessionId, parentMessageId, title } = req.body
    if (!parentSessionId || !parentMessageId) {
      return res.status(400).json({ error: 'parentSessionId and parentMessageId required' })
    }

    const sessions = getCollection('conversations')
    const parent = await sessions.findOne({ id: parentSessionId })
    if (!parent) return res.status(404).json({ error: 'Parent session not found' })

    const branchPoint = parent.messages?.findIndex(m => m.id === parentMessageId)
    if (branchPoint === -1 || branchPoint === undefined) {
      return res.status(404).json({ error: 'Parent message not found' })
    }

    const branchSession = {
      id: crypto.randomUUID?.() || Math.random().toString(36).slice(2),
      parentId: parentSessionId,
      branchFromMessage: parentMessageId,
      title: title || `Branch from: ${parent.title || 'Conversation'}`,
      messages: parent.messages.slice(0, branchPoint + 1),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      isBranch: true,
    }

    await sessions.insertOne(branchSession)
    res.json({ session: branchSession })
  } catch (error) {
    console.error('Branch creation error:', error)
    res.status(500).json({ error: error.message })
  }
})

router.get('/tree/:sessionId', async (req, res) => {
  try {
    const sessions = getCollection('conversations')
    const all = await sessions.find({})

    function buildTree(parentId) {
      const node = all.find(s => s.id === parentId)
      if (!node) return null
      const children = all
        .filter(s => s.parentId === parentId)
        .map(s => buildTree(s.id))
        .filter(Boolean)
      return {
        id: node.id,
        title: node.title || 'Untitled',
        messageCount: node.messages?.length || 0,
        updatedAt: node.updatedAt,
        isBranch: node.isBranch || false,
        branchFromMessage: node.branchFromMessage,
        children,
      }
    }

    const tree = buildTree(req.params.sessionId)
    res.json({ tree })
  } catch (error) {
    console.error('Branch tree error:', error)
    res.status(500).json({ error: error.message })
  }
})

router.get('/diff/:branchId/:parentId', async (req, res) => {
  try {
    const sessions = getCollection('conversations')
    const branch = await sessions.findOne({ id: req.params.branchId })
    const parent = await sessions.findOne({ id: req.params.parentId })

    if (!branch || !parent) {
      return res.status(404).json({ error: 'Session not found' })
    }

    const branchMsgs = branch.messages || []
    const parentMsgs = parent.messages || []
    const commonLen = Math.min(branchMsgs.length, parentMsgs.length)

    const diff = {
      common: parentMsgs.slice(0, commonLen),
      parentOnly: parentMsgs.slice(commonLen),
      branchOnly: branchMsgs.slice(commonLen),
    }

    res.json({ diff })
  } catch (error) {
    console.error('Branch diff error:', error)
    res.status(500).json({ error: error.message })
  }
})

export default router
