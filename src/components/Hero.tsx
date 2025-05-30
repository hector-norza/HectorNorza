import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-b from-primary/10">
      <div className="section-container pb-24 pt-32 sm:pt-40">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="heading-primary mb-8">
              Hi, I'm <span className="text-primary">Hector Norza</span>
            </h1>
            <p className="text-xl leading-8 text-gray-600 mb-8">
              A passionate Full Stack Developer crafting beautiful and functional web experiences.
              I specialize in building modern web applications with cutting-edge technologies.
            </p>
            <div className="flex items-center justify-center gap-x-6">
              <a href="#projects" className="btn-primary">
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
      <div
        className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-secondary opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
  );
}
