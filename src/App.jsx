import { useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig, useReducedMotion } from 'framer-motion'
import Background from './components/Background.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import LoadingScreen from './components/LoadingScreen.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Education from './components/Education.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import BackToTop from './components/BackToTop.jsx'
import useTheme from './hooks/useTheme.js'
import useActiveSection from './hooks/useActiveSection.js'
import { navIds, navLinks } from './data/site.js'

export default function App() {
  const { theme, toggle } = useTheme()
  const active = useActiveSection(navIds)
  const reduced = useReducedMotion()
  const [loading, setLoading] = useState(true)

  // Keep the page still while the loading screen is visible.
  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [loading])

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      <AnimatePresence>
        {loading && <LoadingScreen key="loader" reduced={!!reduced} onDone={() => setLoading(false)} />}
      </AnimatePresence>

      <Background reduced={!!reduced} />
      <CustomCursor />

      <div className="relative z-10 overflow-x-clip">
        <Navbar links={navLinks} active={active} theme={theme} onToggleTheme={toggle} />
        <main id="main">
          <Hero ready={!loading} reduced={!!reduced} />
          <About />
          <Skills />
          <Projects />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>

      <BackToTop />
    </MotionConfig>
  )
}
