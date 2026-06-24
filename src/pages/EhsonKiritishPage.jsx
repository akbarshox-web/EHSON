import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useData } from '../context/useData'
import { MediaPreview } from '../components/MediaPreview'
import {
  Sticker, IconUpload, IconImage, IconVideo, IconMap, IconGlobe,
  IconClipboard, IconCheckCircle, IconHourglass, IconLock, IconShield,
  IconClose, IconUser, IconCard, IconHand,
} from '../components/Icons'

const CATEGORIES = ['Bola', 'Tibbiyot', 'Oilaviy', 'Talim', 'Boshqa']

async function getIP() {
  try {
    const res = await fetch('https://api.ipify.org?format=json')
    if (!res.ok) throw new Error('ip fail')
    const data = await res.json()
    return data.ip
  } catch {
    return null
  }
}

async function getGeo() {
  return new Promise((resolve) => {
    if (!('geolocation' in navigator)) {
      resolve(null)
      return
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords
        let city = ''
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=uz`
          )
          if (res.ok) {
            const data = await res.json()
            city =
              data.address?.city ||
              data.address?.town ||
              data.address?.village ||
              data.address?.state ||
              ''
          }
        } catch { /* ignore */ }
        resolve({ lat: latitude, lng: longitude, city })
      },
      () => resolve(null),
      { enableHighAccuracy: true, timeout: 8000 }
    )
  })
}

export function EhsonKiritishPage() {
  const { addRecipient } = useData()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '', age: '', region: '', phone: '',
    cardNumber: '', story: '', category: 'Bola', goal: '',
  })
  const [files, setFiles] = useState([])
  const [geo, setGeo] = useState(null)
  const [ip, setIp] = useState(null)
  const [geoLoading, setGeoLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setGeoLoading(true)
      const [ipVal, geoVal] = await Promise.all([getIP(), getGeo()])
      if (cancelled) return
      setIp(ipVal)
      setGeo(geoVal)
      setGeoLoading(false)
    })()
    return () => { cancelled = true }
  }, [])

  const update = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const onFiles = (e) => {
    const list = Array.from(e.target.files || [])
    const valid = list.filter(f => f.type.startsWith('image/') || f.type.startsWith('video/'))
    setFiles(prev => [...prev, ...valid].slice(0, 6))
  }

  const removeFile = (i) => setFiles(prev => prev.filter((_, idx) => idx !== i))

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Ism kiritilishi shart'
    if (!form.age || Number(form.age) <= 0) e.age = "Yoshni to'g'ri kiriting"
    if (!form.region.trim()) e.region = 'Manzil kiritilishi shart'
    if (!form.phone.trim()) e.phone = 'Telefon raqamini kiriting'
    if (!form.cardNumber.trim()) e.cardNumber = 'Karta raqamini kiriting'
    if (!form.story.trim() || form.story.length < 20) e.story = 'Hikoyani kamida 20 belgi bilan yozing'
    if (!form.goal || Number(form.goal) <= 0) e.goal = 'Qancha summa kerakligini kiriting'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    setTimeout(() => {
      addRecipient({
        ...form,
        age: Number(form.age),
        goal: Number(form.goal),
        media: files.map(f => ({ name: f.name, type: f.type, size: f.size })),
        geo: geo || { lat: 0, lng: 0, city: 'Aniqlanmadi' },
        ip: ip || 'Aniqlanmadi',
      })
      setSubmitting(false)
      navigate('/mening-ehsonlarim')
    }, 700)
  }

  return (
    <section className="section py-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto"
      >
        <span className="chip bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300 inline-flex items-center gap-1.5">
          <IconHand size={12} /> Yordam so'rash
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Ehson kiritish
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Ma'lumotlaringizni to'ldiring. Sizning joylashuvingiz va IP avtomatik aniqlanadi.
        </p>
      </motion.div>

      <form onSubmit={onSubmit} className="mt-8 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="card">
            <div className="flex items-center gap-2 mb-4">
              <Sticker tone="primary" size={36}>
                <IconUser size={18} />
              </Sticker>
              <h2 className="font-bold text-slate-900 dark:text-white">Shaxsiy ma'lumotlar</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Ism familiya *</label>
                <input value={form.name} onChange={update('name')} className="input" placeholder="Masalan: Akmal Karimov" />
                {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name}</p>}
              </div>
              <div>
                <label className="label">Yosh *</label>
                <input value={form.age} onChange={update('age')} type="number" min={1} className="input" placeholder="35" />
                {errors.age && <p className="mt-1 text-xs text-rose-600">{errors.age}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="label">Yashash manzili *</label>
                <input value={form.region} onChange={update('region')} className="input" placeholder="Toshkent sh., Yunusobod t." />
                {errors.region && <p className="mt-1 text-xs text-rose-600">{errors.region}</p>}
              </div>
              <div>
                <label className="label">Telefon raqami *</label>
                <input value={form.phone} onChange={update('phone')} className="input" placeholder="+998 90 123 45 67" />
                {errors.phone && <p className="mt-1 text-xs text-rose-600">{errors.phone}</p>}
              </div>
              <div>
                <label className="label">Kategoriya</label>
                <select value={form.category} onChange={update('category')} className="input">
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card">
            <div className="flex items-center gap-2 mb-4">
              <Sticker tone="accent" size={36}>
                <IconCard size={18} />
              </Sticker>
              <h2 className="font-bold text-slate-900 dark:text-white">Moliyaviy ma'lumotlar</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Karta raqami *</label>
                <input value={form.cardNumber} onChange={update('cardNumber')} className="input font-mono" placeholder="9860 1234 5678 9012" />
                {errors.cardNumber && <p className="mt-1 text-xs text-rose-600">{errors.cardNumber}</p>}
              </div>
              <div>
                <label className="label">Qancha summa kerak (so'm) *</label>
                <input value={form.goal} onChange={update('goal')} type="number" min={1000} className="input" placeholder="10000000" />
                {errors.goal && <p className="mt-1 text-xs text-rose-600">{errors.goal}</p>}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card">
            <div className="flex items-center gap-2 mb-2">
              <Sticker tone="rose" size={36}>
                <IconClipboard size={18} />
              </Sticker>
              <h2 className="font-bold text-slate-900 dark:text-white">Hikoyangiz</h2>
            </div>
            <textarea
              value={form.story}
              onChange={update('story')}
              rows={5}
              className="input resize-none"
              placeholder="O'zingiz, oilangiz va nima uchun yordam kerakligi haqida batafsil yozing..."
            />
            {errors.story && <p className="mt-1 text-xs text-rose-600">{errors.story}</p>}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card">
            <div className="flex items-center gap-2 mb-1">
              <Sticker tone="sky" size={36}>
                <IconUpload size={18} />
              </Sticker>
              <h2 className="font-bold text-slate-900 dark:text-white">Rasm yoki video qo'shish</h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Ishonch uchun rasm yoki video yuklang (maks. 6 ta).</p>
            <label className="block">
              <input
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={onFiles}
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4
                           file:rounded-xl file:border-0 file:text-sm file:font-semibold
                           file:bg-primary-600 file:text-white hover:file:bg-primary-700
                           dark:file:bg-primary-700 dark:hover:file:bg-primary-600 cursor-pointer"
              />
            </label>

            {files.length > 0 && (
              <div className="mt-4">
                <MediaPreview files={files} />
                <div className="mt-3 flex flex-wrap gap-2">
                  {files.map((f, i) => (
                    <span key={i} className="chip bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 inline-flex items-center gap-1.5">
                      {f.type.startsWith('video/') ? <IconVideo size={12} /> : <IconImage size={12} />}
                      {f.name.length > 18 ? f.name.slice(0, 16) + '…' : f.name}
                      <button type="button" onClick={() => removeFile(i)} className="ml-1 text-rose-500 inline-flex">
                        <IconClose size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        <motion.aside
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="space-y-6 h-fit lg:sticky lg:top-20"
        >
          <div className="card">
            <div className="flex items-center gap-2 mb-3">
              <Sticker tone="amber" size={36}>
                <IconMap size={18} />
              </Sticker>
              <h2 className="font-bold text-slate-900 dark:text-white">Avtomatik ma'lumotlar</h2>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between rounded-xl bg-slate-50 dark:bg-slate-800 p-3">
                <span className="text-slate-500 flex items-center gap-1.5"><IconGlobe size={14} /> IP manzil</span>
                <span className="font-mono font-semibold">{ip || (geoLoading ? 'Aniqlanmoqda…' : '—')}</span>
              </div>
              <div className="rounded-xl bg-slate-50 dark:bg-slate-800 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1.5"><IconMap size={14} /> Joylashuv</span>
                  <span className="text-xs text-slate-400">
                    {geoLoading ? <IconHourglass size={14} /> : geo ? <IconCheckCircle size={14} className="text-primary-600" /> : <IconClose size={14} className="text-rose-500" />}
                  </span>
                </div>
                {geo ? (
                  <div className="mt-1.5">
                    <div className="font-semibold">{geo.city || "Noma'lum shahar"}</div>
                    <div className="text-xs text-slate-500 font-mono">
                      {geo.lat.toFixed(4)}, {geo.lng.toFixed(4)}
                    </div>
                  </div>
                ) : (
                  <div className="mt-1.5 text-slate-500 text-xs">
                    {geoLoading ? 'Aniqlanmoqda...' : 'Joylashuv aniqlanmadi. Brauzer ruxsat bering.'}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-500">
              <IconLock size={12} /> Ma'lumotlar faqat arizangiz bilan saqlanadi.
            </div>
          </div>

          <AnimatePresence>
            {submitting && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="card text-center"
              >
                <div className="inline-block h-8 w-8 rounded-full border-2 border-primary-300 border-t-primary-600 animate-spin" />
                <div className="mt-2 text-sm font-semibold">Yuborilmoqda...</div>
              </motion.div>
            )}
          </AnimatePresence>

          <button type="submit" disabled={submitting} className="btn-primary w-full text-base py-4">
            <IconMap size={18} />
            {submitting ? 'Yuborilmoqda…' : "Joylash va ro'yxatga qo'shish"}
          </button>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 justify-center">
            <IconShield size={12} /> Arizangiz ko'rib chiqilgach, ro'yxatda paydo bo'ladi.
          </div>
        </motion.aside>
      </form>
    </section>
  )
}