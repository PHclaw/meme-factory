import { create } from 'zustand'

export interface MemeTemplate {
  id: string
  name: string
  image: string
  category: string
}

export interface MemeProject {
  templateId: string
  topText: string
  bottomText: string
  fontSize: number
}

export interface SavedMeme {
  id: string
  dataUrl: string
  topText: string
  bottomText: string
  createdAt: string
}

interface MemeStore {
  templates: MemeTemplate[]
  selectedTemplate: MemeTemplate | null
  project: MemeProject
  savedMemes: SavedMeme[]
  customImage: string | null

  setSelectedTemplate: (t: MemeTemplate) => void
  setProject: (p: Partial<MemeProject>) => void
  setCustomImage: (url: string | null) => void
  addSavedMeme: (m: SavedMeme) => void
  removeSavedMeme: (id: string) => void
}

const DEFAULT_PROJECT: MemeProject = {
  templateId: '',
  topText: '',
  bottomText: '',
  fontSize: 36,
}

export const useMemeStore = create<MemeStore>((set) => ({
  templates: [],
  selectedTemplate: null,
  project: DEFAULT_PROJECT,
  savedMemes: [],
  customImage: null,

  setSelectedTemplate: (t) => set({ selectedTemplate: t, project: { ...DEFAULT_PROJECT, templateId: t.id }, customImage: null }),
  setProject: (p) => set((s) => ({ project: { ...s.project, ...p } })),
  setCustomImage: (url) => set({ customImage: url, selectedTemplate: null, project: { ...DEFAULT_PROJECT } }),
  addSavedMeme: (m) => set((s) => ({ savedMemes: [m, ...s.savedMemes] })),
  removeSavedMeme: (id) => set((s) => ({ savedMemes: s.savedMemes.filter(m => m.id !== id) })),
}))
