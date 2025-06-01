import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useContrastColors } from '../hooks/useContrastColors';

export default function Hero() {
  const colors = useContrastColors();

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const headerHeight = 64;
      const additionalPadding = 32;
      const elementPosition = contactSection.offsetTop;
      const offsetPosition = elementPosition - headerHeight - additionalPadding;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-300 ${colors.background.primary}`}
      aria-label="Hero section"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Main heading - Fixed spacing */}
          <motion.h1
            className={`text-4xl sm:text-6xl lg:text-7xl font-bold transition-colors duration-300 ${colors.heading}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="block mb-2">Hi, I'm</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-300% animate-gradient leading-tight">
              Hector
            </span>
          </motion.h1>

          {/* Subtitle - Added more spacing */}
          <motion.p
            className={`text-xl md:text-2xl font-medium max-w-3xl mx-auto transition-colors duration-300 ${colors.secondary} mt-8`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            a Product Manager & Community Builder
          </motion.p>

          {/* Description - Added more spacing */}
          <motion.p
            className={`text-lg md:text-xl max-w-4xl mx-auto leading-relaxed transition-colors duration-300 ${colors.body} mt-8`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Passionate about building tools that bring people together through
            responsible AI and community-driven development. I bridge the gap
            between technology and human connection.
          </motion.p>

          {/* CTA Buttons - Added more spacing */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <button
              onClick={scrollToContact}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              aria-label="Navigate to contact section"
            >
              Get In Touch
            </button>

            <Link
              to="/blog"
              className={`inline-flex items-center px-8 py-4 border-2 border-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${colors.interactive}`}
              aria-label="Read Hector's blog posts"
            >
              Read Blog
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Add these custom animations to your tailwind.config.js if not already present:
/*
module.exports = {
  theme: {
    extend: {
      animation: {
        'gradient': 'gradient 6s ease infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      }
    }
  }
}
*/
