import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

export default function Hero() {
  const { isDarkMode } = useTheme();

  return (
    <section
      className={`relative min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDarkMode
          ? 'bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20'
          : 'bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20'
      }`}
    >
      {/* Background gradient and pattern - Make theme-aware */}
      <div
        className={`absolute inset-0 -z-10 transition-colors duration-300 ${
          isDarkMode
            ? 'bg-gradient-to-b from-gray-900 via-blue-900/10 to-gray-900'
            : 'bg-gradient-to-b from-white via-primary/5 to-white'
        }`}
      ></div>
      <div
        className={`absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1zbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjAyIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00ek0yMCAyMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTMyIDBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+')] -z-10 transition-opacity duration-300 ${
          isDarkMode ? 'opacity-10' : 'opacity-30'
        }`}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 z-10">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {/* Make title theme-aware */}
            <h1
              className={`text-5xl sm:text-6xl md:text-7xl font-bold mb-8 leading-tight transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Hi, I&apos;m{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Hector
              </span>
            </h1>
            {/* Make description theme-aware */}
            <motion.p
              className={`text-xl md:text-2xl leading-8 mb-12 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Product Manager on the Microsoft Azure SDK team, dedicated to
              improving developer experience and fostering strong tech
              communities. <br />
              <br />
              Host of the Azure Developer SDK Community Standup, where I connect
              developers with insights, tools, and discussions to elevate their
              experience.
            </motion.p>
            <motion.div
              className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <a
                href="#resume"
                className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-xl shadow-lg text-white bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 transform hover:-translate-y-1"
              >
                View My Experience
              </a>
              {/* Make secondary button theme-aware */}
              <Link
                to="/blog"
                className={`inline-flex items-center px-8 py-4 border text-base font-medium rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 transform hover:-translate-y-1 ${
                  isDarkMode
                    ? 'border-gray-600 text-white bg-gray-800 hover:bg-gray-700'
                    : 'border-gray-300 text-gray-900 bg-white hover:bg-gray-50'
                }`}
              >
                Read My Blog
              </Link>
              {/* Make contact link theme-aware */}
              <a
                href="#contact"
                className={`text-base font-semibold leading-7 transition-colors group flex items-center ${
                  isDarkMode
                    ? 'text-gray-300 hover:text-blue-400'
                    : 'text-gray-900 hover:text-primary'
                }`}
              >
                Contact Me{' '}
                <span className="ml-1 group-hover:translate-x-1 transition-transform duration-200">
                  →
                </span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-[10%] w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 left-[15%] w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10"></div>
    </section>
  );
}
