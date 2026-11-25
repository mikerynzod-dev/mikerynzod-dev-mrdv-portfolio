import { Award, BookOpen, GraduationCap, Lightbulb, Milestone } from 'lucide-react'

// Fill in the bracketed values and the empty `items` arrays with your real details.
// Nothing here is invented; empty lists render a friendly "to be added" note.
export const education = [
  {
    id: 'degree',
    icon: GraduationCap,
    label: 'Degree',
    title: 'Bachelor of Science in Computer Science',
    meta: [
      { k: 'Student', v: 'Mike Rynzo L. Dela Vega' },
      { k: 'School / University', v: '[SCHOOL NAME]' },
      { k: 'Academic Year', v: '[ACADEMIC YEAR]' },
    ],
    items: [],
  },
  {
    id: 'coursework',
    icon: BookOpen,
    label: 'Coursework',
    title: 'Relevant Coursework',
    meta: [],
    items: [], // e.g. 'Data Structures and Algorithms'
  },
  {
    id: 'achievements',
    icon: Award,
    label: 'Achievements',
    title: 'Academic Achievements',
    meta: [],
    items: [],
  },
  {
    id: 'experiences',
    icon: Lightbulb,
    label: 'Learning',
    title: 'Learning Experiences',
    meta: [],
    items: [],
  },
  {
    id: 'milestones',
    icon: Milestone,
    label: 'Milestones',
    title: 'Educational Milestones',
    meta: [],
    items: [],
  },
]
