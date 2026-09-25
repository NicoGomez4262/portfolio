import { AppProvider } from './hooks/useApp.jsx'
import { sectionVisible } from './components/ui/sections.js'
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
import CvDialog from './components/CvDialog.jsx'

/**
 * Orden pensado para un reclutador de hardware (Kiwibot / robot.com):
 * prueba técnica primero, contexto después.
 */
const ORDER = ['hardware', 'experience', 'skills', 'lab', 'software', 'education', 'contact'].filter(sectionVisible)
const idx = (id) => String(ORDER.indexOf(id) + 1).padStart(2, '0')

export default function App() {
  return (
    <AppProvider>
      <Nav />
      <main>
        <Hero />
        <Credentials />
        <About index="00" />
        <HardwareProjects index={idx('hardware')} />
        <Experience index={idx('experience')} />
        <Skills index={idx('skills')} />
        {sectionVisible('lab') && <Lab index={idx('lab')} />}
        <Software index={idx('software')} />
        <GitHubStats />
        <Education index={idx('education')} />
        <Contact index={idx('contact')} />
      </main>
      <Footer />
      <CvDialog />
    </AppProvider>
  )
}
