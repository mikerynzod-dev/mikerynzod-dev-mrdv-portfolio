// Single source of truth for personal info, links and navigation.
export const profile = {
  brand: 'MRDV',
  fullName: 'Mike Rynzo L. Dela Vega',
  shortName: 'Mike Rynzo',
  course: 'Bachelor of Science in Computer Science',
  title: 'Computer Science Student & Aspiring UI/UX Designer',
  identity: 'Computer Science Student | Aspiring UI/UX Designer | Future Web Developer',
  tagline: 'Turning Ideas Into Digital Experiences.',
  email: 'mikerynzod@gmail.com',
  facebook: 'https://www.facebook.com/rynzozkie.delavega/',
  github: 'https://github.com/mikerynzod-dev',
  year: 2026,
}

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Me' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

export const navIds = navLinks.map((l) => l.id)

export const typingWords = [
  'Computer Science Student',
  'UI/UX Enthusiast',
  'Web Development Learner',
  'Creative Problem Solver',
]
