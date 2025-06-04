import { motion } from 'framer-motion';
import {
  BriefcaseIcon,
  AcademicCapIcon,
  TrophyIcon,
  ChartBarIcon,
  CalendarIcon,
  // DocumentArrowDownIcon, // ← COMMENTED OUT - Not needed until resume download is ready
} from '@heroicons/react/24/outline';
import { useContrastColors } from '../hooks/useContrastColors';
import { trackResumeAction } from '../utils/analytics'; // ← ADD THIS LINE

// Professional Experience Data
const experiences = [
  {
    title: 'Product Manager II',
    company: 'Microsoft',
    period: '2023 - Present',
    location: 'Redmond, WA',
    description: [
      'Led the development and launch of the Azure AI Search SDK, aligning product strategy with customer needs and business objectives to drive adoption across key scenarios',
      'Drove cross-functional execution by partnering closely with engineering, design, and marketing teams to deliver a high-quality, developer-friendly SDK experience',
      'Prioritized features and roadmap decisions based on customer feedback, usage telemetry, and competitive insights—resulting in increased satisfaction and engagement',
      'Hosted the Azure Developer SDK Community Standup on YouTube and Twitch, increasing transparency and developer trust while boosting community engagement',
      "Championed key compliance initiatives—including accessibility, privacy, and security—across Azure Developer tools such as TypeSpec, Azure SDKs, and supporting engineering systems, ensuring alignment with Microsoft's trust and responsibility standards",
      "Advised Microsoft's Nonprofit division on AI usage policy, helping shape ethical and responsible AI practices tailored to mission-driven organizations.",
      'Participated in the NFL Cares and Microsoft LEAP program, focusing on community engagement and product management skills development',
    ],
    technologies: [
      'Azure SDK',
      'Developer Experience',
      'Community Management',
      'Product Strategy',
      'Responsible AI',
    ],
  },
  {
    title: 'Product Manager',
    company: 'Microsoft',
    period: '2021 - 2023',
    location: 'Redmond, WA',
    description: [
      'Led the development and launch of JavaScript and TypeScript Azure SDKs, enhancing developer experience and accelerating adoption of Azure AI Search across key customer segments',
      'Owned end-to-end product strategy for the Azure AI Search SDK, aligning roadmap priorities with customer needs, telemetry insights, and business goals',
      "Drove critical compliance initiatives—including accessibility, privacy, and security—across Azure Developer tools such as TypeSpec, SDKs, and engineering systems, ensuring adherence to Microsoft's Responsible AI principles",
      'Conducted in-depth market and user research to inform product direction and proactively identify emerging developer trends and pain points',
      'Collaborated cross-functionally with engineering, design, and marketing teams to deliver scalable, high-quality SDKs that met both technical and business requirements',
      'Hosted the Azure Developer SDK Community Standup on YouTube and Twitch, increasing transparency and strengthening engagement with the global developer community',
      'Delivered product updates and shared best practices, supporting developers worldwide with practical guidance and insights to build confidently on Azure—including authoring the official Azure SDK Monthly release blog',
    ],
    technologies: [
      'Azure Platform',
      'SDK Development',
      'Developer Advocacy',
      'Community Building',
      'Product Analytics',
    ],
  },
  {
    title: 'Technical Project Manager',
    company: 'Stova (formerly Eventcore)',
    period: '2020 - 2021',
    location: 'Seattle, WA',
    description: [
      'Delivered 4+ web applications for global events, managing agile workflows and aligning diverse stakeholder expectations, a key skill for community program management',
      'Launched a sales tool as both PM and UX/UI designer, improving sales efficiency and enhancing user satisfaction through a user-centric design approach.',
    ],
    technologies: [
      'React',
      'Node.js',
      'JavaScript',
      'Full-Stack Development',
      'Event Management Systems',
    ],
  },
  {
    title: 'Freelance Full-Stack Developer',
    company: 'Independent Contractor',
    period: '2018 - 2020',
    location: 'Seattle, WA',
    description: [
      'Led end-to-end development of a full-stack application (React, Node.js), demonstrating hands-on expertise in the developer lifecycle crucial for engaging technical communities.',
      'Conducted user research and implemented community feedback loops to drive product success and ensure developer needs were central to development.',
    ],
    technologies: [
      'React',
      'JavaScript',
      'Web Development',
      'Client Consulting',
      'Business Applications',
    ],
  },
  {
    title: 'Teaching Assistant & Instructor',
    company: 'Code Fellows',
    period: '2018 - 2019',
    location: 'Seattle, WA',
    description: [
      'Mentored students through intensive coding programs and career transitions',
      'Created engaging learning experiences that prepared students for software development careers',
      'Developed curriculum for modern web development technologies and best practices',
    ],
    technologies: [
      'JavaScript',
      'Teaching',
      'Curriculum Development',
      'Mentoring',
      'Full-Stack Development',
    ],
  },
];

