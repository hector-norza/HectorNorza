import { motion } from 'framer-motion';
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon';
import DocumentTextIcon from '@heroicons/react/24/outline/DocumentTextIcon';
import { useContrastColors } from '../hooks/useContrastColors';
import { trackSectionView, trackEvent } from '../utils/analytics'; // ← ADD THIS LINE

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 0.8,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function Hero() {
  const colors = useContrastColors();

  // Smooth scroll function with analytics
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Track section navigation
      trackSectionView(sectionId);
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  // Direct blog navigation function with analytics
  const navigateToBlog = () => {
    console.log('🔗 Navigate to blog from Hero');
    // Track blog navigation from Hero
    trackEvent('blog_navigate', 'Hero CTA', 'read_my_blog_button');
    window.location.hash = 'blog';
  };

  // Scroll to contact function with analytics
  const scrollToContact = () => {
    // Track contact navigation from Hero
    trackEvent('contact_navigate', 'Hero CTA', 'get_in_touch_button');
    
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
      id="hero"
      className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-300 pt-16 md:pt-20 ${colors.background.primary}`}
      aria-label="Hero section"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/5 -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Main heading */}
          <motion.h1
            variants={itemVariants}
            className={`text-4xl sm:text-6xl lg:text-7xl font-bold transition-colors duration-300 ${colors.heading}`}
          >
            <span className="block mb-2">Hi, I'm</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500 leading-tight">
              Hector
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className={`text-xl md:text-2xl font-medium max-w-3xl mx-auto transition-colors duration-300 ${colors.body} mt-8`}
          >
            a Product Manager & Community Builder
          </motion.p>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className={`text-lg md:text-xl max-w-4xl mx-auto leading-relaxed transition-colors duration-300 ${colors.body} mt-8`}
          >
            Passionate about building tools that bring people together through
            responsible AI and community-driven development. I bridge the gap
            between technology and human connection.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-12"
          >
            {/* Primary Blog Button */}
            <motion.button
              onClick={navigateToBlog}
              className="btn-primary group relative overflow-hidden"
              aria-label="Navigate to blog section"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>

              {/* Button content */}
              <div className="relative flex items-center">
                <DocumentTextIcon className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Read My Blog
                <motion.span
                  className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                </motion.span>
              </div>
            </motion.button>

            {/* Secondary Contact Button */}
            <motion.button
              onClick={scrollToContact}
              className="btn-secondary"
              aria-label="Navigate to contact section"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Get In Touch
            </motion.button>
          </motion.div>

          {/* Scroll Down Indicator */}
          <motion.div
            variants={itemVariants}
            className="mt-16"
          >
            <button
              onClick={() => scrollToSection('about')}
              className={`${colors.secondary} hover:text-primary-500 dark:hover:text-primary-400 transition-all duration-300 group`}
              aria-label="Scroll to about section"
            >
              <ChevronDownIcon className="w-6 h-6 mx-auto animate-bounce group-hover:scale-110 transition-transform" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}