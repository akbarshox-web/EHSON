import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { formatUZS, classNames } from '../lib/format'
import { Sticker, IconPhone } from './Icons'

const CATEGORY_COLORS = {
  Bola:     'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
  Tibbiyot: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  Oilaviy:  'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  Talim:    'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  Boshqa:   'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
}

export function RecipientCard({ recipient, index = 0 }) {
  const cat = recipient.category || 'Boshqa'
  const colorClass = CATEGORY_COLORS[cat] || CATEGORY_COLORS.Boshqa

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
      whileHover={{ y: -4 }}
      className="card group hover:shadow-glow flex flex-col"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Sticker tone="primary" size={48}>
            <span className="font-bold text-lg">{recipient.name?.charAt(0) || '?'}</span>
          </Sticker>
          <div>
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
              {recipient.name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">{recipient.region}</p>
          </div>
        </div>
        <span className={classNames('chip', colorClass)}>{cat}</span>
      </div>

      <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
        {recipient.story}
      </p>

      <div className="mt-4 rounded-xl bg-primary-50 dark:bg-primary-900/30 px-3 py-2 text-xs font-semibold text-primary-700 dark:text-primary-300">
        Kerak: {formatUZS(recipient.goal)}
      </div>

      <div className="mt-5 flex gap-2">
        <Link to={`/ehson-oluvchilar/${recipient.id}`} className="btn-primary flex-1">
          Batafsil
        </Link>
        <a
          href={`tel:${recipient.phone?.replace(/\s/g, '')}`}
          className="btn-ghost !px-3 inline-flex items-center justify-center"
          aria-label="Qo'ng'iroq qilish"
        >
          <IconPhone size={16} />
        </a>
      </div>
    </motion.article>
  )
}