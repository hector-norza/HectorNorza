import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div className="relative isolate overflow-hidden pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">
              Hi, I&apos;m <span className="text-primary">Hector Norza</span>
            </h1>
            <p className="text-xl leading-8 text-gray-600 mb-8">
              A passionate Full Stack Developer crafting beautiful and functional web experiences.
              I specialize in building modern web applications with cutting-edge technologies.
            </p>
            <div className="flex items-center justify-center gap-x-6">
              <a 
                href="#projects" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="text-base font-semibold leading-7 text-gray-900 hover:text-primary transition-colors"
              >
                Contact Me <span aria-hidden="true">→</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
