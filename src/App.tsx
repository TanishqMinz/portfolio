import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, Moon, Sun } from 'lucide-react'

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home')
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  function Theme() {
    if (localStorage.theme === "dark" || !("theme" in localStorage)) {
      //add class=dark in html element
      document.documentElement.classList.add("dark");
    } else {
      //remove class=dark in html element
      document.documentElement.classList.remove("dark");
    }

    if (localStorage.theme === "dark") {
      localStorage.theme = "light";
    } else {
      localStorage.theme = "dark";
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const projects = [
    { title: 'Project 1', description: 'A modern web application built with React and Node.js', image: '/placeholder.svg' },
    { title: 'Project 2', description: 'An e-commerce platform with real-time inventory management', image: '/placeholder.svg' },
    { title: 'Project 3', description: 'A machine learning model for predictive analytics', image: '/placeholder.svg' },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50"
        style={{ scaleX }}
      />
      <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-sm z-40 border-b">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <ul className="flex space-x-4">
            {['home', 'about', 'projects', 'contact'].map((section) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === section ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              </li>
            ))}
          </ul>
          <Button
            variant="ghost"
            size="icon"
            onClick={Theme}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </nav>
      </header>

      <main className="container mx-auto px-4 pt-24">
        <section id="home" className="min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Tanishq Minz</h1>
            <p className="text-xl text-muted-foreground mb-8">Front End Developer</p>
            <Button asChild size="lg">
              <a href="#contact">Get in touch</a>
            </Button>
          </motion.div>
        </section>

        <section id="about" className="min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl font-bold mb-6 text-center">About Me</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                   Voluptatum, saepe quia. Illo sequi quam maiores.
                </p>
                <p className="text-muted-foreground">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                   Quod pariatur provident aliquid? Laboriosam, fugiat porro!
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        <section id="projects" className="min-h-screen py-16">
          <h2 className="text-3xl font-bold mb-8 text-center">My Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <img src={project.image} alt={project.title} className="w-full h-48 object-cover rounded-md mb-4" />
                    <CardDescription>{project.description}</CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">View Project</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="contact" className="min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="w-full max-w-md"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Get in Touch</h2>
            <Card>
              <CardContent className="pt-6">
                <form className="space-y-4">
                  <Input type="text" placeholder="Name" />
                  <Input type="email" placeholder="Email" />
                  <Textarea placeholder="Message" />
                  <Button type="submit" className="w-full">Send Message</Button>
                </form>
              </CardContent>
            </Card>
            <div className="flex justify-center space-x-4 mt-8">
              <Button variant="outline" size="icon" asChild>
                <a href="https://github.com/TanishqMinz" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://linkedin.com/in/tanishq-minz" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="mailto:tanishqminz@gmail.com">
                  <Mail className="h-4 w-4" />
                  <span className="sr-only">Email</span>
                </a>
              </Button>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="bg-muted py-6 text-center text-sm text-muted-foreground">
        <p>&copy; 2024 Tanishq Minz. All rights reserved.</p>
      </footer>
    </div>
  )
}