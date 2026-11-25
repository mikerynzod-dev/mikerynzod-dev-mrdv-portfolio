import { Globe, GraduationCap, PenTool, Server } from 'lucide-react'

export const projectCategories = [
  'All',
  'Web Development',
  'UI/UX Design',
  'School Projects',
  'System Development',
]

/**
 * HOW TO ADD YOUR REAL PROJECTS
 * - Replace each placeholder below (set `placeholder: false`).
 * - `repo`  : GitHub repository URL, or null if you don't have one yet.
 * - `demo`  : live demo URL, or null if there isn't one.
 * - `image` : import a screenshot, e.g.
 *       import shot from '../assets/images/my-project.webp'   then   image: shot
 * - `images`: optional array of extra screenshots shown in the project modal gallery.
 * Nothing here is invented: placeholders are clearly labelled until you fill them in.
 */
export const projects = [
  {
    id: 'mrdv-portfolio',
    title: 'MRDV Portfolio Website',
    category: 'Web Development',
    placeholder: false,
    icon: Globe,
    gradient: ['#5427D9', '#246BFD'],
    description:
      'This personal portfolio — a responsive, animated React website showcasing my journey as a Computer Science student.',
    details:
      'Designed and built from scratch as a reusable set of React components with a dark/light theme, scroll animations, an accessible project modal, and a working contact form.',
    tech: ['React.js', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Lucide React'],
    repo: null,
    demo: null,
    image: null,
    images: [],
  },
  {
    id: 'ui-ux-placeholder',
    title: 'UI/UX Design Project',
    category: 'UI/UX Design',
    placeholder: true,
    icon: PenTool,
    gradient: ['#E83EAE', '#5427D9'],
    description:
      'Placeholder — replace with a Figma case study: research, wireframes, prototype and final screens.',
    details:
      'Add the problem you solved, your design process, and a link to your Figma prototype once it is ready.',
    tech: [],
    repo: null,
    demo: null,
    image: null,
    images: [],
  },
  {
    id: 'school-placeholder',
    title: 'School Project',
    category: 'School Projects',
    placeholder: true,
    icon: GraduationCap,
    gradient: ['#246BFD', '#16D9E8'],
    description:
      'Placeholder — replace with a class project, activity or group output you are proud of.',
    details: 'Add the subject, what you built, your role, and what you learned.',
    tech: [],
    repo: null,
    demo: null,
    image: null,
    images: [],
  },
  {
    id: 'system-placeholder',
    title: 'System Development Project',
    category: 'System Development',
    placeholder: true,
    icon: Server,
    gradient: ['#16D9E8', '#5427D9'],
    description:
      'Placeholder — replace with a full system you built (for example with PHP and MySQL).',
    details: 'Add what the system does, its main features, the stack used, and a repository link.',
    tech: [],
    repo: null,
    demo: null,
    image: null,
    images: [],
  },
]
