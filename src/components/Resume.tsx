import { motion } from 'framer-motion';
import { 
  DocumentArrowDownIcon, 
  BriefcaseIcon, 
  AcademicCapIcon,
  TrophyIcon,
  ChartBarIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

const experiences = [
  {
    title: "Product Manager II",
    company: "Microsoft Azure",
    period: "2023 - Present",
    location: "Remote",
    description: [
      "Lead community-focused product initiatives for Azure Developer Experience, serving millions of developers worldwide",
      "Host Azure Developer SDK Community Standup, building engagement with global developer community",
      "Drive product strategy and roadmap for developer tools and SDK experiences across multiple Azure services",
      "Collaborate with engineering teams to deliver developer-focused features that improve Azure adoption",
      "Champion Responsible AI practices and community guidelines in product development lifecycle"
    ],
    technologies: ["Azure SDK", "Developer Experience", "Community Management", "Product Strategy", "Responsible AI"]
  },
  {
    title: "Product Manager",
    company: "Microsoft Azure",
    period: "2021 - 2023",
    location: "Remote",
    description: [
      "Managed Azure SDK product development and community engagement initiatives",
      "Built strategic partnerships with developer advocacy teams to enhance SDK adoption",
      "Created and executed go-to-market strategies for new Azure SDK releases",
      "Developed comprehensive feedback loops with developer community to inform product decisions",
      "Led cross-functional teams to deliver SDK improvements that increased developer satisfaction scores"
    ],
    technologies: ["Azure Platform", "SDK Development", "Developer Advocacy", "Community Building", "Product Analytics"]
  },
  {
    title: "Senior Software Engineer",
    company: "Stova (formerly Aventri)",
    period: "2020 - 2021",
    location: "Austin, TX",
    description: [
      "Developed full-stack solutions for event management platform serving enterprise clients",
      "Built responsive web applications using React, Node.js, and modern JavaScript frameworks",
      "Collaborated with product and design teams to implement user-focused features",
      "Mentored junior developers and contributed to technical architecture decisions"
    ],
    technologies: ["React", "Node.js", "JavaScript", "Full-Stack Development", "Event Management Systems"]
  },
  {
    title: "Freelance Full-Stack Developer",
    company: "Independent Contractor",
    period: "2018 - 2020",
    location: "Austin, TX",
    description: [
      "Delivered custom web applications for small businesses and startups",
      "Specialized in React, JavaScript, and modern web development technologies",
      "Provided technical consulting and mentorship to development teams",
      "Built responsive, user-friendly applications focused on business growth"
    ],
    technologies: ["React", "JavaScript", "Web Development", "Client Consulting", "Business Applications"]
  },
  {
    title: "Instructor",
    company: "Code Fellows",
    period: "2017 - 2018",
    location: "Seattle, WA",
    description: [
      "Taught full-stack JavaScript development bootcamp to career-transitioning students",
      "Developed curriculum for modern web development technologies and best practices",
      "Mentored students through intensive coding programs and career transitions",
      "Created engaging learning experiences that prepared students for software development careers"
    ],
    technologies: ["JavaScript", "Teaching", "Curriculum Development", "Mentoring", "Full-Stack Development"]
  }
];

const education = [
  {
    degree: "Software Development Certificate",
    school: "Code Fellows",
    period: "2017",
    gpa: "Completed with Excellence",
    achievements: [
      "Full-Stack JavaScript Development",
      "Modern Web Development Best Practices",
      "Intensive 20-week Bootcamp Program"
    ]
  }
];

const certifications = [
  {
    name: "Microsoft Azure Fundamentals",
    issuer: "Microsoft",
    date: "2021",
    icon: "☁️"
  },
  {
    name: "Product Management Certificate",
    issuer: "Product School",
    date: "2021",
    icon: "🎯"
  },
  {
    name: "Responsible AI Professional",
    issuer: "Microsoft",
    date: "2023",
    icon: "🤖"
  },
  {
    name: "Community Leadership Certification",
    issuer: "Community Roundtable",
    date: "2022",
    icon: "👥"
  }
];

const achievements = [
  {
    name: "Azure Developer Community Leader",
    description: "Host of Azure Developer SDK Community Standup, engaging with global developer community",
    year: "2023",
    impact: "Weekly engagement with thousands of Azure developers"
  },
  {
    name: "Product Innovation Excellence",
    description: "Led community-focused product initiatives that improved Azure developer experience",
    year: "2022",
    impact: "Enhanced SDK adoption and developer satisfaction"
  },
  {
    name: "Technical Educator & Mentor",
    description: "Successfully transitioned from teaching at Code Fellows to Microsoft Product Management",
    year: "2021",
    impact: "Mentored 100+ students in software development careers"
  }
];

const skills = [
  "Product Management",
  "Azure Platform & SDK",
  "Developer Experience",
  "Community Building",
  "Developer Advocacy",
  "Responsible AI",
  "Product Strategy",
  "Cross-functional Leadership",
  "Stakeholder Management",
  "JavaScript & React",
  "Full-Stack Development",
  "Technical Writing",
  "Public Speaking",
  "Mentoring & Teaching",
  "Go-to-Market Strategy",
  "User Research",
  "Agile Development",
  "Content Creation"
];

export default function Resume() {
  return (
    <section id="resume" className="relative py-24 bg-gradient-to-b from-gray-50 to-white">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary inline-block">
              Experience
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-6"></div>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              My journey from software development educator to Microsoft Azure Product Manager, focused on building exceptional developer experiences and vibrant communities.
            </p>
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <DocumentArrowDownIcon className="w-5 h-5" />
              Download Full Resume
            </motion.a>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Experience & Education */}
          <div className="lg:col-span-2 space-y-12">
            {/* Experience Section */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="p-3 bg-gradient-to-r from-primary to-secondary rounded-lg text-white">
                  <BriefcaseIcon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Professional Experience</h3>
              </motion.div>

              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                  >
                    <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-primary to-secondary rounded-l-xl"></div>
                    <div className="ml-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <h4 className="text-xl font-semibold text-gray-900">{exp.title}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <CalendarIcon className="w-4 h-4" />
                          {exp.period}
                        </div>
                      </div>
                      <div className="text-primary font-medium mb-2">{exp.company} • {exp.location}</div>
                      <ul className="space-y-2 text-gray-600 mb-4">
                        {exp.description.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, i) => (
                          <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Education Section */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg text-white">
                  <AcademicCapIcon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Education</h3>
              </motion.div>

              <div className="space-y-6">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <h4 className="text-lg font-semibold text-gray-900">{edu.degree}</h4>
                      <span className="text-sm text-gray-500">{edu.period}</span>
                    </div>
                    <div className="text-primary font-medium mb-2">{edu.school}</div>
                    <div className="text-gray-600 mb-3">GPA: {edu.gpa}</div>
                    <div className="space-y-1">
                      {edu.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <TrophyIcon className="w-4 h-4 text-yellow-500" />
                          {achievement}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Certifications & Achievements */}
          <div className="space-y-12">
            {/* Certifications */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white">
                  <TrophyIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Certifications</h3>
              </motion.div>

              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white p-4 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{cert.icon}</span>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">{cert.name}</h4>
                        <p className="text-sm text-gray-600">{cert.issuer}</p>
                        <p className="text-xs text-gray-500">{cert.date}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Key Achievements */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg text-white">
                  <ChartBarIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Key Achievements</h3>
              </motion.div>

              <div className="space-y-6">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white p-5 rounded-lg shadow-md border border-gray-100"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <TrophyIcon className="w-5 h-5 text-yellow-500" />
                      <span className="text-sm text-gray-500">{achievement.year}</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{achievement.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                    <div className="text-sm font-medium text-primary">{achievement.impact}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-xl"
            >
              <h4 className="font-semibold text-gray-900 mb-4 text-center">Impact Summary</h4>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">7+</div>
                  <div className="text-xs text-gray-600">Years Experience</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">3+</div>
                  <div className="text-xs text-gray-600">Years at Microsoft</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">100+</div>
                  <div className="text-xs text-gray-600">Students Mentored</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">Global</div>
                  <div className="text-xs text-gray-600">Azure Community</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6 text-gray-900 text-center">Skills & Expertise</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-primary/10 text-primary font-medium rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div> {/* <-- This is the end of your max-w-7xl container */}
    </section>
  );
}
