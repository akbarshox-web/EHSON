import { IconMail, IconPhone, IconMap } from './Icons'

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="section py-10 grid gap-8 md:grid-cols-3">
        <div>
          <div className="font-display font-extrabold text-lg text-slate-900 dark:text-white">EHSONLAR.VERCEL.APP</div>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-sm">
            O'zbekistondagi yordamga muhtoj odamlar va mehribon insonlar uchun ishonchli platforma.
          </p>
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Tezkor havolalar</div>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li><a href="/" className="hover:text-primary-600">Bosh sahifa</a></li>
            <li><a href="/ehson-oluvchilar" className="hover:text-primary-600">Ehson oluvchilar</a></li>
            <li><a href="/ehson-kiritish" className="hover:text-primary-600">Ehson kiritish</a></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Aloqa</div>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li className="flex items-center gap-2"><IconMail size={14} /> info@ehson.uz</li>
            <li className="flex items-center gap-2"><IconPhone size={14} /> +998 71 200 00 00</li>
            <li className="flex items-center gap-2"><IconMap size={14} /> Toshkent sh., Mustaqillik ko'chasi 1</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 dark:border-slate-800">
        <div className="section py-4 text-xs text-slate-500 dark:text-slate-500 flex flex-col sm:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} EHSONLAR.VERCEL.APP — Barcha huquqlar himoyalangan.</span>
          <span>Yaxshilik — yashashning ma'nosi.</span>
        </div>
      </div>
    </footer>
  )
}
