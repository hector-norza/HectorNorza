import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div className="relative isolate overflow-hidden min-h-screen flex items-center">
      {/* Background gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-primary/5 to-white -z-10"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1zbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjAyIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00ek0yMCAyMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAx'+
        'Ljc5IDQgNCA0IDQtMS43OSA0LTR6bTMyIDBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+')] opacity-30 -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 z-10">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Hector Norzagaray</span>
            </h1>
            <motion.p 
              className="text-xl md:text-2xl leading-8 text-gray-600 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Product Manager on the Microsoft Azure SDK team, dedicated to improving developer experience and fostering strong tech communities. <br /> 
              <br /> 
              Host of the Azure Developer SDK Community Standup, where I connect developers with insights, tools, and discussions to elevate their experience. </motion.p>
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
              <a
                href="#contact"
                className="text-base font-semibold leading-7 text-gray-900 hover:text-primary transition-colors group flex items-center"
              >
                Contact Me <span className="ml-1 group-hover:translate-x-1 transition-transform duration-200">→</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-[10%] w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 left-[15%] w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10"></div>
    </div>
  );
}
