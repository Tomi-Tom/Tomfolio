import { ReactElement, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Layout from '../components/Layout'
import SceneProjectsHero from '../components/Three/SceneProjectsHero'

const projects = [
  {
    title: 'Personal Portfolio — tombp.fr',
    description: 'Modern portfolio website showcasing design and development work. Built with React and Framer Motion, featuring smooth animations, interactive elements, and a clean, minimalist aesthetic. Emphasizes user experience with intuitive navigation and responsive design across all devices.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    role: 'Full-Stack Developer & Designer',
    competencies: ['UI/UX Design', 'React Development', 'Animation', 'Responsive Design', 'Branding'],
    tags: ['React', 'TypeScript', 'Framer Motion', 'Tailwind CSS', 'Vite'],
    status: 'Live',
    type: 'Personal',
    link: 'https://www.tombp.fr/',
    linkText: 'Visit Website',
    year: '2024',
  },
  {
    title: 'IsoMaker — 3D Pixel Art Creator',
    description: 'Interactive web application for creating isometric pixel art. Features intuitive controls, real-time preview, color picker, and export functionality. Designed to make 3D pixel art creation accessible and enjoyable for both beginners and experienced artists.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
    role: 'Lead Developer & UX Designer',
    competencies: ['Canvas API', 'Interactive Design', 'Algorithm Development', 'User Testing', 'Performance Optimization'],
    tags: ['JavaScript', 'Canvas', 'Pixel Art', 'Web Graphics', 'Interactive'],
    status: 'Live',
    type: 'Tool',
    link: 'https://www.isomaker.fr/',
    linkText: 'Try IsoMaker',
    year: '2024',
  },
  {
    title: 'LibertAI — AI Platform',
    description: 'Corporate website redesign for an AI technology company. Focused on creating a modern, trustworthy brand presence with clear communication of complex AI concepts. Implemented responsive design patterns and accessibility standards to ensure broad reach and usability.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    role: 'Freelance Frontend Developer & Designer',
    competencies: ['Corporate Branding', 'Frontend Development', 'Accessibility', 'SEO Optimization', 'Stakeholder Communication'],
    tags: ['React', 'UI/UX', 'Branding', 'Accessibility', 'B2B'],
    status: 'Live',
    type: 'Client Work',
    link: 'https://libertai.io/',
    linkText: 'View Project',
    year: '2023',
  },
]

export default function Projects(): ReactElement {
  return (
    <Layout>
      {/* ── Three.js Hero Header ── */}
      <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden"
        style={{ background: '#07070F' }}>
        <SceneProjectsHero />

        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(7,7,15,0.9) 100%)', zIndex: 1 }} />

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #0B0B12)', zIndex: 2 }} />

        <motion.div
          className="relative text-center px-6 max-w-4xl mx-auto"
          style={{ zIndex: 3 }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/25 mb-8"
            style={{ background: 'rgba(255,107,53,0.07)' }}
            animate={{ borderColor: ['rgba(255,107,53,0.25)', 'rgba(255,107,53,0.55)', 'rgba(255,107,53,0.25)'] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-accent"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            <span className="text-sm font-semibold text-accent">{projects.length} Featured Projects</span>
          </motion.div>

          <h1 className="font-bold leading-tight mb-6"
            style={{ fontSize: 'clamp(2.8rem, 8vw, 6rem)', color: '#EAE6FF', letterSpacing: '-0.03em' }}>
            Selected
            {' '}<span className="brand-tt">Work</span>
          </h1>

          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: '#8A85AA' }}>
            A selection of client work, personal projects, and creative experiments showcasing my approach to design and development.
          </p>
        </motion.div>
      </section>

      {/* ── Project list ── */}
      <div className="bg-canvas py-24">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="space-y-40">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                index={index}
                isReversed={index % 2 !== 0}
              />
            ))}
          </div>

          {/* ── Footer CTA ── */}
          <motion.div
            className="mt-40 relative rounded-3xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="surface-elevated border border-accent/15 rounded-3xl p-14 text-center relative overflow-hidden">
              {/* Ambient glow */}
              <motion.div
                className="absolute inset-0 gradient-primary opacity-5 pointer-events-none"
                animate={{ opacity: [0.04, 0.09, 0.04] }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary mb-6 relative z-10"
                animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.04, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <span className="text-2xl font-bold text-white">TT</span>
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4 relative z-10" style={{ letterSpacing: '-0.02em' }}>
                Have a project<br />in mind?
              </h2>
              <p className="text-text-secondary mb-10 max-w-xl mx-auto text-lg leading-relaxed relative z-10">
                I'm available for freelance work and collaborations. Let's create something remarkable together.
              </p>
              <motion.a
                href="/contact"
                className="relative inline-block z-10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 gradient-primary blur-xl opacity-60 rounded-xl"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.85, 0.6] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
                <span className="relative px-10 py-4 rounded-xl gradient-primary text-white font-bold text-base shadow-accent-strong inline-flex items-center gap-3">
                  Get in Touch
                  <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
                </span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}

