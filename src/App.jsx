import { useScrollTheme } from './hooks/useScrollTheme'
import { useContentStatus } from './hooks/contexts'
import { NavBar } from './components/navbar/NavBar'
import { Heros } from './components/heros/Heros'
import { About } from './components/About/About'
import { Expertise } from './components/Expertise/expertise'
import { Projects } from './components/projects/projects'
import { Journey } from './components/journey/Journey'
import { Contact } from './components/contacts/contacts'
import { LoadingScreen } from './components/status/loadingScreen'
import { ErrorScreen } from './components/status/ErrorScreen'

function App() {
  useScrollTheme()
  const { status, isSlow, errorCode, retry } = useContentStatus()

  if (status === 'loading') return <LoadingScreen isSlow={isSlow} />
  if (status === 'error') return <ErrorScreen errorCode={errorCode} onRetry={retry} />

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