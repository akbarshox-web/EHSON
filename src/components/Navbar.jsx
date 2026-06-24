import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTheme } from '../context/useTheme'
import { Logo } from './Logo'
import { IconSun, IconMoon, IconHand } from './Icons'

export function Navbar() {
  const { theme, toggleTheme } = useTheme()

  const linkBase = 'px-3 py-2 rounded-lg text-sm font-semibold transition'
  const linkClass = ({ isActive }) =>
    `${linkBase} ${isActive
      ? 'text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-900/30'
      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'}`

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/70 dark:bg-slate-950/70 border-b border-slate-200/60 dark:border-slate-800/60">
      <div className="section flex h-16 items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2.5">
          <Logo />
          <div className="leading-tight">
            <div className="font-display font-extrabold text-lg text-slate-900 dark:text-white">EHSON.uz</div>
            <div className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">Ehson platformasi</div>
          </div>
        </NavLink>

        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" end className={linkClass}>Bosh sahifa</NavLink>
          <NavLink to="/ehson-oluvchilar" className={linkClass}>Ehson oluvchilar</NavLink>
          <NavLink to="/ehson-kiritish" className={linkClass}>Ehson kiritish</NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.9, rotate: 25 }}
            onClick={toggleTheme}
            aria-label="Mavzuni almashtirish"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100
                       dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 transition"
          >
            {theme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
          </motion.button>

          <NavLink to="/ehson-kiritish" className="hidden sm:inline-flex btn-primary">
            <IconHand size={16} /> Ehson kiritish
          </NavLink>
        </div>
      </div>
    </header>
  )
}