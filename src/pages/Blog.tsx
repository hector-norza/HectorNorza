import { motion } from 'framer-motion';
import BlogList from '../components/BlogList';
import { RssIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

export default function Blog() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-white via-primary/5 to-white dark:from-gray-900 dark:via-primary/5 dark:to-gray-900">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1zbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjAyIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00ek0yMCAyMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTMyIDBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+')] opacity-30 -z-10"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 right-[15%] w-48 h-48 bg-secondary/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-1/4 left-[10%] w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Blog</span>
            </h1>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Thoughts on product management, community building, and the intersection 
              of technology and human connection. Insights from my journey in building 
              products that bring people together.
            </motion.p>
            
            {/* Subscribe Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              {/* Email Subscription via Blogtrottr */}
              <a
                href="https://blogtrottr.com/?subscribe=https://hectornorza.com/rss.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                aria-label="Subscribe to email notifications"
              >
                <EnvelopeIcon className="h-5 w-5" />
                Subscribe via Email
              </a>
              
              {/* RSS Feed */}
              <a
                href="/rss.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                aria-label="Subscribe to RSS feed"
              >
                <RssIcon className="h-5 w-5" />
                Subscribe to RSS
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Blog Content */}
      <div className="py-12">
        <BlogList />
      </div>
    </div>
  );
}
