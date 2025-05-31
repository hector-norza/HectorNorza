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
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} Hector Norzagaray. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
