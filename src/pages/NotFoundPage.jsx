import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { IconSearch, IconHand } from '../components/Icons'

export function NotFoundPage() {
  return (
    <section className="section py-20 text-center">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring' }}
        className="mx-auto inline-flex"
      >
        <span className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 text-slate-700 dark:from-slate-700 dark:to-slate-800 dark:text-slate-200 shadow-soft w-20 h-20">
          <IconSearch size={36} />
        </span>
      </motion.div>
      <h1 className="mt-4 text-3xl font-extrabold text-slate-900 dark:text-white">Sahifa topilmadi</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">Siz qidirgan sahifa mavjud emas.</p>
      <Link to="/" className="btn-primary mt-6 inline-flex">
        <IconHand size={16} /> Bosh sahifaga qaytish
      </Link>
    </section>
  )
}