// ── Project card component ──
interface ProjectCardProps {
  project: typeof projects[0]
  index: number
  isReversed: boolean
}

function ProjectCard({ project, index, isReversed }: ProjectCardProps): ReactElement {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })

  return (
    <motion.section
      ref={ref}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-14 items-center ${isReversed ? 'lg:grid-flow-dense' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {/* Image */}
      <div className={`relative group ${isReversed ? 'lg:col-start-2' : ''}`}>
        <motion.div
          className="relative aspect-video rounded-2xl overflow-hidden border border-text-tertiary/10"
          whileHover={{ scale: 1.025 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-canvas/50 to-transparent" />
          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 gradient-primary opacity-0 group-hover:opacity-8 transition-opacity duration-500"
          />
        </motion.div>

        {/* Number badge */}
        <motion.div
          className="absolute -top-5 -right-5 w-12 h-12 gradient-primary rounded-xl flex items-center justify-center text-white font-bold shadow-accent-strong"
          initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
          animate={inView ? { opacity: 1, scale: 1, rotate: 6 } : {}}
          transition={{ delay: 0.4, type: 'spring', stiffness: 280 }}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.div>

        {/* Year tag */}
        <div className="absolute -bottom-4 left-6 bg-surface-elevated border border-text-tertiary/10 rounded-lg px-3 py-1.5">
          <span className="text-xs font-semibold text-text-secondary">{project.year}</span>
        </div>
      </div>

      {/* Content */}
      <div className={isReversed ? 'lg:col-start-1 lg:row-start-1' : ''}>
        <div className="flex items-center gap-2 mb-5">
          <span className="text-xs font-bold text-accent bg-accent/10 px-3 py-1.5 rounded-full uppercase tracking-wider">
            {project.status}
          </span>
          <span className="text-xs font-medium text-text-secondary surface-elevated px-3 py-1.5 rounded-full">
            {project.type}
          </span>
        </div>

        <h2 className="font-bold text-text-primary mb-3 leading-tight"
          style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.8rem)', letterSpacing: '-0.02em' }}>
          {project.title}
        </h2>

        <p className="text-accent font-semibold mb-5 text-sm uppercase tracking-wider">{project.role}</p>

        <p className="text-text-secondary leading-relaxed mb-7 text-base">
          {project.description}
        </p>

        {/* Competencies */}
        <div className="mb-7">
          <p className="text-xs font-bold text-text-primary mb-3 uppercase tracking-widest">Key Competencies</p>
          <div className="flex flex-wrap gap-2">
            {project.competencies.map((c, i) => (
              <span key={i} className="text-sm text-text-secondary surface-elevated px-3 py-1.5 rounded-lg border border-text-tertiary/10">
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="mb-9">
          <p className="text-xs font-bold text-text-primary mb-3 uppercase tracking-widest">Stack</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <motion.span
                key={i}
                className="text-sm text-accent bg-accent/8 border border-accent/20 px-3 py-1.5 rounded-lg font-medium"
                whileHover={{ scale: 1.05, borderColor: 'rgba(255,107,53,0.5)' }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>

        <motion.a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-flex items-center gap-3"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <motion.div className="absolute inset-0 gradient-primary blur-lg opacity-50 rounded-xl"
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="relative px-8 py-3.5 rounded-xl gradient-primary text-white font-bold text-sm shadow-accent inline-flex items-center gap-2">
            {project.linkText}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </span>
        </motion.a>
      </div>
    </motion.section>
  )
}
