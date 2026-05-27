import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Download, RotateCcw, Sparkles, Type, ImagePlus, ChevronDown } from 'lucide-react'
import html2canvas from 'html2canvas'
import { useMemeStore } from '../store'
import { TEMPLATE_GRADIENTS, QUICK_TEXTS } from '../templates'

export function MemeEditor() {
  const { selectedTemplate, project, setProject, customImage, addSavedMeme } = useMemeStore()
  const canvasRef = useRef<HTMLDivElement>(null)
  const [showQuickTexts, setShowQuickTexts] = useState(false)

  const currentImage = customImage || (selectedTemplate ? TEMPLATE_GRADIENTS[selectedTemplate.id] : null)
  const quickTexts = selectedTemplate ? QUICK_TEXTS[selectedTemplate.id] || [] : []

  const handleExport = useCallback(async () => {
    if (!canvasRef.current) return
    const canvas = await html2canvas(canvasRef.current, {
      backgroundColor: null,
      scale: 2,
    })
    const dataUrl = canvas.toDataURL('image/png')

    // Download
    const link = document.createElement('a')
    link.download = `meme-${Date.now()}.png`
    link.href = dataUrl
    link.click()

    // Save to gallery
    addSavedMeme({
      id: Date.now().toString(),
      dataUrl,
      topText: project.topText,
      bottomText: project.bottomText,
      createdAt: new Date().toISOString(),
    })
  }, [addSavedMeme, project.topText, project.bottomText])

  const handleCustomImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      useMemeStore.getState().setCustomImage(ev.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  if (!currentImage) {
    return (
      <div className="flex items-center justify-center h-80 text-gray-500">
        <div className="text-center">
          <div className="text-6xl mb-4">🎭</div>
          <p>选择模板或上传图片开始创作</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Canvas */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        ref={canvasRef}
        className="meme-canvas relative mx-auto rounded-2xl overflow-hidden shadow-2xl"
        style={{
          width: 480,
          height: 480,
          background: customImage ? `url(${customImage}) center/cover` : currentImage,
        }}
      >
        {/* Emoji overlay for template */}
        {!customImage && selectedTemplate && (
          <div className="absolute inset-0 flex items-center justify-center text-[120px] opacity-30 pointer-events-none select-none">
            {selectedTemplate.image}
          </div>
        )}

        {/* Top text */}
        {project.topText && (
          <div
            className="meme-text-top"
            style={{ top: '8%', fontSize: project.fontSize }}
          >
            {project.topText}
          </div>
        )}

        {/* Bottom text */}
        {project.bottomText && (
          <div
            className="meme-text-bottom"
            style={{ bottom: '8%', fontSize: project.fontSize }}
          >
            {project.bottomText}
          </div>
        )}
      </motion.div>

      {/* Controls */}
      <div className="bg-gray-900 rounded-2xl p-5 space-y-4">
        {/* Text inputs */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-400 flex items-center gap-1 mb-1">
              <Type className="w-3 h-3" /> 上方文字
            </label>
            <input
              type="text"
              value={project.topText}
              onChange={(e) => setProject({ topText: e.target.value })}
              placeholder="输入上方文字..."
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 flex items-center gap-1 mb-1">
              <Type className="w-3 h-3" /> 下方文字
            </label>
            <input
              type="text"
              value={project.bottomText}
              onChange={(e) => setProject({ bottomText: e.target.value })}
              placeholder="输入下方文字..."
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Font size slider */}
        <div>
          <label className="text-xs text-gray-400 mb-1 block">字体大小: {project.fontSize}px</label>
          <input
            type="range"
            min={16}
            max={64}
            value={project.fontSize}
            onChange={(e) => setProject({ fontSize: parseInt(e.target.value) })}
            className="w-full accent-purple-500"
          />
        </div>

        {/* Quick texts */}
        {quickTexts.length > 0 && (
          <div>
            <button
              onClick={() => setShowQuickTexts(!showQuickTexts)}
              className="text-xs text-gray-400 hover:text-purple-400 flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" /> 快捷文案
              <ChevronDown className={`w-3 h-3 transition-transform ${showQuickTexts ? 'rotate-180' : ''}`} />
            </button>
            {showQuickTexts && (
              <div className="flex flex-wrap gap-2 mt-2">
                {quickTexts.map((qt, i) => (
                  <button
                    key={i}
                    onClick={() => setProject({ topText: qt.top, bottomText: qt.bottom })}
                    className="text-xs bg-gray-800 text-gray-300 px-3 py-1.5 rounded-full hover:bg-purple-900 hover:text-purple-300 transition-colors"
                  >
                    {qt.top} / {qt.bottom}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-3">
          <label className="flex-1 flex items-center justify-center gap-2 bg-gray-800 text-gray-300 py-3 rounded-xl hover:bg-gray-700 cursor-pointer transition-colors text-sm">
            <ImagePlus className="w-4 h-4" /> 上传图片
            <input type="file" accept="image/*" onChange={handleCustomImage} className="hidden" />
          </label>
          <button
            onClick={() => { setProject({ topText: '', bottomText: '', fontSize: 36 }); useMemeStore.getState().setCustomImage(null); }}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-800 text-gray-300 py-3 rounded-xl hover:bg-gray-700 transition-colors text-sm"
          >
            <RotateCcw className="w-4 h-4" /> 重置
          </button>
          <button
            onClick={handleExport}
            className="flex-[2] flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all text-sm font-medium"
          >
            <Download className="w-4 h-4" /> 导出 & 保存
          </button>
        </div>
      </div>
    </div>
  )
}
