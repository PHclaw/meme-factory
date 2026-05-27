import type { MemeTemplate } from './store'

// Built-in meme templates using placeholder emoji + gradient backgrounds
// (No external image dependencies)
export const MEME_TEMPLATES: MemeTemplate[] = [
  // 经典
  { id: 'drake', name: 'Drake 看不起', image: '🤨', category: '经典' },
  { id: 'distracted', name: '出轨男友', image: '👀', category: '经典' },
  { id: 'brain', name: '扩大脑', image: '🧠', category: '经典' },
  { id: 'change', name: '改变我的想法', image: '🪧', category: '经典' },
  { id: 'surprised', name: '惊呆老铁', image: '😲', category: '经典' },
  { id: 'thisis', name: '这就是...', image: '👉', category: '经典' },

  // 工作
  { id: 'meetings', name: '这个会议本可以', image: '📧', category: '工作' },
  { id: 'todo', name: 'TODO 写完就=做完', image: '📝', category: '工作' },
  { id: 'deadline', name: 'Deadline 战士', image: '⏰', category: '工作' },
  { id: 'bug', name: '不是Bug是Feature', image: '🐛', category: '工作' },
  { id: 'code', name: '能跑就别动', image: '💻', category: '工作' },
  { id: 'deploy', name: '周五部署', image: '🚀', category: '工作' },

  // 心情
  { id: 'monday', name: '周一综合症', image: '😩', category: '心情' },
  { id: 'weekend', name: '周末嗨', image: '🥳', category: '心情' },
  { id: 'anxiety', name: '焦虑循环', image: '😰', category: '心情' },
  { id: 'zen', name: '佛系人生', image: '🧘', category: '心情' },
  { id: 'procrastinate', name: '拖延症发作', image: '🦥', category: '心情' },
  { id: 'mood', name: '心情过山车', image: '🎢', category: '心情' },

  // 社交
  { id: 'seen', name: '已读不回', image: '👁️', category: '社交' },
  { id: 'group', name: '群聊潜水', image: '🤿', category: '社交' },
  { id: 'reply', name: '秒回 vs 轮回', image: '⚡', category: '社交' },
  { id: 'ghost', name: '社交幽灵', image: '👻', category: '社交' },
  { id: 'friend', name: '假朋友检测', image: '🤖', category: '社交' },
  { id: 'party', name: '社恐vs社牛', image: '🎭', category: '社交' },
]

// Background gradients for each template (to render without external images)
export const TEMPLATE_GRADIENTS: Record<string, string> = {
  drake: 'linear-gradient(180deg, #ff6b35 0%, #f7c948 50%, #ff6b35 100%)',
  distracted: 'linear-gradient(180deg, #e84393 0%, #fd79a8 50%, #e84393 100%)',
  brain: 'linear-gradient(180deg, #6c5ce7 0%, #a29bfe 50%, #6c5ce7 100%)',
  change: 'linear-gradient(180deg, #00b894 0%, #55efc4 50%, #00b894 100%)',
  surprised: 'linear-gradient(180deg, #fdcb6e 0%, #ffeaa7 50%, #fdcb6e 100%)',
  thisis: 'linear-gradient(180deg, #0984e3 0%, #74b9ff 50%, #0984e3 100%)',
  meetings: 'linear-gradient(180deg, #636e72 0%, #b2bec3 50%, #636e72 100%)',
  todo: 'linear-gradient(180deg, #e17055 0%, #fab1a0 50%, #e17055 100%)',
  deadline: 'linear-gradient(180deg, #d63031 0%, #ff7675 50%, #d63031 100%)',
  bug: 'linear-gradient(180deg, #00cec9 0%, #81ecec 50%, #00cec9 100%)',
  code: 'linear-gradient(180deg, #2d3436 0%, #636e72 50%, #2d3436 100%)',
  deploy: 'linear-gradient(180deg, #e84393 0%, #fd79a8 50%, #e84393 100%)',
  monday: 'linear-gradient(180deg, #2d3436 0%, #636e72 100%)',
  weekend: 'linear-gradient(180deg, #fd79a8 0%, #e84393 100%)',
  anxiety: 'linear-gradient(180deg, #d63031 0%, #e17055 100%)',
  zen: 'linear-gradient(180deg, #00b894 0%, #55efc4 100%)',
  procrastinate: 'linear-gradient(180deg, #636e72 0%, #b2bec3 100%)',
  mood: 'linear-gradient(180deg, #a29bfe 0%, #fd79a8 50%, #fdcb6e 100%)',
  seen: 'linear-gradient(180deg, #0984e3 0%, #74b9ff 100%)',
  group: 'linear-gradient(180deg, #00cec9 0%, #81ecec 100%)',
  reply: 'linear-gradient(180deg, #fdcb6e 0%, #e17055 100%)',
  ghost: 'linear-gradient(180deg, #636e72 0%, #dfe6e9 100%)',
  friend: 'linear-gradient(180deg, #e84393 0%, #a29bfe 100%)',
  party: 'linear-gradient(180deg, #fd79a8 0%, #a29bfe 50%, #00cec9 100%)',
}

export const CATEGORIES = ['全部', '经典', '工作', '心情', '社交']

// Quick text suggestions
export const QUICK_TEXTS: Record<string, { top: string; bottom: string }[]> = {
  drake: [
    { top: '加班写代码', bottom: '摸鱼写代码' },
    { top: '用CSS', bottom: '用!important' },
  ],
  distracted: [
    { top: '我爱的编程语言', bottom: '刚发布的新语言' },
  ],
  brain: [
    { top: '小脑', bottom: '银河大脑' },
  ],
  bug: [
    { top: '这不是bug', bottom: '这是feature' },
  ],
  deadline: [
    { top: '还有一周', bottom: '还有一天' },
  ],
  monday: [
    { top: '周一的我', bottom: '周五的我' },
  ],
  seen: [
    { top: '已读', bottom: '不回' },
  ],
}
