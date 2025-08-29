import { ReactElement } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'
import CV from '../assets/CV.png'
import CV_file from '../assets/CV.pdf'



export default function Resume(): ReactElement {
  const skills = [
    {
      name: 'Frontend Development',
      technologies: ['React', 'TypeScript', 'JavaScript', 'HTML/CSS'],
      description: 'Building responsive web interfaces with modern frameworks and best practices'
    },
    {
      name: 'UI/UX Design',
      technologies: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator'],
      description: 'Creating user-centered designs focused on accessibility and intuitive interactions'
    },
    {
      name: 'Backend Development',
      technologies: ['Node.js', 'Express', 'MongoDB', 'REST APIs'],
      description: 'Developing scalable server-side applications and APIs'
    },
    {
      name: 'CSS Frameworks',
      technologies: ['Tailwind CSS', 'Bootstrap', 'SCSS', 'Styled Components'],
      description: 'Implementing responsive designs with modern CSS frameworks'
    },
    {
      name: 'Animation & Interaction',
      technologies: ['Framer Motion', 'GSAP', 'CSS Animations'],
      description: 'Creating engaging motion design and interactive elements'
    },
    {
      name: 'Version Control & Deployment',
      technologies: ['Git', 'GitHub', 'CI/CD', 'Vercel'],
      description: 'Managing code and deploying applications using modern workflows'
    }
  ]

  const experiences = [
    {
      role: 'Freelance Frontend Developer & Designer',
      company: 'LibertAI',
      period: '2024',
      description: 'participate in the redesign of the company\'s wesbsite. Responsible for frontend development and UI/UX design.',
      highlights: ['Landing page redesign', 'UI/UX design', 'Frontend development']
    },
    {
      role: 'Freelance Fullstack Developer',
      company: 'SUNVER',
      period: '2024',
      description: 'Developed core features of the SUNVER application. Represented the product at the Food Hotel Tech 2024',
      highlights: ['Core application development', 'Product representation at industry trade shows']
    },

    {
      role: 'AER – Mentor and Evaluator',
      company: 'Ionis STM (ASTEK)',
      period: '2023 - 2024',
      description: 'Mentored and evaluated 1st and 2nd year students at Ionis STM. Provided guidance on software engineering projects and coursework.',
      highlights: ['Student mentoring', 'Project evaluation', 'Technical guidance']
    },
    {
      role: 'Fullstack Developer',
      company: 'Diabolocom',
      period: '2022',
      description: 'Worked on the development and improvement of internal tools using React JS/TS. Built a custom plugin (Webcallback) and collaborated across multiple teams.',
      highlights: ['React JS/TS development', 'Custom plugin creation', 'Cross-team collaboration']
    },
    {
      role: 'Fundraising Recruiter',
      company: 'Trico',
      period: '2018 - 2019',
      description: 'Recruited donors for various NGOs (e.g. Amnesty International, Croix-Rouge).',
      highlights: ['Donor recruitment', 'NGO representation', 'Public engagement']
    }
  ]

  const education = [
    {
      degree: 'Master\'s-level program in Software Engineering',
      institution: 'Epitech Paris',
      year: '2021 - 2026',
      description: 'Advanced software engineering program with project-based learning approach.'
    },
    {
      degree: 'Peer-to-peer programming school',
      institution: '42 Paris',
      year: '2019 - 2021',
      description: 'Self-directed learning with a focus on software development and peer collaboration.'
    },
    {
      degree: 'Preparatory year in Physics, Chemistry, and Engineering Sciences',
      institution: 'Université Pierre et Marie Curie (Jussieu)',
      year: '2017 - 2018',
      description: 'Foundation studies in physical sciences and engineering principles.'
    },
    {
      degree: 'Science Baccalauréat with specialization in Computer Science (ISN)',
      institution: 'Lycée Eugène Ionesco',
      year: '2014 - 2017',
      description: 'French High School Diploma with focus on computer science and programming.'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20
      }
    }
  }

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = CV_file;
    link.download = 'Tom_Bariteau_Peter_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout>
      <div className="min-h-screen py-24">
        <motion.div
          className="container mx-auto px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="mb-16 text-center"
            variants={itemVariants}
          >
            <h1 className="mb-4 text-4xl font-bold text-orange-800">My Resume</h1>
            <p className="mx-auto max-w-2xl text-lg">
              A summary of my professional experience, skills, and education.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <motion.div variants={itemVariants}>
              <div className="mb-12">
                <h2 className="mb-6 border-b border-neutral-grey_1 pb-2 text-2xl font-bold text-orange-800">
                  Professional Experience
                </h2>
                <div className="space-y-8">
                  {experiences.map((exp, index) => (
                    <motion.div
                      key={index}
                      className="rounded-lg bg-background-secondary p-6 shadow-lg transition-all duration-300 hover:shadow-orange-800/20"
                      variants={itemVariants}
                      whileHover={{ y: -5 }}
                    >
                      <h3 className="text-xl font-bold">{exp.role}</h3>
                      <div className="mb-2 flex justify-between">
                        <span className="text-orange-500">{exp.company}</span>
                        <span className="text-neutral-grey_1">{exp.period}</span>
                      </div>
                      <p className="mb-3">{exp.description}</p>
                      {exp.highlights && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {exp.highlights.map((highlight, i) => (
                            <motion.span
                              key={i}
                              className="rounded-full bg-background-primary px-3 py-1 text-sm text-neutral-grey_1"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                type: "spring",
                                stiffness: 300
                              }}
                              whileHover={{
                                scale: 1.1,
                                backgroundColor: '#FF8F00',
                                color: 'white'
                              }}
                            >
                              {highlight}
                            </motion.span>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="mb-6 border-b border-neutral-grey_1 pb-2 text-2xl font-bold text-orange-800">
                  Education
                </h2>
                <div className="space-y-8">
                  {education.map((edu, index) => (
                    <motion.div
                      key={index}
                      className="rounded-lg bg-background-secondary p-6 shadow-lg transition-all duration-300 hover:shadow-orange-800/20"
                      variants={itemVariants}
                      whileHover={{ y: -5 }}
                    >
                      <h3 className="text-xl font-bold">{edu.degree}</h3>
                      <div className="mb-2 flex justify-between">
                        <span className="text-orange-500">{edu.institution}</span>
                        <span className="text-neutral-grey_1">{edu.year}</span>
                      </div>
                      <p>{edu.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="mb-12">
                <h2 className="mb-6 border-b border-neutral-grey_1 pb-2 text-2xl font-bold text-orange-800">
                  Skills
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      className="rounded-lg bg-background-secondary p-6 shadow-lg"
                      variants={itemVariants}
                      whileHover={{
                        y: -5,
                        transition: { type: "spring", stiffness: 300 }
                      }}
                    >
                      <h3 className="mb-2 text-xl font-bold text-orange-500">{skill.name}</h3>
                      <p className="mb-4 text-sm text-neutral-grey_1">{skill.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {skill.technologies.map((tech, techIndex) => (
                          <motion.span
                            key={techIndex}
                            className="rounded-full bg-background-primary px-3 py-1 text-sm"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              type: "spring",
                              stiffness: 300
                            }}
                            whileHover={{
                              scale: 1.1,
                              backgroundColor: '#FF8F00',
                              color: 'white'
                            }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="mb-6 border-b border-neutral-grey_1 pb-2 text-2xl font-bold text-orange-800">
                  Download CV
                </h2>
                <div className="flex justify-center">
                  <motion.div
                    className="relative overflow-hidden rounded-lg shadow-xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <img
                      src={CV}
                      alt="CV Preview"
                      className="max-h-[600px] w-auto object-contain"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 hover:opacity-100">
                      <motion.button
                        className="rounded-lg bg-gradient-to-r from-orange-800 to-orange-500 px-6 py-3 font-bold text-white shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleDownloadCV}
                      >
                        Download CV
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Layout>
  )
}