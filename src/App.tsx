import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Resume from './components/Resume'
import Contact from './components/Contact'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Resume />
        <Contact />
      </main>
    </div>
  )
}

export default App
