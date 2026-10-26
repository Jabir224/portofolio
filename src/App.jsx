import { useScrollTheme } from './hooks/useScrollTheme'
import { NavBar } from './components/navbar/NavBar'
import { Heros } from './components/heros/heros'
import { About } from './components/About/About'
import { Expertise } from './components/Expertise/expertise'
import { Journey } from './components/journey/journey'
import Projects from './components/projects/projects'
import Contact from './components/contacts/contacts'

function App() {
  useScrollTheme()

  return (
    <div className="main-container">
      <NavBar />
      <Heros />
      <About />
      <Expertise />
      <Projects />
      <Journey />
      <Contact />
    </div>
  )
}

export default App