const education = [
  {
    degree: 'Software Development Certificate',
    school: 'Code Fellows',
    period: '2017',
    gpa: 'Completed with Excellence',
    achievements: [
      'Full-Stack JavaScript Development',
      'Modern Web Development Best Practices',
      'Intensive 20-week Bootcamp Program',
    ],
  },
];

const certifications = [
  {
    name: 'Microsoft Nonprofit Advisor AI Usage Policy',
    issuer: 'Microsoft',
    date: '2024',
    icon: '☁️',
  },
  {
    name: 'Microsoft Azure Fundamentals',
    issuer: 'Microsoft',
    date: '2021',
    icon: '☁️',
  },
  {
    name: 'Product Management Certificate',
    issuer: 'Product School',
    date: '2021',
    icon: '🎯',
  },
  {
    name: 'Responsible AI Professional',
    issuer: 'Microsoft',
    date: '2023',
    icon: '🤖',
  },
  {
    name: 'Community Leadership Certification',
    issuer: 'Community Roundtable',
    date: '2022',
    icon: '👥',
  },
];

const achievements = [
  {
    name: 'Azure Developer SDK Standup Host',
    description:
      'Owned and scaled this weekly live show on YouTube and Twitch, building transparency, trust, and a direct feedback channel with global developer audiences. Innovated program segments to increase engagement and address community needs',
    year: '2022 - Current',
    impact: 'Monthly engagement with Azure developers',
  },
  {
    name: 'Azure SDK Monthly Release Blog Author',
    description:
      'Authored and published monthly technical blog posts detailing the latest Azure SDK releases, ensuring the developer community remained informed of new features, improvements, and best practices',
    year: '2022 - Current',
    impact: 'Weekly engagement with of Azure developer Community',
  },
  {
    name: 'NFL Cares and Microsoft LEAP Program',
    description:
      'Participated in the NFL Cares and Microsoft LEAP program, focusing on community engagement and product management skills development',
    year: '2023-2024',
    impact:
      'Mentored underrepresented communities in tech, enhancing product management skills and community engagement strategies',
  },
  {
    name: 'Aspire Leadership Council',
    description:
      'Mentored early-career professionals and led inclusion initiatives, fostering a supportive community within Microsoft',
    year: '2022-Current',
    impact:
      'Strengthened community ties and promoted diversity in tech leadership',
  },
  {
    name: 'Product Innovation Excellence',
    description:
      'Led community-focused product initiatives that improved Azure developer experience',
    year: '2022',
    impact: 'Enhanced SDK adoption and developer satisfaction',
  },
  {
    name: 'Technical Educator & Mentor',
    description:
      'Successfully transitioned from teaching at Code Fellows to Microsoft Product Management',
    year: '2021',
    impact: 'Mentored 100+ students in software development careers',
  },
];

const skills = [
  'Product Management',
  'Azure Platform & SDK',
  'Developer Experience',
  'Community Building',
  'Developer Advocacy',
  'Responsible AI',
  'Product Strategy',
  'Cross-functional Leadership',
  'Stakeholder Management',
  'JavaScript & React',
  'Full-Stack Development',
  'Technical Writing',
  'Public Speaking',
  'Mentoring & Teaching',
  'Go-to-Market Strategy',
  'User Research',
  'Agile Development',
  'Content Creation',
];

