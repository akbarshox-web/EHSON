import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useData } from '../context/useData'
import { Modal } from '../components/Modal'
import { formatUZS, classNames } from '../lib/format'
import {
  Sticker, IconHand, IconList, IconClose,
  IconRefresh,
} from '../components/Icons'

const CATEGORIES = ['Bola', 'Tibbiyot', 'Oilaviy', 'Talim', 'Boshqa']

const CATEGORY_COLORS = {
  Bola:     'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
  Tibbiyot: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  Oilaviy:  'bg-amber-100 text-amber-700 dark:bg-amber-700/40 dark:text-amber-300',
  Talim:    'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  Boshqa:   'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
}

function EditRecipientModal({ open, onClose, recipient, onSave }) {
  const initialForm = recipient
    ? {
        name: recipient.name || '',
        age: recipient.age || '',
        region: recipient.region || '',
        phone: recipient.phone || '',
        cardNumber: recipient.cardNumber || '',
        story: recipient.story || '',
        category: recipient.category || 'Bola',
        goal: recipient.goal || '',
      }
    : null

  return (
    <Modal open={open} onClose={onClose} title="Ehsоnni tahrirlash">
      <EditForm
        key={recipient?.id || 'empty'}
        initialForm={initialForm}
        onCancel={onClose}
        onSave={onSave}
      />
    </Modal>
  )
}

function EditForm({ initialForm, onCancel, onSave }) {
  const [form, setForm] = useState(initialForm)

  if (!form) return null

  const update = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    onSave({
      ...form,
      age: Number(form.age),
      goal: Number(form.goal),
    })
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
      <div>
        <label className="label">Ism familiya *</label>
        <input value={form.name} onChange={update('name')} className="input" required />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Yosh *</label>
          <input value={form.age} onChange={update('age')} type="number" min={1} className="input" required />
        </div>
        <div>
          <label className="label">Kategoriya</label>
          <select value={form.category} onChange={update('category')} className="input">
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="label">Yashash manzili *</label>
        <input value={form.region} onChange={update('region')} className="input" required />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Telefon *</label>
          <input value={form.phone} onChange={update('phone')} className="input" required />
        </div>
        <div>
          <label className="label">Karta raqami *</label>
          <input value={form.cardNumber} onChange={update('cardNumber')} className="input font-mono" required />
        </div>
      </div>
      <div>
        <label className="label">Qancha summa kerak (so'm) *</label>
        <input value={form.goal} onChange={update('goal')} type="number" min={1000} className="input" required />
      </div>
      <div>
        <label className="label">Hikoya *</label>
        <textarea value={form.story} onChange={update('story')} rows={4} className="input resize-none" required />
      </div>
      <div className="flex gap-2 pt-2">
        <button type="button" onClick={onCancel} className="btn-ghost flex-1">
          Bekor qilish
        </button>
        <button type="submit" className="btn-primary flex-1">
          Saqlash
        </button>
      </div>
    </form>
  )
}

export function MyDonationsPage() {
  const { myRecipients, updateRecipient, deleteRecipient } = useData()
  const [editing, setEditing] = useState(null)

  const onDelete = (r) => {
    if (window.confirm(`"${r.name}" ni o'chirishni xohlaysizmi? Bu amalni qaytarib bo'lmaydi.`)) {
      deleteRecipient(r.id)
    }
  }

  const onSave = (patch) => {
    updateRecipient(editing.id, patch)
    setEditing(null)
  }

  return (
    <section className="section py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto"
      >
        <span className="chip bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300 inline-flex items-center gap-1.5">
          <IconList size={12} /> Mening ehsоnlarim
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Mening ehsonlarim
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Bu yerda faqat siz joylagan ehsоnlar ko'rinadi. Ularni tahrirlash yoki o'chirish mumkin.
        </p>
      </motion.div>

      {myRecipients.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 card text-center max-w-xl mx-auto"
        >
          <div className="inline-flex">
            <Sticker tone="primary" size={64}>
              <IconHand size={28} />
            </Sticker>
          </div>
          <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
            Hozircha ehsоnlaringiz yo'q
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Siz hali hech qanday ehsоn joylamagansiz. Yangi ehsоn qo'shish uchun quyidagi tugmani bosing.
          </p>
          <Link to="/ehson-kiritish" className="btn-primary mt-5 inline-flex">
            <IconHand size={16} /> Ehsоn kiritish
          </Link>
        </motion.div>
      ) : (
        <>
          <div className="mt-4 text-sm text-slate-500 dark:text-slate-400 text-center">
            Jami: <b className="text-slate-900 dark:text-white">{myRecipients.length}</b> ta ehsоn
          </div>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {myRecipients.map((r, i) => {
                const cat = r.category || 'Boshqa'
                const colorClass = CATEGORY_COLORS[cat] || CATEGORY_COLORS.Boshqa
                return (
                  <motion.article
                    key={r.id}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: Math.min(i * 0.04, 0.3) }}
                    className="card flex flex-col"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <Sticker tone="primary" size={48}>
                          <span className="font-bold text-lg">{r.name?.charAt(0) || '?'}</span>
                        </Sticker>
                        <div>
                          <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                            {r.name}
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{r.region}</p>
                        </div>
                      </div>
                      <span className={classNames('chip', colorClass)}>{cat}</span>
                    </div>

                    <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
                      {r.story}
                    </p>

                    <div className="mt-4 rounded-xl bg-primary-50 dark:bg-primary-900/30 px-3 py-2 text-xs font-semibold text-primary-700 dark:text-primary-300">
                      Kerak: {formatUZS(r.goal)}
                    </div>

                    <div className="mt-5 flex gap-2">
                      <Link to={`/ehson-oluvchilar/${r.id}`} className="btn-ghost flex-1 text-sm py-2">
                        Batafsil
                      </Link>
                      <button
                        type="button"
                        onClick={() => setEditing(r)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:hover:bg-amber-900/60 font-semibold text-sm py-2 transition"
                      >
                        <IconRefresh size={14} /> O'zgartirish
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(r)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-rose-100 text-rose-700 hover:bg-rose-200 dark:bg-rose-900/40 dark:text-rose-300 dark:hover:bg-rose-900/60 font-semibold text-sm py-2 transition"
                      >
                        <IconClose size={14} /> O'chirish
                      </button>
                    </div>
                  </motion.article>
                )
              })}
            </AnimatePresence>
          </div>
        </>
      )}

      <EditRecipientModal
        open={!!editing}
        recipient={editing}
        onClose={() => setEditing(null)}
        onSave={onSave}
      />
    </section>
  )
}