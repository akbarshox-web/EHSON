import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useData } from '../context/useData'
import { RecipientCard } from '../components/RecipientCard'
import { IconSearch, IconList, IconFilter } from '../components/Icons'

const CATEGORIES = ['Barchasi', 'Bola', 'Tibbiyot', 'Oilaviy', 'Talim', 'Boshqa']

export function EhsonOluvchilarPage() {
  const { recipients } = useData()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Barchasi')
  const [sort, setSort] = useState('newest')

  const filtered = useMemo(() => {
    let list = [...recipients]
    if (category !== 'Barchasi') list = list.filter(r => r.category === category)
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.region.toLowerCase().includes(q) ||
        r.story.toLowerCase().includes(q)
      )
    }
    if (sort === 'newest') list.sort((a, b) => b.createdAt - a.createdAt)
    if (sort === 'goal') list.sort((a, b) => b.goal - a.goal)
    return list
  }, [recipients, query, category, sort])

  return (
    <section className="section py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto"
      >
        <span className="chip bg-accent-100 text-accent-700 dark:bg-accent-900/40 dark:text-accent-300 inline-flex items-center gap-1.5">
          <IconList size={12} /> Yordamga muhtoj odamlar
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Ehson oluvchilar
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Quyidagi ro'yxatdan yordam kerak bo'lgan odamlarni ko'rishingiz mumkin.
        </p>
      </motion.div>

      <div className="mt-8 card flex flex-col md:flex-row gap-3 items-stretch md:items-center">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <IconSearch size={16} />
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ism, viloyat yoki hikoya bo'yicha qidiring..."
            className="input pl-10"
          />
        </div>
        <div className="relative md:w-56">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <IconFilter size={14} />
          </span>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="input pl-9">
            <option value="newest">Eng yangi</option>
            <option value="goal">Eng katta ehtiyoj</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {CATEGORIES.map(c => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={
              'px-4 py-2 rounded-xl text-sm font-semibold transition ' +
              (category === c
                ? 'bg-primary-600 text-white shadow-soft'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-800')
            }
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full card text-center text-slate-500 dark:text-slate-400"
            >
              Hech kim topilmadi. Boshqa filtr bilan urinib ko'ring.
            </motion.div>
          ) : (
            filtered.map((r, i) => <RecipientCard key={r.id} recipient={r} index={i} />)
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}