export default function Resume() {
  const colors = useContrastColors();

  // ← COMMENTED OUT - Track resume downloads (not needed until download is ready)
  // const handleResumeDownload = () => {
  //   // Track to GA ID: G-VPC78XB0H1
  //   trackResumeAction('download', 'pdf');
  // };

  // ← ADD THIS FUNCTION - Track section interactions
  const handleSectionView = (sectionName: string) => {
    // Track to GA ID: G-VPC78XB0H1
    trackResumeAction('view', sectionName);
  };

  return (
    <section
      id="resume"
      className={`relative py-24 scroll-mt-24 transition-colors duration-300 ${colors.background.primary}`}
    >
      {/* Background decorations */}
      <div className="absolute left-0 top-1/4 w-1/3 h-2/3 bg-gradient-to-r from-primary-500/5 to-transparent -z-10"></div>
      <div className="absolute right-0 bottom-0 w-64 h-64 bg-secondary-500/5 rounded-full -z-10 translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className={`text-3xl md:text-5xl font-bold mb-6 transition-colors duration-300 ${colors.heading}`}
          >
            Experience
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto mb-6"></div>
          <p
            className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed transition-colors duration-300 ${colors.body}`}
          >
            A journey through product management, community building, and
            responsible AI development.
          </p>
          
          {/* ← COMMENTED OUT - Download Resume Button (not ready for sharing yet) */}
          {/* <motion.a
            href="/resume.pdf" // Add your actual resume file
            download
            onClick={handleResumeDownload}
            className="btn-secondary inline-flex items-center mt-8"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <DocumentArrowDownIcon className="w-5 h-5 mr-2" />
            Download Resume
          </motion.a> */}
        </motion.div>

        <div className="space-y-16">
          {/* Professional Experience */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            onViewportEnter={() => handleSectionView('experience')} // ← ADD THIS - Tracks to G-VPC78XB0H1
          >
            <div className="flex items-center mb-8">
              <BriefcaseIcon className="w-8 h-8 text-primary-500 mr-4" />
              <h3
                className={`text-2xl font-bold transition-colors duration-300 ${colors.heading}`}
              >
                Professional Experience
              </h3>
            </div>

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`border-l-4 border-primary-500 pl-6 transition-colors duration-300 ${colors.background.card} ${colors.border} border rounded-r-lg p-6`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <h4
                      className={`text-xl font-semibold transition-colors duration-300 ${colors.heading}`}
                    >
                      {exp.title}
                    </h4>
                    <span
                      className={`text-sm font-medium transition-colors duration-300 ${colors.secondary} flex items-center`}
                    >
                      <CalendarIcon className="w-4 h-4 mr-1" />
                      {exp.period}
                    </span>
                  </div>
                  <p
                    className={`font-medium mb-2 transition-colors duration-300 ${colors.secondary}`}
                  >
                    {exp.company} • {exp.location}
                  </p>
                  <ul
                    className={`space-y-2 mb-4 transition-colors duration-300 ${colors.body}`}
                  >
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="leading-relaxed">
                        • {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
            onViewportEnter={() => handleSectionView('education')} // ← ADD THIS - Tracks to G-VPC78XB0H1
          >
            <div className="flex items-center mb-8">
              <AcademicCapIcon className="w-8 h-8 text-primary-500 mr-4" />
              <h3
                className={`text-2xl font-bold transition-colors duration-300 ${colors.heading}`}
              >
                Education
              </h3>
            </div>

            <div className="space-y-6">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className={`border-l-4 border-secondary-500 pl-6 transition-colors duration-300 ${colors.background.card} ${colors.border} border rounded-r-lg p-6`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <h4
                      className={`text-xl font-semibold transition-colors duration-300 ${colors.heading}`}
                    >
                      {edu.degree}
                    </h4>
                    <span
                      className={`text-sm font-medium transition-colors duration-300 ${colors.secondary}`}
                    >
                      {edu.period}
                    </span>
                  </div>
                  <p
                    className={`font-medium mb-3 transition-colors duration-300 ${colors.secondary}`}
                  >
                    {edu.school} • {edu.gpa}
                  </p>
                  <ul
                    className={`space-y-1 transition-colors duration-300 ${colors.body}`}
                  >
                    {edu.achievements.map((achievement, idx) => (
                      <li key={idx}>• {achievement}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            viewport={{ once: true }}
            onViewportEnter={() => handleSectionView('certifications')} // ← ADD THIS - Tracks to G-VPC78XB0H1
          >
            <div className="flex items-center mb-8">
              <ChartBarIcon className="w-8 h-8 text-primary-500 mr-4" />
              <h3
                className={`text-2xl font-bold transition-colors duration-300 ${colors.heading}`}
              >
                Certifications
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`p-6 rounded-lg transition-colors duration-300 ${colors.background.card} ${colors.border} border`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl">{cert.icon}</span>
                    <span
                      className={`text-sm transition-colors duration-300 ${colors.secondary}`}
                    >
                      {cert.date}
                    </span>
                  </div>
                  <h4
                    className={`font-semibold mb-2 transition-colors duration-300 ${colors.heading}`}
                  >
                    {cert.name}
                  </h4>
                  <p
                    className={`text-sm transition-colors duration-300 ${colors.body}`}
                  >
                    {cert.issuer}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            viewport={{ once: true }}
            onViewportEnter={() => handleSectionView('achievements')} // ← ADD THIS - Tracks to G-VPC78XB0H1
          >
            <div className="flex items-center mb-8">
              <TrophyIcon className="w-8 h-8 text-primary-500 mr-4" />
              <h3
                className={`text-2xl font-bold transition-colors duration-300 ${colors.heading}`}
              >
                Key Achievements
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`p-6 rounded-lg transition-colors duration-300 ${colors.background.card} ${colors.border} border`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4
                      className={`font-semibold transition-colors duration-300 ${colors.heading}`}
                    >
                      {achievement.name}
                    </h4>
                    <span
                      className={`text-sm transition-colors duration-300 ${colors.secondary}`}
                    >
                      {achievement.year}
                    </span>
                  </div>
                  <p
                    className={`text-sm mb-3 leading-relaxed transition-colors duration-300 ${colors.body}`}
                  >
                    {achievement.description}
                  </p>
                  <p
                    className={`text-xs font-medium transition-colors duration-300 ${colors.secondary}`}
                  >
                    Impact: {achievement.impact}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0 }}
            viewport={{ once: true }}
            onViewportEnter={() => handleSectionView('skills')} // ← ADD THIS - Tracks to G-VPC78XB0H1
          >
            <h3
              className={`text-2xl font-bold mb-8 transition-colors duration-300 ${colors.heading}`}
            >
              Core Skills
            </h3>

            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="px-4 py-2 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20 rounded-full text-sm font-medium hover:from-primary-500/20 hover:to-secondary-500/20 transition-all duration-300"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
