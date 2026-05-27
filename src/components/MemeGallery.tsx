import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Download } from 'lucide-react'
import { useMemeStore } from '../store'

export function MemeGallery() {
  const { savedMemes, removeSavedMeme } = useMemeStore()

  if (savedMemes.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <div className="text-5xl mb-3">🖼️</div>
        <p>还没有保存的表情包</p>
        <p className="text-sm text-gray-600 mt-1">导出后会自动保存到这里</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-white font-medium">我的作品 ({savedMemes.length})</h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <AnimatePresence>
          {savedMemes.map((meme) => (
            <motion.div
              key={meme.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative group rounded-xl overflow-hidden bg-gray-800"
            >
              <img
                src={meme.dataUrl}
                alt="meme"
                className="w-full aspect-square object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <a
                  href={meme.dataUrl}
                  download={`meme-${meme.id}.png`}
                  className="p-2 bg-purple-600 rounded-full text-white hover:bg-purple-700"
                >
                  <Download className="w-5 h-5" />
                </a>
                <button
                  onClick={() => removeSavedMeme(meme.id)}
                  className="p-2 bg-red-600 rounded-full text-white hover:bg-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              {/* Text preview */}
              {(meme.topText || meme.bottomText) && (
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                  <p className="text-xs text-gray-300 truncate">
                    {meme.topText && <span>{meme.topText}</span>}
                    {meme.topText && meme.bottomText && <span> / </span>}
                    {meme.bottomText && <span>{meme.bottomText}</span>}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
