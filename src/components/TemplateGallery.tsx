import { useState } from 'react'
import { motion } from 'framer-motion'
import { useMemeStore } from '../store'
import { MEME_TEMPLATES, CATEGORIES, TEMPLATE_GRADIENTS } from '../templates'

export function TemplateGallery() {
  const { setSelectedTemplate } = useMemeStore()
  const [category, setCategory] = useState('全部')

  const filtered = category === '全部'
    ? MEME_TEMPLATES
    : MEME_TEMPLATES.filter(t => t.category === category)

  return (
    <div className="space-y-4">
      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-all ${
              category === cat
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Template grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {filtered.map((template, index) => (
          <motion.button
            key={template.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.03 }}
            onClick={() => setSelectedTemplate(template)}
            className="group relative aspect-square rounded-xl overflow-hidden border-2 border-transparent hover:border-purple-500 transition-all hover:scale-105"
            style={{ background: TEMPLATE_GRADIENTS[template.id] }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-40 group-hover:opacity-60 transition-opacity">
              {template.image}
            </div>
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-2">
              <p className="text-xs text-white font-medium truncate">{template.name}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
