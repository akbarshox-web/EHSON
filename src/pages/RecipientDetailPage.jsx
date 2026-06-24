import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useData } from '../context/useData'
import { formatUZS } from '../lib/format'
import { Sticker, IconMap, IconGlobe, IconPhone, IconUser, IconClipboard } from '../components/Icons'

export function RecipientDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getRecipient } = useData()
  const recipient = getRecipient(id)

  if (!recipient) {
    return (
      <section className="section py-20 text-center">
        <h1 className="text-2xl font-bold">Bunday foydalanuvchi topilmadi</h1>
        <Link to="/ehson-oluvchilar" className="btn-primary mt-6 inline-flex">Ro'yxatga qaytish</Link>
      </section>
    )
  }

  return (
    <section className="section py-10">
      <button onClick={() => navigate(-1)} className="text-sm text-slate-500 hover:text-primary-600 mb-4 inline-flex items-center gap-1">
        <span aria-hidden>←</span> Orqaga
      </button>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="card lg:col-span-2"
        >
          <div className="flex items-start gap-4">
            <Sticker tone="primary" size={64}>
              <span className="text-2xl font-bold">{recipient.name.charAt(0)}</span>
            </Sticker>
            <div className="flex-1">
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">{recipient.name}</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                <IconMap size={14} /> {recipient.region}
              </p>
              <span className="chip mt-2 bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">
                {recipient.category}
              </span>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 mb-2">
            <Sticker tone="rose" size={28}>
              <IconClipboard size={14} />
            </Sticker>
            <h2 className="font-bold text-slate-900 dark:text-white">Hikoya</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            {recipient.story}
          </p>

          <div className="mt-6 flex items-center gap-2 mb-2">
            <Sticker tone="amber" size={28}>
              <IconMap size={14} />
            </Sticker>
            <h2 className="font-bold text-slate-900 dark:text-white">Joylashuv</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-3 text-sm">
            <div className="rounded-xl bg-slate-50 dark:bg-slate-800 p-3">
              <div className="text-xs text-slate-500 flex items-center gap-1.5"><IconMap size={12} /> Shahar</div>
              <div className="font-semibold mt-0.5">{recipient.geo?.city || '—'}</div>
            </div>
            <div className="rounded-xl bg-slate-50 dark:bg-slate-800 p-3">
              <div className="text-xs text-slate-500">Koordinatalar</div>
              <div className="font-semibold font-mono text-xs mt-0.5">
                {recipient.geo?.lat?.toFixed(3)}, {recipient.geo?.lng?.toFixed(3)}
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 dark:bg-slate-800 p-3">
              <div className="text-xs text-slate-500 flex items-center gap-1.5"><IconGlobe size={12} /> IP</div>
              <div className="font-semibold mt-0.5">{recipient.ip || '—'}</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card h-fit sticky top-20 space-y-5"
        >
          <div>
            <div className="text-xs text-slate-500 mb-1">Qancha summa kerak</div>
            <div className="text-2xl font-extrabold text-primary-700 dark:text-primary-300">
              {formatUZS(recipient.goal)}
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-800 pt-4 space-y-3">
            <div>
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <IconUser size={12} /> Yosh
              </div>
              <div className="font-semibold mt-0.5">{recipient.age}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500">Karta raqami</div>
              <div className="mt-1 font-mono font-bold text-slate-900 dark:text-white tracking-wider">
                {recipient.cardNumber}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500">Telefon</div>
              <a href={`tel:${recipient.phone}`} className="mt-1 inline-flex items-center gap-1.5 font-semibold text-primary-600">
                <IconPhone size={14} /> {recipient.phone}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}