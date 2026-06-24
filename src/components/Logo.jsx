import { motion } from 'framer-motion'
import { IconHeartFilled } from './Icons'

export function Logo({ size = 36 }) {
  return (
    <motion.div
      initial={{ rotate: -8, scale: 0.95 }}
      animate={{ rotate: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 14 }}
      className="relative inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-soft"
      style={{ width: size, height: size }}
    >
      <IconHeartFilled size={size * 0.55} />
      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-accent-500 ring-2 ring-white dark:ring-slate-950" />
    </motion.div>
  )
}
