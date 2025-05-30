import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="relative bg-white">
      <div className="section-container">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-secondary mb-8">About Me</h2>
            <p className="text-lg leading-8 text-gray-600 mb-8">
              I'm a Full Stack Developer with a passion for creating elegant solutions to complex problems.
              With expertise in modern web technologies and a keen eye for design, I build applications
              that are not just functional but also provide an exceptional user experience.
            </p>
            <p className="text-lg leading-8 text-gray-600 mb-8">
              My journey in software development began with a curiosity about how things work,
              which evolved into a career building robust and scalable applications.
              I'm constantly learning and exploring new technologies to stay at the forefront
              of web development.
            </p>
            <div className="flex justify-center gap-8 text-center">
              <div>
                <h3 className="text-xl font-semibold text-primary">Frontend</h3>
                <p className="mt-2 text-gray-600">
                  React, TypeScript, Tailwind CSS
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary">Backend</h3>
                <p className="mt-2 text-gray-600">
                  Node.js, Python, PostgreSQL
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary">Tools</h3>
                <p className="mt-2 text-gray-600">
                  Git, Docker, AWS
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
