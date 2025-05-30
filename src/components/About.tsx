import { motion } from 'framer-motion';
import { ChartBarIcon, UsersIcon, ClipboardDocumentCheckIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

// Define Product Manager skills with icons and descriptions
const skills = [
  {
    category: "Azure & Developer Tools",
    icon: <ChartBarIcon className="w-8 h-8 text-primary" />,
    items: [
      "Azure Platform & SDK",
      "Developer Experience",
      "API Design",
      "SDK Strategy",
      "Cloud Solutions"
    ]
  },
  {
    category: "Community & Advocacy",
    icon: <UsersIcon className="w-8 h-8 text-primary" />,
    items: [
      "Community Building",
      "Developer Advocacy",
      "Public Speaking",
      "Content Creation",
      "Global Community Engagement"
    ]
  },
  {
    category: "Product Management",
    icon: <ClipboardDocumentCheckIcon className="w-8 h-8 text-primary" />,
    items: [
      "Product Strategy",
      "Cross-functional Leadership",
      "Go-to-Market Strategy",
      "Stakeholder Management",
      "User Research"
    ]
  },
  {
    category: "Technical & AI",
    icon: <RocketLaunchIcon className="w-8 h-8 text-primary" />,
    items: [
      "Responsible AI",
      "JavaScript & React",
      "Full-Stack Development",
      "Technical Writing",
      "Mentoring & Teaching"
    ]
  }
];

export default function About() {
  return (
    <section id="about" className="relative py-24 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute right-0 top-1/3 w-1/3 h-full bg-primary/5 -z-10 -skew-x-12 translate-x-1/2"></div>
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-secondary/5 rounded-full -z-10 translate-x-1/2 translate-y-1/2"></div>
      <div className="absolute left-0 top-0 w-64 h-64 bg-primary/5 rounded-full -z-10 -translate-x-1/3 -translate-y-1/3"></div>
      
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
              <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary inline-block">About Me</h2>
              <div className="w-20 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full mb-8"></div>
              
              <div className="space-y-6 text-lg text-gray-600">
                <p>
                  I'm a <span className="font-semibold text-gray-900">Product Manager II at Microsoft Azure</span>, where I lead community-focused product initiatives that serve millions of developers worldwide.
                  My passion lies in creating exceptional developer experiences and building vibrant tech communities.
                </p>
                <p>
                  As the host of the <span className="font-semibold text-gray-900">Azure Developer SDK Community Standup</span>, I engage with our global developer community, gathering feedback and driving product improvements.
                  My journey from teaching full-stack development at Code Fellows to leading product strategy at Microsoft has given me a unique perspective on both the technical and human sides of software development.
                </p>
                <p>
                  I specialize in developer advocacy, community building, and Responsible AI practices. I believe great products are built when we truly understand and serve our users' needs.
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
                  Let's Connect
                </a>
              </motion.div>
            </motion.div>
            
            {/* Right column - Skills */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-xl"
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-900">My Skills & Expertise</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {skills.map((skillGroup, index) => (
                  <motion.div 
                    key={skillGroup.category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    viewport={{ once: true }}
                    className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      {skillGroup.icon}
                      <h4 className="text-xl font-semibold text-gray-900">{skillGroup.category}</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map(skill => (
                        <span 
                          key={skill} 
                          className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border border-gray-200 shadow-sm"
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
