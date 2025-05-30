import { motion } from 'framer-motion';
import { 
  DocumentArrowDownIcon, 
  BriefcaseIcon, 
  AcademicCapIcon,
  TrophyIcon,
  ChartBarIcon,
  CalendarIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const experiences = [
  {
    title: "Senior Product Manager",
    company: "TechFlow Solutions",
    period: "2022 - Present",
    location: "Remote",
    description: [
      "Led product strategy for B2B SaaS platform serving 50K+ users, increasing user engagement by 45%",
      "Built and managed community of 10K+ power users, resulting in 30% increase in feature adoption",
      "Collaborated with engineering, design, and marketing teams to deliver 15+ major features on time",
      "Implemented data-driven decision making processes, reducing time-to-market by 25%"
    ],
    technologies: ["Product Analytics", "A/B Testing", "Roadmap Planning", "Community Management", "User Research"]
  },
  {
    title: "Product Manager",
    company: "Digital Innovations Inc",
    period: "2021 - 2022",
    location: "San Francisco, CA",
    description: [
      "Managed end-to-end product lifecycle for mobile app with 100K+ downloads",
      "Established user feedback loops and community forums, improving user satisfaction by 40%",
      "Worked closely with UX team to redesign onboarding flow, reducing churn by 35%",
      "Launched referral program that drove 25% of new user acquisitions"
    ],
    technologies: ["Mobile Analytics", "User Journey Mapping", "Community Building", "Growth Metrics"]
  },
  {
    title: "Associate Product Manager",
    company: "StartupHub",
    period: "2020 - 2021",
    location: "Austin, TX",
    description: [
      "Supported product initiatives for early-stage startup in the creator economy space",
      "Organized and managed creator community events, building network of 5K+ content creators",
      "Conducted user interviews and market research to inform product decisions",
      "Assisted in launching MVP that gained 10K users in first 3 months"
    ],
    technologies: ["Market Research", "User Interviews", "Event Management", "Creator Economy"]
  },
  {
    title: "Community Manager",
    company: "TechCommunity Platform",
    period: "2019 - 2020",
    location: "Austin, TX",
    description: [
      "Built and scaled online community from 0 to 15K members in 18 months",
      "Created content strategy and engagement programs that increased daily active users by 60%",
      "Managed community events, hackathons, and meetups with 500+ attendees",
      "Developed community guidelines and moderation processes"
    ],
    technologies: ["Community Platforms", "Content Strategy", "Event Planning", "Social Media"]
  }
];

const education = [
  {
    degree: "Master of Business Administration (MBA)",
    school: "University of Texas at Austin - McCombs School of Business",
    period: "2017 - 2019",
    gpa: "3.8/4.0",
    achievements: [
      "Product Management Specialization",
      "Technology Venture Capital Fellow",
      "Graduate Business Student Association President"
    ]
  },
  {
    degree: "Bachelor of Science in Computer Science",
    school: "University of Texas at Austin",
    period: "2013 - 2017",
    gpa: "3.7/4.0",
    achievements: [
      "Magna Cum Laude",
      "Entrepreneurship Minor",
      "Tech Student Organization Leader"
    ]
  }
];

const certifications = [
  {
    name: "Certified Product Manager (CPM)",
    issuer: "Product Management Institute",
    date: "2023",
    icon: "🎯"
  },
  {
    name: "Google Analytics Certified",
    issuer: "Google",
    date: "2023",
    icon: "📊"
  },
  {
    name: "Scrum Product Owner Certification",
    issuer: "Scrum Alliance",
    date: "2022",
    icon: "🏃‍♂️"
  },
  {
    name: "Community Management Professional",
    issuer: "Community Management Institute",
    date: "2021",
    icon: "👥"
  }
];

const achievements = [
  {
    name: "Product Launch Excellence Award",
    description: "Recognized for launching 3 successful products that exceeded KPI targets by 40%",
    year: "2023",
    impact: "Generated $2M in additional revenue"
  },
  {
    name: "Community Builder of the Year",
    description: "Built one of the fastest-growing tech communities in Austin",
    year: "2022",
    impact: "15K+ active community members"
  },
  {
    name: "Innovation Champion",
    description: "Led cross-functional team to develop breakthrough feature",
    year: "2021",
    impact: "45% increase in user engagement"
  }
];

const skills = [
  "Product Strategy",
  "Roadmap Planning",
  "User Research & Interviews",
  "A/B Testing & Experimentation",
  "Product Analytics",
  "Go-to-Market Strategy",
  "Agile & Scrum",
  "Cross-functional Leadership",
  "Community Building",
  "Stakeholder Management",
  "Feature Prioritization",
  "Customer Journey Mapping",
  "Market Research",
  "Growth Metrics",
  "Community Engagement",
  "MVP Launches",
  "User Feedback Loops",
  "Public Speaking & Workshops"
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
              My journey as a Product Manager passionate about building products that bring communities together.
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
                  <div className="text-2xl font-bold text-primary">5+</div>
                  <div className="text-xs text-gray-600">Years PM Experience</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">25+</div>
                  <div className="text-xs text-gray-600">Products Launched</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">50K+</div>
                  <div className="text-xs text-gray-600">Users Impacted</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">15K+</div>
                  <div className="text-xs text-gray-600">Community Members</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-10">
          <h3 className="text-xl font-bold mb-4 text-gray-900">Skills & Expertise</h3>
          <div className="flex flex-wrap gap-3">
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
      </div>
    </section>
  );
}
