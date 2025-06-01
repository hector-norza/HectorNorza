import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  UsersIcon,
  ClipboardDocumentCheckIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline';

// Define Product Manager skills with icons and descriptions
const skills = [
  {
    category: 'Azure & Developer Tools',
    icon: <ChartBarIcon className="w-8 h-8 text-primary" />,
    items: [
      'Azure Platform & SDK',
      'Developer Experience',
      'API Design',
      'SDK Strategy',
      'Cloud Solutions',
    ],
  },
  {
    category: 'Community & Advocacy',
    icon: <UsersIcon className="w-8 h-8 text-primary" />,
    items: [
      'Community Building',
      'Developer Advocacy',
      'Public Speaking',
      'Content Creation',
      'Global Community Engagement',
    ],
  },
  {
    category: 'Product Management',
    icon: <ClipboardDocumentCheckIcon className="w-8 h-8 text-primary" />,
    items: [
      'Product Strategy',
      'Cross-functional Leadership',
      'Go-to-Market Strategy',
      'Stakeholder Management',
      'User Research',
    ],
  },
  {
    category: 'Technical & AI',
    icon: <RocketLaunchIcon className="w-8 h-8 text-primary" />,
    items: [
      'Responsible AI',
      'JavaScript & React',
      'Full-Stack Development',
      'Technical Writing',
      'Mentoring & Teaching',
    ],
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 overflow-hidden scroll-mt-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
    >
      {/* Background decorations */}
      <div className="absolute right-0 top-1/3 w-1/3 h-full bg-primary/5 dark:bg-primary/10 -z-10 -skew-x-12 translate-x-1/2 transition-colors duration-300"></div>
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-secondary/5 dark:bg-secondary/10 rounded-full -z-10 translate-x-1/2 translate-y-1/2 transition-colors duration-300"></div>
      <div className="absolute left-0 top-0 w-64 h-64 bg-primary/5 dark:bg-primary/10 rounded-full -z-10 -translate-x-1/3 -translate-y-1/3 transition-colors duration-300"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left column - About text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white transition-colors duration-300">
                About Me
              </h2>
              <div className="w-20 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full mb-8"></div>

              <div className="space-y-6 text-lg text-gray-700 dark:text-gray-200 transition-colors duration-300">
                <p>
                  I'm{' '}
                  <span className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                    Hector
                  </span>{' '}
                  — a product manager with a deep passion for building
                  communities and creating tools that bring people together,
                  shaped by my diverse experience as a developer, technical
                  project manager, and program manager.
                </p>
                <p>
                  My journey into tech didn't start with a business plan or a
                  roadmap — it started with people. For years, I've been
                  involved in organizing, growing, and supporting grassroots
                  communities. In doing so, I saw firsthand how technology could
                  either strengthen or isolate — and I knew I wanted to be part
                  of building the kind that strengthens.
                </p>
                <p>
                  As a PM, I bring a community-first mindset to every product I
                  touch. I'm driven by questions like: How will this feature
                  empower the people using it? How can we design for inclusion,
                  trust, and real connection? My technical background enables me
                  to bridge communication gaps between engineers, designers, and
                  end-users, while my project management experience helps me
                  align cross-functional teams and deliver impactful solutions.
                </p>
                <p>
                  Whether leading product strategy, managing technical programs,
                  or driving community-focused initiatives, my goal is always
                  the same: to build tools that bridge gaps — between people,
                  between ideas, and between communities and the impact they
                  seek to make.
                </p>
              </div>

              <motion.div
                className="mt-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <a
                  href="#contact"
                  className="inline-flex items-center px-6 py-3 border border-primary text-base font-medium rounded-lg shadow-sm text-primary hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Connect with Me
                </a>
              </motion.div>
            </motion.div>

            {/* Right column - Skills */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800/95 backdrop-blur-sm border border-gray-100 dark:border-gray-700/50 p-8 rounded-2xl shadow-xl transition-colors duration-300"
            >
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg -z-10"></div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white px-4 py-2 transition-colors duration-300">
                  My Skills & Expertise
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {skills.map((skillGroup, index) => (
                  <motion.div
                    key={skillGroup.category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    viewport={{ once: true }}
                    className="bg-gray-50 dark:bg-gray-700/60 hover:bg-gray-100 dark:hover:bg-gray-700/80 p-6 rounded-xl hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      {skillGroup.icon}
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                        {skillGroup.category}
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-white dark:bg-gray-600/80 text-gray-700 dark:text-gray-100 rounded-full text-sm border border-gray-200 dark:border-gray-500/50 shadow-sm transition-colors duration-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
