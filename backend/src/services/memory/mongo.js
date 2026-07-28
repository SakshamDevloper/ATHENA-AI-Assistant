import { getCollection, initStore } from './store.js'

export async function connectMongo() {
  await initStore()
  console.log('Local data store initialized')
  return true
}

export function getDb() {
  return { collection: (name) => getCollection(name) }
}

export function getConversationsCollection() {
  return getCollection('conversations')
}

export function getMemoriesCollection() {
  return getCollection('memories')
}

export function getUsersCollection() {
  return getCollection('users')
}

export function getSessionsCollection() {
  return getCollection('sessions')
}

export async function closeMongo() {}
