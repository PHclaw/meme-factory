import { useState } from 'react'
import { motion } from 'framer-motion'
import { Palette, LayoutGrid, Image } from 'lucide-react'
import { TemplateGallery } from './components/TemplateGallery'
import { MemeEditor } from './components/MemeEditor'
import { MemeGallery } from './components/MemeGallery'
import { useMemeStore } from './store'

type Tab = 'create' | 'gallery'

function App() {
  const [tab, setTab] = useState<Tab>('create')
  const { selectedTemplate, customImage } = useMemeStore()
  const hasCanvas = selectedTemplate || customImage

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            MemeFactory
          </h1>
          <p className="text-gray-500 mt-1 text-sm">😂 表情包工厂 — 一键生成你的专属表情包</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTab('create')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all ${
              tab === 'create'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <Palette className="w-4 h-4" /> 创作
          </button>
          <button
            onClick={() => setTab('gallery')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all ${
              tab === 'gallery'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <Image className="w-4 h-4" /> 我的作品
          </button>
        </div>

        {/* Content */}
        {tab === 'create' ? (
          <div className="space-y-6">
            {/* Template Gallery */}
            <div className="bg-gray-900/50 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3 text-gray-400">
                <LayoutGrid className="w-4 h-4" />
                <span className="text-sm font-medium">选择模板</span>
              </div>
              <TemplateGallery />
            </div>

            {/* Editor */}
            {hasCanvas ? (
              <MemeEditor />
            ) : (
              <div className="flex items-center justify-center h-40 text-gray-600 text-sm">
                👆 选个模板开始创作
              </div>
            )}
          </div>
        ) : (
          <MemeGallery />
        )}

        {/* Footer */}
        <div className="text-center mt-10 text-xs text-gray-600">
          Made with 😂 for meme lovers
        </div>
      </div>
    </div>
  )
}

export default App
