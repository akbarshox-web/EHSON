import { Sticker, IconImage, IconVideo } from './Icons'

export function MediaPreview({ files }) {
  if (!files || files.length === 0) {
    return (
      <div className="rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 p-6 text-center text-sm text-slate-500">
        Hech qanday fayl tanlanmagan
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {files.map((file, i) => {
        const url = URL.createObjectURL(file)
        const isVideo = file.type.startsWith('video/')
        return (
          <div key={i} className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 aspect-square bg-slate-100 dark:bg-slate-800">
            {isVideo ? (
              <video src={url} className="w-full h-full object-cover" muted playsInline />
            ) : (
              <img src={url} alt="" className="w-full h-full object-cover" />
            )}
            <div className="absolute bottom-1 right-1">
              <Sticker tone="slate" size={32}>
                {isVideo ? <IconVideo size={14} /> : <IconImage size={14} />}
              </Sticker>
            </div>
          </div>
        )
      })}
    </div>
  )
}
