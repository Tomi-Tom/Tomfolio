import { ReactElement } from 'react'
import { motion } from 'framer-motion'
import { PageLayout } from '../layouts/PageLayout'
import CV_file from '../assets/CV_TOM BARITEAU-PETER_EN.pdf'
import SceneResume from '../components/Three/SceneResume'

export default function Resume(): ReactElement {
  const skills = [
    {
      category: 'Frontend',
      items: [
        'React',
        'TypeScript',
        'JavaScript',
        'HTML/CSS',
        'Tailwind CSS',
        'Framer Motion',
      ],
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Express', 'MongoDB', 'REST APIs'],
    },
    {
      category: 'Design',
      items: ['Figma', 'Adobe XD', 'Photoshop', 'UI/UX', 'Responsive Design'],
    },
    {
      category: 'Tools',
      items: ['Git', 'GitHub', 'CI/CD', 'Vercel', 'VS Code'],
    },
  ]

  const experiences = [
    {
      role: 'Freelance Frontend Developer & Designer',
      company: 'LibertAI',
      period: '2024',
      type: 'Freelance',
      description:
        "Participated in the redesign of the company's website with focus on frontend development and UI/UX design.",
      achievements: [
        'Landing page redesign',
        'UI/UX design system implementation',
        'Frontend development with modern frameworks',
      ],
    },
    {
      role: 'Freelance Fullstack Developer',
      company: 'SUNVER',
      period: '2024',
      type: 'Freelance',
      description:
        'Developed core features of the SUNVER application and represented the product at Food Hotel Tech 2024.',
      achievements: [
        'Core application development',
        'Product representation at industry events',
        'Cross-functional collaboration',
      ],
    },
    {
      role: 'AER – Mentor and Evaluator',
      company: 'Ionis STM (ASTEK)',
      period: '2023 - 2024',
      type: 'Part-time',
      description:
        'Mentored and evaluated 1st and 2nd year students, providing guidance on software engineering projects.',
      achievements: [
        'Student mentoring and guidance',
        'Project evaluation and feedback',
        'Technical skill development',
      ],
    },
    {
      role: 'Fullstack Developer',
      company: 'Diabolocom',
      period: '2022',
      type: 'Internship',
      description:
        'Worked on development and improvement of internal tools using React JS/TS, built custom Webcallback plugin.',
      achievements: [
        'React JS/TS development',
        'Custom plugin creation',
        'Cross-team collaboration',
      ],
    },
    {
      role: 'Fundraising Recruiter',
      company: 'Trico',
      period: '2018 - 2019',
      type: 'Part-time',
      description:
        'Recruited donors for various NGOs including Amnesty International and Croix-Rouge.',
      achievements: [
        'Donor recruitment campaigns',
        'NGO representation',
        'Public engagement',
      ],
    },
  ]

  const education = [
    {
      degree: "Master's in Software Engineering",
      institution: 'Epitech Paris',
      year: '2021 - 2026',
      status: 'In Progress',
      description:
        'Advanced software engineering program with project-based learning approach.',
    },
    {
      degree: 'Peer-to-peer Programming',
      institution: '42 Paris',
      year: '2019 - 2021',
      status: 'Completed',
      description:
        'Self-directed learning with focus on software development and peer collaboration.',
    },
    {
      degree: 'Preparatory Year in Sciences',
      institution: 'Université Pierre et Marie Curie',
      year: '2017 - 2018',
      status: 'Completed',
      description:
        'Foundation in physics, chemistry, and engineering sciences.',
    },
    {
      degree: 'Science Baccalauréat (ISN)',
      institution: 'Lycée Eugène Ionesco',
      year: '2014 - 2017',
      status: 'Completed',
      description:
        'French High School Diploma with computer science specialization.',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 20,
      },
    },
  }

  const handleDownloadCV = () => {
    const link = document.createElement('a')
    link.href = CV_file
    link.download = 'Tom_Bariteau_Peter_CV.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <PageLayout>
      {/* ── Three.js Hero ── */}
      <section
        className="relative flex h-[55vh] min-h-[400px] items-center justify-center overflow-hidden"
        style={{ background: 'var(--color-void)' }}
      >
        <SceneResume />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 20%, rgba(0,0,0,0.75) 100%)',
            zIndex: 1,
          }}
        />
        <div
          className="pointer-events-none absolute right-0 bottom-0 left-0 h-32"
          style={{
            background:
              'linear-gradient(to bottom, transparent, var(--color-void))',
            zIndex: 2,
          }}
        />
        <motion.div
          className="relative z-10 px-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 80,
            damping: 16,
            delay: 0.2,
          }}
        >
          <div className="section-label mb-3">Career Timeline</div>
          <h1
            className="display-text mb-4 font-bold"
            style={{ fontSize: 'clamp(2.8rem, 8vw, 6rem)' }}
          >
            Professional <span className="text-gold">Profile</span>
          </h1>
          <p className="text-secondary mx-auto mb-8 max-w-2xl text-lg leading-relaxed">
            UX/UI Designer &amp; Frontend Developer — design thinking meets
            technical craft.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button onClick={handleDownloadCV} className="btn-gold">
              Download Full CV
            </button>
          </motion.div>
        </motion.div>
      </section>

      <div style={{ background: 'var(--color-void)' }}>
        <motion.div
          className="container mx-auto max-w-5xl px-6 py-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Skills Overview */}
          <motion.section className="mb-20" variants={itemVariants}>
            <h2 className="mb-8 flex items-center gap-3 text-2xl font-bold text-white">
              <div
                className="h-6 w-1 rounded-full"
                style={{ background: 'var(--color-gold)' }}
              />
              Skills & Technologies
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {skills.map((skillGroup, index) => (
                <motion.div
                  key={index}
                  className="void-panel rounded-xl p-5"
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <h3 className="text-gold mb-3 text-sm font-bold tracking-wider uppercase">
                    {skillGroup.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, i) => (
                      <span
                        key={i}
                        className="rounded px-2 py-1 text-sm"
                        style={{
                          color: 'var(--color-text-secondary)',
                          background: 'var(--color-gold-ghost)',
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Experience */}
          <motion.section className="mb-20" variants={itemVariants}>
            <h2 className="mb-8 flex items-center gap-3 text-2xl font-bold text-white">
              <div
                className="h-6 w-1 rounded-full"
                style={{ background: 'var(--color-gold)' }}
              />
              Professional Experience
            </h2>
            <div className="relative space-y-8">
              {/* Timeline line */}
              <div
                className="absolute top-0 bottom-0 left-0 hidden w-px md:block"
                style={{ background: 'var(--color-gold-dim)' }}
              />

              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  className="relative pl-0 md:pl-8"
                  variants={itemVariants}
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute top-6 left-[-4px] hidden h-2 w-2 rounded-full md:block"
                    style={{ background: 'var(--color-gold)' }}
                  />

                  <div className="void-panel rounded-xl p-6">
                    {/* Header row */}
                    <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="mb-1 text-xl font-bold text-white">
                          {exp.role}
                        </h3>
                        <div className="text-gold flex items-center gap-2 font-semibold">
                          <span>{exp.company}</span>
                          <span className="text-dim">·</span>
                          <span className="text-secondary text-sm">
                            {exp.type}
                          </span>
                        </div>
                      </div>
                      <span
                        className="rounded-full px-3 py-1 text-sm font-medium whitespace-nowrap"
                        style={{
                          color: 'var(--color-text-secondary)',
                          background: 'var(--color-void-surface)',
                        }}
                      >
                        {exp.period}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-secondary mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <div className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <div
                          key={i}
                          className="text-secondary flex items-start gap-2 text-sm"
                        >
                          <svg
                            className="text-gold mt-0.5 h-4 w-4 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Education */}
          <motion.section className="mb-20" variants={itemVariants}>
            <h2 className="mb-8 flex items-center gap-3 text-2xl font-bold text-white">
              <div
                className="h-6 w-1 rounded-full"
                style={{ background: 'var(--color-gold)' }}
              />
              Education
            </h2>
            <div className="relative space-y-6">
              {/* Timeline line */}
              <div
                className="absolute top-0 bottom-0 left-0 hidden w-px md:block"
                style={{ background: 'var(--color-gold-dim)' }}
              />

              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  className="relative pl-0 md:pl-8"
                  variants={itemVariants}
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute top-6 left-[-4px] hidden h-2 w-2 rounded-full md:block"
                    style={{ background: 'var(--color-gold)' }}
                  />

                  <div className="void-panel rounded-xl p-6">
                    <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="mb-1 text-lg font-bold text-white">
                          {edu.degree}
                        </h3>
                        <p className="text-gold font-semibold">
                          {edu.institution}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className="rounded-full px-2 py-1 text-xs font-medium"
                          style={
                            edu.status === 'In Progress'
                              ? {
                                  background: 'var(--color-gold-ghost)',
                                  color: 'var(--color-gold)',
                                }
                              : {
                                  background: 'var(--color-void-surface)',
                                  color: 'var(--color-text-secondary)',
                                }
                          }
                        >
                          {edu.status}
                        </span>
                        <span className="text-secondary text-sm font-medium">
                          {edu.year}
                        </span>
                      </div>
                    </div>
                    <p className="text-secondary text-sm leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Contact CTA */}
          <motion.section variants={itemVariants}>
            <div
              className="void-panel rounded-2xl p-8 text-center"
              style={{ borderColor: 'var(--color-border-active)' }}
            >
              <h3 className="mb-3 text-2xl font-bold text-white">
                Let's Work Together
              </h3>
              <p className="text-secondary mx-auto mb-6 max-w-xl">
                Interested in collaborating? I'm available for freelance
                projects and full-time opportunities.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button className="btn-gold">Get in Touch</button>
                </motion.a>
                <motion.a
                  href="mailto:bariteaupeter.tom@gmail.com"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button className="btn-ghost-gold">Email Me</button>
                </motion.a>
              </div>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </PageLayout>
  )
}
