import { Fragment } from 'react'
import { AppProvider } from './hooks/useApp.jsx'
import { ORDER, sectionIndex } from './components/ui/sections.js'
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

/** Componente de cada sección numerada. El orden lo da ORDER (ui/sections.js). */
const COMPONENTS = {
  experience: Experience,
  hardware: HardwareProjects,
  skills: Skills,
  lab: Lab,
  software: Software,
  about: About,
  education: Education,
  contact: Contact,
}

export default function App() {
  return (
    <AppProvider>
      <Nav />
      <main>
        <Hero />
        <Credentials />
        {ORDER.map((id) => {
          const Section = COMPONENTS[id]
          return (
            <Fragment key={id}>
              <Section index={sectionIndex(id)} />
              {/* La actividad de GitHub acompaña al software y no lleva número propio. */}
              {id === 'software' && <GitHubStats />}
            </Fragment>
          )
        })}
      </main>
      <Footer />
      <CvDialog />
    </AppProvider>
  )
}
