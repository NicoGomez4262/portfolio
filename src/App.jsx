import { AppProvider } from './hooks/useApp.jsx'
import { SECTIONS } from './data/content.js'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Credentials from './components/Credentials.jsx'
import About from './components/About.jsx'
import HardwareProjects from './components/HardwareProjects.jsx'
import Experience from './components/Experience.jsx'
import Skills from './components/Skills.jsx'
import Lab from './components/Lab.jsx'
import Software from './components/Software.jsx'
import GitHubStats from './components/GitHubStats.jsx'
import Education from './components/Education.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

/**
 * Orden pensado para un reclutador de hardware (Kiwibot / robot.com):
 * prueba técnica primero, contexto después.
 */
export default function App() {
  return (
    <AppProvider>
      <Nav />
      <main>
        <Hero />
        <Credentials />
        <About />
        <HardwareProjects />
        <Experience />
        <Skills />
        {SECTIONS.lab && <Lab />}
        <Software />
        <GitHubStats />
        <Education />
        <Contact />
      </main>
      <Footer />
    </AppProvider>
  )
}
