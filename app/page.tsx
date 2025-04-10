"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Mail, ChevronDown, MessageSquare } from "lucide-react"
import Link from "next/link"
import ParticleBackground from "@/components/particle-background"
import { useInView } from "react-intersection-observer"
import { ChatBot } from "@/components/chat-bot"

export default function Home() {
  const { scrollY } = useScroll()
  const scrollYSpring = useSpring(scrollY)
  const headerOpacity = useTransform(scrollYSpring, [0, 100], [1, 0.2])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isChatOpen, setIsChatOpen] = useState(false)

  // Refs for scroll animations
  const [heroRef, heroInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const [skillsRef, skillsInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const [contactRef, contactInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const skills = [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "Machine Learning",
    "Cloud Computing",
    "UI/UX Design",
    "Data Science",
  ]

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev)
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <ParticleBackground mousePosition={mousePosition} />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black pointer-events-none z-10" />

      <motion.header
        style={{ opacity: headerOpacity }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center"
      >
        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
          BryonWatkins
        </div>
        <div className="flex space-x-4">
          <Link href="https://github.com/finedineholdthewine" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" className="text-white hover:text-purple-400 transition-colors">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>
          <Link href="https://www.linkedin.com/in/bryon-watkins-22891080/" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" className="text-white hover:text-purple-400 transition-colors">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Button>
          </Link>
          <a href="mailto:bryonlmon@icloud.com">
            <Button variant="ghost" size="icon" className="text-white hover:text-purple-400 transition-colors">
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Button>
          </a>
        </div>
      </motion.header>

      <main>
        <section
          ref={heroRef}
          className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 z-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: heroInView ? 1 : 0, y: heroInView ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center max-w-4xl mx-auto space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
              <span className="block">Building The</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 animate-gradient">
                Future of Tech
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
              Innovative solutions for tomorrow's challenges. Pushing the boundaries of what's possible.
            </p>
            <div className="flex justify-center pt-6">
              <div className="relative group">
                {/* Outer glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg blur opacity-75 group-hover:opacity-100 animate-pulse transition duration-200"></div>

                {/* Inner glow effect */}
                <div
                  className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg blur-sm opacity-75 group-hover:opacity-100 animate-pulse transition duration-200"
                  style={{ animationDelay: "300ms" }}
                ></div>

                <Button
                  onClick={toggleChat}
                  className="relative bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-6 text-lg h-auto rounded-lg shadow-[0_0_15px_rgba(139,92,246,0.5)] hover:shadow-[0_0_25px_rgba(139,92,246,0.7)] transition-all duration-300 group-hover:scale-105"
                >
                  <MessageSquare className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                  <span className="relative">
                    Chat with BryBot
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                  </span>
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: heroInView ? 1 : 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
          >
            <ChevronDown className="h-8 w-8 text-purple-400" />
          </motion.div>
        </section>

        <section
          ref={skillsRef}
          className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 z-20"
        >
          <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 to-transparent opacity-30" />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: skillsInView ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto space-y-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
                Technical Expertise
              </span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: skillsInView ? 1 : 0, y: skillsInView ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Badge className="w-full py-3 text-base bg-gradient-to-r from-purple-900/50 to-cyan-900/50 hover:from-purple-800/50 hover:to-cyan-800/50 border border-purple-500/30 transition-all duration-300">
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: skillsInView ? 1 : 0, scale: skillsInView ? 1 : 0.9 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative mx-auto mt-16 max-w-3xl"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative px-6 py-8 bg-black/80 ring-1 ring-gray-800/50 rounded-lg leading-none flex items-top justify-start space-x-6">
                <div className="space-y-4">
                  <p className="text-gray-300">
                    I use JavaScript, Python, and AI tools to build meaningful digital experiences. My projects combine
                    functionality with heart—bridging the gap between users and the support they need, right when they
                    need it.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <section
          ref={contactRef}
          className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 z-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: contactInView ? 1 : 0, y: contactInView ? 0 : 50 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto space-y-8"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
                Let's Connect
              </span>
            </h2>

            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Interested in working together? I'm always open to discussing new projects and opportunities.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: contactInView ? 1 : 0, y: contactInView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-6 justify-center pt-6"
            >
              <div className="relative group">
                {/* Glow effect for Email button */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-200"></div>

                <a href="mailto:bryonlmon@icloud.com">
                  <Button
                    variant="outline"
                    className="relative w-full sm:w-auto border-purple-500 text-white hover:bg-purple-950 px-8 py-6 text-lg h-auto"
                  >
                    <Mail className="mr-2 h-5 w-5" /> Email Me
                  </Button>
                </a>
              </div>

              <div className="relative group">
                {/* Glow effect for LinkedIn button */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-200"></div>

                <Link
                  href="https://www.linkedin.com/in/bryon-watkins-22891080/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="relative w-full sm:w-auto border-purple-500 text-white hover:bg-purple-950 px-8 py-6 text-lg h-auto"
                  >
                    <Linkedin className="mr-2 h-5 w-5" /> LinkedIn
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: contactInView ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-12 text-gray-400"
            >
              <p>Based in Southern California</p>
              <p className="mt-2">© {new Date().getFullYear()} BryonWatkins. All rights reserved.</p>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  )
}
