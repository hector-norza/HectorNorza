import { motion } from 'framer-motion';
import { DocumentArrowDownIcon, AcademicCapIcon, BriefcaseIcon, CodeBracketIcon } from '@heroicons/react/24/outline';

const education = [
  {
    degree: "Bachelor's Degree in Computer Science",
    school: "Your University",
    location: "City, State",
    year: "2018 - 2022",
    description: "Relevant coursework: Data Structures, Algorithms, Software Engineering, Database Systems, Web Development"
  }
];

const experience = [
  {
    title: "Full Stack Developer",
    company: "Your Current Company",
    location: "Remote",
    period: "2023 - Present",
    description: [
      "Developed responsive web applications using React, TypeScript, and modern JavaScript frameworks",
      "Built scalable backend services with Node.js and implemented RESTful APIs",
      "Collaborated with cross-functional teams in agile development environment",
      "Optimized application performance and implemented best practices for code quality"
    ]
  },
  {
    title: "Frontend Developer",
    company: "Previous Company",
    location: "City, State",
    period: "2022 - 2023",
    description: [
      "Created user-friendly interfaces using React, HTML5, CSS3, and modern design principles",
      "Implemented responsive designs that work seamlessly across different devices",
      "Worked closely with UI/UX designers to translate mockups into functional components",
      "Participated in code reviews and maintained high coding standards"
    ]
  },
  {
    title: "Software Developer Intern",
    company: "Tech Startup",
    location: "City, State",
    period: "Summer 2021",
    description: [
      "Gained hands-on experience with modern web technologies and development workflows",
      "Contributed to feature development and bug fixes in customer-facing applications",
      "Learned agile methodologies and participated in daily standups and sprint planning",
      "Developed problem-solving skills through real-world coding challenges"
    ]
  }
];

const skills = [
  {
    category: "Frontend",
    items: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Next.js", "Vue.js", "Sass"]
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "Python", "PostgreSQL", "MongoDB", "REST APIs", "GraphQL", "Firebase"]
  },
  {
    category: "Tools & Technologies",
    items: ["Git", "GitHub", "Docker", "AWS", "Vercel", "VS Code", "Figma", "Webpack", "Vite"]
  }
];

export default function Resume() {
  return (
    <section id="resume" className="relative py-24 bg-gradient-to-b from-white to-gray-50">
      {/* Background decorations */}
      <div className="absolute left-0 top-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary inline-block">
              Resume
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-6"></div>
            <p className="text-lg md:text-xl leading-8 text-gray-600 max-w-3xl mx-auto mb-8">
              My professional experience, education, and technical skills.
            </p>
            <motion.a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors duration-300 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <DocumentArrowDownIcon className="w-5 h-5" />
              Download Resume
            </motion.a>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <BriefcaseIcon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Experience</h3>
              </div>
              <div className="space-y-8">
                {experience.map((job, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="border-l-4 border-primary/20 pl-6 relative"
                  >
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-2 top-0"></div>
                    <h4 className="text-xl font-semibold text-gray-900">{job.title}</h4>
                    <p className="text-primary font-medium">{job.company}</p>
                    <p className="text-gray-600 text-sm mb-3">{job.location} | {job.period}</p>
                    <ul className="space-y-2">
                      {job.description.map((item, i) => (
                        <li key={i} className="text-gray-700 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Education & Skills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Education */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-secondary/10 p-3 rounded-lg">
                  <AcademicCapIcon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Education</h3>
              </div>
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-semibold text-gray-900 mb-1">{edu.degree}</h4>
                  <p className="text-secondary font-medium">{edu.school}</p>
                  <p className="text-gray-600 text-sm mb-2">{edu.location} | {edu.year}</p>
                  <p className="text-gray-700 text-sm">{edu.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Skills */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-accent/10 p-3 rounded-lg">
                  <CodeBracketIcon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Skills</h3>
              </div>
              <div className="space-y-6">
                {skills.map((skillGroup, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <h4 className="font-semibold text-gray-900 mb-3">{skillGroup.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
