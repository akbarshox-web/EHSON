import { useEffect, useState, useCallback, useMemo } from 'react'
import { DataContext } from './dataContextObject'

const STORAGE_KEY = 'ehson-recipients-v2'
const USER_KEY = 'ehson-user-id'

function getOrCreateUserId() {
  try {
    let id = localStorage.getItem(USER_KEY)
    if (!id) {
      id = 'u-' + (crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2))
      localStorage.setItem(USER_KEY, id)
    }
    return id
  } catch {
    return 'u-anonymous'
  }
}

export function DataProvider({ children }) {
  const [userId] = useState(getOrCreateUserId)
  const [recipients, setRecipients] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) return JSON.parse(raw)
    } catch {
      // ignore
    }
    return []
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recipients))
    } catch {
      // ignore quota errors
    }
  }, [recipients])

  const addRecipient = useCallback((data) => {
    const id = 'r-' + Date.now().toString(36)
    const next = { ...data, id, createdAt: Date.now(), createdBy: userId }
    setRecipients(prev => [next, ...prev])
    return id
  }, [userId])

  const updateRecipient = useCallback((id, patch) => {
    setRecipients(prev => prev.map(r => (r.id === id ? { ...r, ...patch, updatedAt: Date.now() } : r)))
  }, [])

  const deleteRecipient = useCallback((id) => {
    setRecipients(prev => prev.filter(r => r.id !== id))
  }, [])

  const getRecipient = useCallback((id) => {
    return recipients.find(r => r.id === id)
  }, [recipients])

  const myRecipients = useMemo(
    () => recipients.filter(r => r.createdBy === userId),
    [recipients, userId]
  )

  return (
    <DataContext.Provider value={{
      recipients,
      addRecipient,
      updateRecipient,
      deleteRecipient,
      getRecipient,
      myRecipients,
      userId,
    }}>
      {children}
    </DataContext.Provider>
  )
}