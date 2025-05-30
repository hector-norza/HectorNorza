import { motion } from 'framer-motion';
import { EnvelopeIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

export default function Contact() {
  return (
    <section id="contact" className="relative bg-white">
      <div className="section-container">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-secondary mb-8">Get in Touch</h2>
            <p className="text-lg leading-8 text-gray-600 mb-12">
              I'm always interested in hearing about new projects and opportunities.
              Whether you have a question or just want to say hi, feel free to reach out!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2"
          >
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg">
              <EnvelopeIcon className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <a
                href="mailto:norza.hector@outlook.com"
                className="text-primary hover:text-secondary transition-colors"
              >
                norza.hector@outlook.com
              </a>
            </div>

            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg">
              <GlobeAltIcon className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Social</h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/hector-norza"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-secondary transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/norza/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-secondary transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
