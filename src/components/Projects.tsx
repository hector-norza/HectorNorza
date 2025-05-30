import { motion } from 'framer-motion';

const projects = [
  {
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce platform with real-time inventory management, secure payments, and an intuitive admin dashboard.',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjZjNmNGY2Ii8+CiAgICA8dGV4dCB4PSI0MDAiIHk9IjMwMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjMyIiBmaWxsPSIjOWNhM2FmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSI+RS1jb21tZXJjZSBQbGF0Zm9ybTwvdGV4dD4KPC9zdmc+',
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop interface, and team collaboration features.',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjZjNmNGY2Ii8+CiAgICA8dGV4dCB4PSI0MDAiIHk9IjMwMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjMyIiBmaWxsPSIjOWNhM2FmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSI+VGFzayBNYW5hZ2VtZW50IEFwcDwvdGV4dD4KPC9zdmc+',
    tags: ['React', 'TypeScript', 'Socket.io', 'MongoDB'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'AI-Powered Analytics Dashboard',
    description: 'A data visualization dashboard with AI-powered insights, customizable charts, and automated reporting capabilities.',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjZjNmNGY2Ii8+CiAgICA8dGV4dCB4PSI0MDAiIHk9IjMwMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjMyIiBmaWxsPSIjOWNhM2FmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSI+QUkgQW5hbHl0aWNzIERhc2hib2FyZDwvdGV4dD4KPC9zdmc+',
    tags: ['Python', 'React', 'TensorFlow', 'AWS'],
    liveUrl: '#',
    githubUrl: '#',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative py-24">
      {/* Background decorations */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-gray-50 to-white -z-10"></div>
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-gray-50 to-white -z-10"></div>
      <div className="absolute left-0 w-1/3 h-full bg-primary/5 -z-10 skew-x-12 -translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary inline-block">
                Featured Projects
              </h2>
              <div className="w-20 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-6"></div>
              <p className="text-lg md:text-xl leading-8 text-gray-600 max-w-3xl mx-auto">
                Here are some of my recent projects that showcase my skills and experience.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-56"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors duration-300 text-sm font-medium"
                    >
                      Live Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:border-primary hover:text-primary transition-colors duration-300 text-sm font-medium"
                    >
                      View Code
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
