import {
  Atom,
  Braces,
  Code,
  Coffee,
  Database,
  FileCode2,
  Figma,
  Github,
  GitBranch,
  LayoutDashboard,
  MonitorSmartphone,
  MousePointerClick,
  Paintbrush,
  PenTool,
  Server,
  Terminal,
  Wind,
  Workflow,
  Zap,
  Code2,
  Palette,
  Wrench,
} from 'lucide-react'

// Only technologies you actually know — no percentages or levels on purpose.
export const skillCategories = [
  {
    id: 'languages',
    title: 'Programming Languages',
    icon: Code2,
    gradient: 'from-neon to-electric',
    items: [
      { name: 'HTML', icon: FileCode2, color: '#E83EAE' },
      { name: 'CSS', icon: Paintbrush, color: '#246BFD' },
      { name: 'JavaScript', icon: Braces, color: '#F5C542' },
      { name: 'Python', icon: Terminal, color: '#16D9E8' },
      { name: 'Java', icon: Coffee, color: '#FF7A59' },
      { name: 'PHP', icon: Server, color: '#8F6BFF' },
    ],
  },
  {
    id: 'design',
    title: 'UI/UX Design',
    icon: Palette,
    gradient: 'from-magenta to-neon',
    items: [
      { name: 'Figma', icon: Figma, color: '#E83EAE' },
      { name: 'UI Design', icon: LayoutDashboard, color: '#8F6BFF' },
      { name: 'UX Design', icon: MousePointerClick, color: '#16D9E8' },
      { name: 'Wireframing', icon: PenTool, color: '#F5C542' },
      { name: 'Prototyping', icon: Workflow, color: '#246BFD' },
      { name: 'Responsive Web Design', icon: MonitorSmartphone, color: '#3DDC97' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Technologies',
    icon: Wrench,
    gradient: 'from-electric to-cyan',
    items: [
      { name: 'React.js', icon: Atom, color: '#16D9E8' },
      { name: 'Vite', icon: Zap, color: '#F5C542' },
      { name: 'Tailwind CSS', icon: Wind, color: '#38BDF8' },
      { name: 'Git', icon: GitBranch, color: '#FF7A59' },
      { name: 'GitHub', icon: Github, color: '#8F6BFF' },
      { name: 'Visual Studio Code', icon: Code, color: '#246BFD' },
    ],
  },
]

export const databaseCategory = {
  id: 'database',
  title: 'Database',
  icon: Database,
  gradient: 'from-cyan to-electric',
  items: [{ name: 'MySQL', icon: Database, color: '#16D9E8' }],
}
