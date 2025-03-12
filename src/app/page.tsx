import Image from "next/image"
import Link from "next/link"
import { FaLinkedin, FaDiscord } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import { researchProjects } from "./research/research"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Profile Section */}
      <div className="flex flex-col lg:flex-row items-start gap-12 mb-20">
        {/* Profile Image and Title - Made narrower */}
        <div className="lg:w-1/4 flex flex-col items-center w-full lg:sticky lg:top-8">
          <div className="w-48 h-48 md:w-56 md:h-56 relative rounded-full overflow-hidden shadow-lg mx-auto">
            <Image 
              src="/me.jpg" 
              alt="Joon" 
              layout="fill" 
              objectFit="cover"
              className="hover:scale-105 transition-transform duration-300" 
            />
          </div>
          <div className="mt-6 text-center">
            <h2 className="text-lg font-medium text-gray-800">
              Incoming PhD Student in Computer Science
            </h2>
            <h3 className="text-lg text-gray-600 mt-1">
              Northeastern University
            </h3>
          </div>
          
          {/* Moved social links under profile */}
          <div className="flex gap-4 mt-6">
            <Link
              href="https://www.linkedin.com/in/hwijoon-lee-3004401a4"
              className="text-blue-500 hover:text-blue-600 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin size={32} />
            </Link>
            <Link
              href="https://discord.com/users/287802139781103616"
              className="text-indigo-500 hover:text-indigo-600 transition-colors"
              aria-label="Discord Profile"
            >
              <FaDiscord size={32} />
            </Link>
            <Link
              href="mailto:lee.hw@northeastern.edu"
              className="text-red-500 hover:text-red-600 transition-colors"
              aria-label="Email"
            >
              <MdEmail size={35} />
            </Link>
          </div>
        </div>

        {/* Main Content - Adjusted width and spacing */}
        <div className="lg:w-3/4">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-6">Hi, I&apos;m Joon Lee</h1>
            <div className="space-y-6 text-lg">
              <p>
                I study solutions that make technology more <span className="border-b-4 border-blue-400/30">intuitive</span> and <span className="border-b-4 border-blue-400/30">accessible</span> for everyone.
              </p>
              
              {/* Research and Career sections with consistent spacing */}
              <div className="space-y-4">
                <p className="font-medium">My research focuses on:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Understanding online communities and their impact on user interactions</li>
                  <li>Developing AI-driven insights for fostering healthy digital spaces</li>
                </ul>
              </div>

              <div className="space-y-4">
                <p className="font-medium">My career aspirations:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><span className="border-b-4 border-blue-400/30">Game UX Researcher</span> - Creating intuitive and accessible gaming experiences</li>
                  <li><span className="border-b-4 border-blue-400/30">AI Researcher</span> - Exploring how AI can support experiences of diverse audiences</li>
                </ul>
              </div>

              <p>
                I am advised by{' '}
                <a
                  href="https://www.saiph.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                >
                  Professor Savage
                </a>
                .<br />
                Check out my {' '} 
                <Link
                  href="https://docs.google.com/document/d/1HHonB5_tLGobyj4zAD8gX373g_HPeJ7w3ffK5eo2CKM/edit?usp=sharing"
                  className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                >
                  resume
                </Link>
                !
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Research Projects Section - Full width with max-width constraint */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Research Projects</h2>
        <div className="grid gap-6">
          {researchProjects.map((project, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Link
                href={project.link}
                className="text-xl font-semibold hover:text-blue-600 transition-colors block mb-2"
              >
                {project.title}
              </Link>
              <div className="text-gray-500 text-sm mb-4">
                {project.year}
                {project.conference && ` • ${project.conference}`}
              </div>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
