import { motion } from 'framer-motion';
import { 
  BriefcaseIcon, 
  AcademicCapIcon,
  TrophyIcon,
  ChartBarIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

const experiences = [
  {
    title: "Product Manager II",
    company: "Microsoft",
    period: "2023 - Present",
    location: "Redmond, WA",
    description: [
      "Led the development and launch of the Azure AI Search SDK, aligning product strategy with customer needs and business objectives to drive adoption across key scenarios",
      "Drove cross-functional execution by partnering closely with engineering, design, and marketing teams to deliver a high-quality, developer-friendly SDK experience",
      "Prioritized features and roadmap decisions based on customer feedback, usage telemetry, and competitive insights—resulting in increased satisfaction and engagement",
      "Hosted the Azure Developer SDK Community Standup on YouTube and Twitch, increasing transparency and developer trust while boosting community engagement",
      "Championed key compliance initiatives—including accessibility, privacy, and security—across Azure Developer tools such as TypeSpec, Azure SDKs, and supporting engineering systems, ensuring alignment with Microsoft’s trust and responsibility standards",
      "Advised Microsoft’s Nonprofit division on AI usage policy, helping shape ethical and responsible AI practices tailored to mission-driven organizations.",
      "Participated in the NFL Cares and Microsoft LEAP program, focusing on community engagement and product management skills development"
    ],
    technologies: ["Azure SDK", "Developer Experience", "Community Management", "Product Strategy", "Responsible AI"]
  },
  {
    title: "Product Manager",
    company: "Microsoft",
    period: "2021 - 2023",
    location: "Redmond, WA",
    description: [
      "Led the development and launch of JavaScript and TypeScript Azure SDKs, enhancing developer experience and accelerating adoption of Azure AI Search across key customer segments",
      "Owned end-to-end product strategy for the Azure AI Search SDK, aligning roadmap priorities with customer needs, telemetry insights, and business goals",
      "Drove critical compliance initiatives—including accessibility, privacy, and security—across Azure Developer tools such as TypeSpec, SDKs, and engineering systems, ensuring adherence to Microsoft’s Responsible AI principles",
      "Conducted in-depth market and user research to inform product direction and proactively identify emerging developer trends and pain points",
      "Collaborated cross-functionally with engineering, design, and marketing teams to deliver scalable, high-quality SDKs that met both technical and business requirements",
      "Hosted the Azure Developer SDK Community Standup on YouTube and Twitch, increasing transparency and strengthening engagement with the global developer community",
      "Delivered product updates and shared best practices, supporting developers worldwide with practical guidance and insights to build confidently on Azure—including authoring the official Azure SDK Monthly release blog",
    ],
    technologies: ["Azure Platform", "SDK Development", "Developer Advocacy", "Community Building", "Product Analytics"]
  },
  {
    title: "Technical Project Manager",
    company: "Stova (formerly Eventcore)",
    period: "2020 - 2021",
    location: "Seattle, WA",
    description: [
      " Delivered 4+ web applications for global events, managing agile workflows and aligning diverse stakeholder expectations, a key skill for community program management",
      " Launched a sales tool as both PM and UX/UI designer, improving sales efficiency and enhancing user satisfaction through a user-centric design approach.",
    ],
    technologies: ["React", "Node.js", "JavaScript", "Full-Stack Development", "Event Management Systems"]
  },
  {
    title: "Freelance Full-Stack Developer",
    company: "Independent Contractor",
    period: "2018 - 2020",
    location: "Seattle, WAÍ",
    description: [
      "Led end-to-end development of a full-stack application (React, Node.js), demonstrating hands-on expertise in the developer lifecycle crucial for engaging technical communities.",
      "Conducted user research and implemented community feedback loops to drive product success and ensure developer needs were central to development."
    ],
    technologies: ["React", "JavaScript", "Web Development", "Client Consulting", "Business Applications"]
  },
  {
    title: "Teaching Assistant & Instructor",
    company: "Code Fellows",
    period: "2018 - 2019",
    location: "Seattle, WA",
    description: [
      "Mentored students through intensive coding programs and career transitions",
      "Created engaging learning experiences that prepared students for software development careers",
      "Developed curriculum for modern web development technologies and best practices",
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
  },
  
];

const certifications = [
   {
    name: "Microsoft Nonprofit Advisor AI Usage Policy",
    issuer: "Microsoft",
    date: "2024",
    icon: "☁️"
  },
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
    name: "Azure Developer SDK Standup Host",
    description: "Owned and scaled this weekly live show on YouTube and Twitch, building transparency, trust, and a direct feedback channel with global developer audiences. Innovated program segments to increase engagement and address community needs",
    year: "2022 - Current",
    impact: "Monthly engagement with Azure developers"
  },
  {
    name: "Azure SDK Monthly Release Blog Author",
    description: " Authored and published monthly technical blog posts detailing the latest Azure SDK releases, ensuring the developer community remained informed of new features, improvements, and best practices",
    year: "2022 - Current",
    impact: "Weekly engagement with of Azure developer Community"
  },
  {
    name: "NFL Cares and Microsoft LEAP Program",
    description: "Participated in the NFL Cares and Microsoft LEAP program, focusing on community engagement and product management skills development",
    year: "2023-2024",
    impact: "Mentored underrepresented communities in tech, enhancing product management skills and community engagement strategies"
  },
  {
    name: "Aspire Leadership Council",
    description: "Mentored early-career professionals and led inclusion initiatives, fostering a supportive community within Microsoft",
    year: "2022-Current",
    impact: "Strengthened community ties and promoted diversity in tech leadership"
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
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Driven by a passion for community building, I transitioned into product management, a role that now provides strategic tools to cultivate and scale even more vibrant and robust communities.
            </p>
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
