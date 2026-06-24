import { useEffect, useState, useCallback } from 'react'
import { DataContext } from './dataContextObject'

const STORAGE_KEY = 'ehson-recipients-v1'

const SEED = [
  {
    id: 'r-1',
    name: 'Madina Karimova',
    age: 7,
    region: 'Toshkent sh., Yunusobod t.',
    story: 'Og\'ir kasallik tufayli uzoq muddatli davolanishga muhtoj. Ota-onaning yordamiga muhtoj.',
    cardNumber: '9860 1234 5678 9012',
    phone: '+998 90 123 45 67',
    category: 'Bola',
    goal: 25_000_000,
    geo: { lat: 41.367, lng: 69.247, city: 'Toshkent' },
    ip: '—',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
  },
  {
    id: 'r-2',
    name: 'Otabek Nazarov',
    age: 42,
    region: 'Samarqand vil., Urgut t.',
    story: 'Uy-joy yong\'in natijasida vayron bo\'lgan. Oilada 5 nafar farzand bor.',
    cardNumber: '5614 8821 3344 5566',
    phone: '+998 91 234 56 78',
    category: 'Oilaviy',
    goal: 40_000_000,
    geo: { lat: 39.408, lng: 67.240, city: 'Urgut' },
    ip: '—',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 6,
  },
  {
    id: 'r-3',
    name: 'Nilufar Rahimova',
    age: 34,
    region: 'Farg\'ona vil., Qo\'qon sh.',
    story: 'Yurak operatsiyasi uchun mablag\' kerak. Oilada yolg\'iz boquvchi ona.',
    cardNumber: '4400 7700 8800 1100',
    phone: '+998 93 345 67 89',
    category: 'Tibbiyot',
    goal: 60_000_000,
    geo: { lat: 40.540, lng: 70.940, city: "Qo'qon" },
    ip: '—',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10,
  },
]

export function DataProvider({ children }) {
  const [recipients, setRecipients] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) return JSON.parse(raw)
    } catch {
      // ignore
    }
    return SEED
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
    const next = { ...data, id, createdAt: Date.now() }
    setRecipients(prev => [next, ...prev])
    return id
  }, [])

  const getRecipient = useCallback((id) => {
    return recipients.find(r => r.id === id)
  }, [recipients])

  return (
    <DataContext.Provider value={{ recipients, addRecipient, getRecipient }}>
      {children}
    </DataContext.Provider>
  )
}