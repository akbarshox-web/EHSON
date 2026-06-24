import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useData } from '../context/useData'
import { formatUZS } from '../lib/format'
import {
  Sticker, StickerHeroDonate,
  IconHeartFilled, IconHand, IconMap,
  IconShield, IconArrowRight, IconSparkle,
} from '../components/Icons'

export function HomePage() {
  const { recipients } = useData()
  const featured = recipients.slice(0, 3)

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary-300/40 dark:bg-primary-700/20 blur-3xl animate-float" />
          <div className="absolute top-40 -right-32 w-96 h-96 rounded-full bg-accent-300/30 dark:bg-accent-700/20 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="section py-16 sm:py-24 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="chip bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300"
            >
              <IconSparkle size={14} /> Yaxshilik — yashashning ma'nosi
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight"
            >
              Ehson — <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">yurakdan</span> yurakka.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-5 text-lg text-slate-600 dark:text-slate-300 max-w-xl"
            >
              EHSONLAR.VERCEL.APP — yordamga muhtoj odamlar bilan mehribon insonlarni bog'lovchi ishonchli platforma.
              Ehson bering, hayot o'zgartiring.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <Link to="/ehson-kiritish" className="btn-primary text-base px-7 py-4">
                <IconHand size={18} /> Ehson kiritish
              </Link>
              <Link to="/ehson-oluvchilar" className="btn-ghost text-base px-7 py-4">
                <IconHeartFilled size={18} /> Ehson oluvchilar
              </Link>
            </motion.div>
          </div>

          {/* HERO ILLUSTRATION */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary-500 via-primary-600 to-accent-500 shadow-glow rotate-3" />
              <div className="absolute inset-3 rounded-[1.6rem] glass flex items-center justify-center">
                <div className="text-center px-6">
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <StickerHeroDonate size={140} />
                  </motion.div>
                  <div className="mt-4 font-display font-bold text-2xl text-slate-900 dark:text-white">
                    Birgalikda kuchlimiz
                  </div>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    Sizning kichik yordamingiz — kimningdir katta umidi.
                  </p>
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -left-4 card !p-3 text-sm font-semibold flex items-center gap-1.5"
              >
                <IconSparkle size={14} /> 100% shaffof
              </motion.div>
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-4 -right-4 card !p-3 text-sm font-semibold flex items-center gap-1.5"
              >
                <IconShield size={14} /> Ishonchli
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section py-16">
        <div className="text-center max-w-2xl mx-auto">
          <span className="chip bg-accent-100 text-accent-700 dark:bg-accent-900/40 dark:text-accent-300">
            Qanday ishlaydi?
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            3 ta oddiy qadam
          </h2>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {[
            { n: 1, t: 'Ehson oluvchini toping', d: "Yordamga muhtoj odamlar ro'yxatini ko'rib chiqing va kimga yordam berishni xohlashingizni tanlang.", Icon: IconSparkle },
            { n: 2, t: "Bog'laning",              d: 'Telefon yoki karta raqami orqali bevosita bog\'laning va yordamingizni yetkazing.', Icon: IconHand },
            { n: 3, t: "Natija kuzating",         d: "Ehson oluvchining joylashuvi va holati haqida ma'lumot oling.", Icon: IconMap },
          ].map((step, i) => {
            const Icon = step.Icon
            return (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card relative"
              >
                <div className="absolute -top-5 left-6 h-10 w-10 rounded-xl bg-primary-600 text-white font-bold flex items-center justify-center shadow-soft">
                  {step.n}
                </div>
                <Sticker tone="primary" size={48} className="mt-2">
                  <Icon size={24} />
                </Sticker>
                <h3 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">{step.t}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{step.d}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* FEATURED */}
      <section className="section py-16">
        <div className="flex items-end justify-between flex-wrap gap-3">
          <div>
            <span className="chip bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">
              Dolzarb ehtiyojlar
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Hozir yordam kutayotgan odamlar
            </h2>
          </div>
          <Link to="/ehson-oluvchilar" className="btn-ghost">
            Barchasini ko'rish <IconArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="card">
                <div className="flex items-center gap-3">
                  <Sticker tone="primary" size={48}>
                    <span className="font-bold text-lg">{r.name.charAt(0)}</span>
                  </Sticker>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">{r.name}</div>
                    <div className="text-xs text-slate-500">{r.region}</div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 line-clamp-2">{r.story}</p>
                <div className="mt-3 rounded-xl bg-primary-50 dark:bg-primary-900/30 px-3 py-2 text-xs font-semibold text-primary-700 dark:text-primary-300">
                  Kerak: {formatUZS(r.goal)}
                </div>
                <Link to={`/ehson-oluvchilar/${r.id}`} className="btn-primary w-full mt-4">
                  Batafsil
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="section pb-20">
        <div className="card relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 opacity-10">
            <IconHeartFilled size={200} />
          </div>
          <div className="relative">
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Hozir yordam bering
            </h3>
            <p className="mt-1 text-slate-600 dark:text-slate-300 max-w-md">
              Bir necha daqiqada ehson oluvchini topishingiz va bog'lanishingiz mumkin.
            </p>
            <div className="mt-4 flex gap-3 flex-wrap">
              <Link to="/ehson-kiritish" className="btn-primary">
                <IconHand size={16} /> Ehson kiritish
              </Link>
              <Link to="/ehson-oluvchilar" className="btn-ghost">
                <IconSparkle size={16} /> Ro'yxatni ko'rish
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}