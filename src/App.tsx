import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Resume from './components/Resume'
import Contact from './components/Contact'
import Privacy from './components/Privacy'
import SkipLink from './components/SkipLink'
import PrivacyBanner from './components/PrivacyBanner'
import AccessibilityToolbar from './components/AccessibilityToolbar'
import { useAnalyticsConsent } from './utils/privacy'

function HomePage() {
  return (
    <>
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <SkipLink href="#about">Skip to about section</SkipLink>
      <SkipLink href="#resume">Skip to experience section</SkipLink>
      <SkipLink href="#contact">Skip to contact section</SkipLink>
      
      <main id="main-content">
        <Hero />
        <About />
        <Resume />
        <Contact />
      </main>
    </>
  );
}

function App() {
  const { showBanner, acceptAnalytics, declineAnalytics } = useAnalyticsConsent();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
        
        <footer className="bg-gray-900 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-300">
              © {new Date().getFullYear()} Hector Norzagaray. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            </p>
          </div>
        </footer>
        
        {/* Privacy consent banner */}
        <PrivacyBanner 
          show={showBanner}
          onAccept={acceptAnalytics}
          onDecline={declineAnalytics}
        />
        
        {/* Accessibility toolbar */}
        <AccessibilityToolbar />
      </div>
    </Router>
  )
}

export default App
