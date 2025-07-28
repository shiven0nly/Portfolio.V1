' use client '
import React, { useState, useEffect, useRef } from 'react';
import { Github, ExternalLink, Mail, Menu, X, Code, Palette, Globe } from 'lucide-react';
import './index.css'
import Lenis from 'lenis'

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);

  // Initialize Lenis for smooth scrolling
 useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, [])


  useEffect(() => {
    // Initialize AOS
    if (typeof window !== 'undefined') {
      // AOS CSS
      const aosCSS = document.createElement('link');
      aosCSS.rel = 'stylesheet';
      aosCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css';
      document.head.appendChild(aosCSS);

      // AOS JS
      const aosScript = document.createElement('script');
      aosScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js';
      aosScript.onload = () => {
        window.AOS.init({
          duration: 1000,
          easing: 'ease-in-out',
          once: true,
          offset: 100
        });
      };
      document.head.appendChild(aosScript);

      // GSAP
      const gsapScript = document.createElement('script');
      gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
      gsapScript.onload = () => {
        // Hero animations
        window.gsap.fromTo('.hero-title', 
          { opacity: 0, y: 100 }, 
          { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
        );
        
        window.gsap.fromTo('.hero-subtitle', 
          { opacity: 0, y: 50 }, 
          { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: 'power3.out' }
        );
        
        window.gsap.fromTo('.hero-description', 
          { opacity: 0, y: 30 }, 
          { opacity: 1, y: 0, duration: 0.8, delay: 1.2, ease: 'power3.out' }
        );
        
        window.gsap.fromTo('.hero-buttons', 
          { opacity: 0, y: 30 }, 
          { opacity: 1, y: 0, duration: 0.8, delay: 1.5, ease: 'power3.out' }
        );

        // Floating animation for hero icon
        window.gsap.to('.hero-icon', {
          y: -20,
          duration: 2,
          ease: 'power2.inOut',
          yoyo: true,
          repeat: -1
        });

        // Project card hover animations
        document.querySelectorAll('.project-card').forEach(card => {
          const gradientEl = card.querySelector('.project-gradient');
          const shadowEl = card.querySelector('.project-shadow');
          
          card.addEventListener('mouseenter', () => {
            window.gsap.to(card, { 
              scale: 1.05, 
              duration: 0.4, 
              ease: 'power2.out',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            });
            window.gsap.to(gradientEl, { 
              scale: 1.1, 
              duration: 0.4, 
              ease: 'power2.out' 
            });
            if (shadowEl) {
              window.gsap.to(shadowEl, { 
                opacity: 0.8, 
                duration: 0.3, 
                ease: 'power2.out' 
              });
            }
          });
          
          card.addEventListener('mouseleave', () => {
            window.gsap.to(card, { 
              scale: 1, 
              duration: 0.4, 
              ease: 'power2.out',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
            });
            window.gsap.to(gradientEl, { 
              scale: 1, 
              duration: 0.4, 
              ease: 'power2.out' 
            });
            if (shadowEl) {
              window.gsap.to(shadowEl, { 
                opacity: 0, 
                duration: 0.3, 
                ease: 'power2.out' 
              });
            }
          });
        });

        // Enhanced button interactions
        document.querySelectorAll('.interactive-btn').forEach(btn => {
          btn.addEventListener('mouseenter', () => {
            window.gsap.to(btn, { 
              scale: 1.08, 
              duration: 0.3, 
              ease: 'back.out(1.7)',
              rotationY: 5
            });
          });
          
          btn.addEventListener('mouseleave', () => {
            window.gsap.to(btn, { 
              scale: 1, 
              duration: 0.3, 
              ease: 'back.out(1.7)',
              rotationY: 0
            });
          });
          
          btn.addEventListener('mousedown', () => {
            window.gsap.to(btn, { 
              scale: 0.95, 
              duration: 0.1, 
              ease: 'power2.out' 
            });
          });
          
          btn.addEventListener('mouseup', () => {
            window.gsap.to(btn, { 
              scale: 1.08, 
              duration: 0.1, 
              ease: 'power2.out' 
            });
          });
        });

        // Skill cards stagger animation
        window.gsap.fromTo('.skill-card', 
          { opacity: 0, y: 50, rotation: 5 }, 
          { 
            opacity: 1, 
            y: 0, 
            rotation: 0,
            duration: 0.6, 
            ease: 'back.out(1.7)',
            stagger: 0.1,
            scrollTrigger: {
              trigger: '.skills-container',
              start: 'top 80%'
            }
          }
        );
      };
      document.head.appendChild(gsapScript);

      // GSAP ScrollTrigger
      const scrollTriggerScript = document.createElement('script');
      scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
      scrollTriggerScript.onload = () => {
        window.gsap.registerPlugin(window.ScrollTrigger);
        
        // SplitText animation for name
        const nameElement = document.querySelector('.name-text');
        if (nameElement) {
          const text = nameElement.textContent;
          const letters = text.split('').map((letter, index) => 
            `<span class="letter" style="display: inline-block; opacity: 0; transform: translateY(50px);">${letter === ' ' ? '&nbsp;' : letter}</span>`
          ).join('');
          nameElement.innerHTML = letters;
          
          window.gsap.to('.letter', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'back.out(1.7)',
            stagger: 0.05,
            delay: 0.2
          });
        }
      };
      document.head.appendChild(scrollTriggerScript);
    }

    return () => {
      // Cleanup scripts
      document.querySelectorAll('script[src*="aos"], script[src*="gsap"], link[href*="aos"]').forEach(el => {
        el.remove();
      });
    };
  }, []);

  const projects = [
    {
      id: 1,
      title: "Ice-Cream Site",
      description: "A Ice-Cream site, with sleek modern gradient look landing page, micro-interactions and hover effects. Infact, the ice-cream cone is animated with CSS and GSAP.",
      tech: ["React.js", "CSS", "GSAP"],
      github: "https://github.com/shiven0nly/IceCream-Site",
      live: "https://icecream-site.netlify.app/",
      image: "/images/icecream.png"
    },
    {
      id: 2,
      title: "Mini Quiz Site",
      description: "A Mini quiz fun site, with sleek modern gradient look landing page, with confetti button and after completing quiz u can see your final score.",
      tech: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/shiven0nly/Mini-Quiz-site",
      live: "https://mini-quiz-site.vercel.app/",
      image: "/images/mini-quiz-site.png"
    },
    {
      id: 3,
      title: "To do list Site",
      description: "A simple, sleek, TO-DO-List site with gradients button and minimal UI.. It stores the ToDos in LocalStorage so, if you close the tabs or even shutdown the laptop, they will remain 'Intact'.",
      tech: ["React", "TailwindCSS"],
      github: "https://github.com/shiven0nly/To-do-List_App",
      live: "https://to-do-list-by-shiven.netlify.app/",
      image: "/images/todolist.png"
    },
    {
      id: 4,
      title: "Tech Blog Site",
      description: "Its A tech blog site, inspired from 'TechCrunch' but i gave it more modern colors and AOS animations",
      tech: ["HTML", "CSS"],
      github: "https://github.com/shiven0nly/Tech-Blog-Website",
      live: "https://shiven0nly.github.io/Tech-Blog-Website/",
      image: "/images/techblog.png"
    },
    {
      id: 5,
      title: "Cyber Security Site Demo",
      description: "Its a fictional cyber security site.Built with a focus on creativity, Ui/Ux and animation, this project is a part of my personal learning journey in web dev",
      tech: ["HTML", "CSS"],
      github: "https://github.com/shiven0nly/cyber_security_page2",
      image: "/images/icensite.png"
    },
    {
      id: 6,
      title: "X.com UI Clone",
      description: "Its my first React TailwindCSS project, i try to copy the pixel-perfect UI of X.com, with working Like button and logics like 'without writing a word' the post button will not allow you to post",
      tech: ["React","TailwindCSS"],
      github: "https://github.com/shiven0nly/X.com-clone",
      Live: "https://taupe-cocada-476ffc.netlify.app/",
      image: "/images/x.com-clone.png"
    }
  ];

  const skills = [
    { name: "HTML", icon: "🌐" },
    { name: "CSS", icon: "🎨" },
    { name: "JavaScript", icon: "⚡" },
    { name: "React", icon: "⚛️" },
    { name: "TailwindCSS", icon: "🌊" },
    { name: "Vercel", icon: "🚀" },
    { name: "Netlify", icon: "🌍" }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Portfolio
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="hover:text-purple-400 transition-colors">Home</a>
              <a href="#about" className="hover:text-purple-400 transition-colors">About</a>
              <a href="#projects" className="hover:text-purple-400 transition-colors">Projects</a>
              <a href="#skills" className="hover:text-purple-400 transition-colors">Skills</a>
              <a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800 border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#home" className="block px-3 py-2 hover:bg-gray-700 rounded">Home</a>
              <a href="#about" className="block px-3 py-2 hover:bg-gray-700 rounded">About</a>
              <a href="#projects" className="block px-3 py-2 hover:bg-gray-700 rounded">Projects</a>
              <a href="#skills" className="block px-3 py-2 hover:bg-gray-700 rounded">Skills</a>
              <a href="#contact" className="block px-3 py-2 hover:bg-gray-700 rounded">Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900" ref={heroRef}>
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="mb-8">
            <h1 className="hero-title text-5xl md:text-7xl font-bold mb-4">
              <span className="name-text text-amber-300">
                Shiven Sharma
              </span>
            </h1>
            <h2 className="hero-subtitle text-2xl md:text-3xl font-semibold mb-4 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Front-End Developer and UI/UX Enthusiast
            </h2>
            <p className="hero-description text-xl md:text-2xl text-gray-300 mb-8">
              Creating modern web experiences with New Technologies
            </p>
            <div className="hero-buttons flex justify-center space-x-4">
              <a 
                href="#projects" 
                className="interactive-btn bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              >
                View Projects
              </a>
              <a 
                href="https://github.com/shiven0nly/" 
                target="_blank"
                rel="noopener noreferrer"
                className="interactive-btn border border-gray-600 px-8 py-3 rounded-full font-semibold hover:border-purple-400 hover:text-purple-400 transition-all duration-300"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-800/50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            data-aos="fade-up"
          >
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right" data-aos-delay="200">
              <p className="text-lg text-gray-300 mb-6">
                I'm a passionate Front-End developer with a focus on creating modern, responsive web applications. 
                I love turning complex problems into simple, beautiful and intuitive solutions.
              </p>
              <p className="text-lg text-gray-300 mb-6">
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
                or sharing my knowledge with my techie friends.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://github.com/shiven0nly/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive-btn flex items-center space-x-2 bg-gray-700 px-4 py-2 rounded-full hover:bg-gray-600 transition-all duration-300"
                >
                  <Github size={20} />
                  <span>GitHub</span>
                </a>
                <a 
                  href="#contact" 
                  className="interactive-btn flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                >
                  <Mail size={20} />
                  <span>Contact</span>
                </a>
              </div>
            </div>
            <div className="flex justify-center" data-aos="fade-left" data-aos-delay="400">
              <div className="hero-icon w-80 h-80 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-full flex items-center justify-center">
                <Code size={120} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
     <section id="projects" className="py-20" ref={projectsRef}>
  <div className="max-w-7xl mx-auto px-4">
    <h2 
      className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent"
      data-aos="fade-up"
    >
      Featured Projects
    </h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <div 
          key={project.id} 
          className="project-card bg-gray-800 rounded-xl overflow-hidden cursor-pointer shadow-lg transition-all duration-300"
          data-aos="fade-up"
          data-aos-delay={index * 100}
        >
          <div className="project-image h-48 p-6 flex items-center justify-center relative overflow-hidden">
            <img 
              src={project.image} 
              alt={`${project.title} preview`} 
              className="w-full object-cover rounded-lg"
            />
            <div className="project-shadow absolute inset-0 bg-black/20 opacity-0 transition-all duration-300 pointer-events-none"></div>
            <div className={`absolute inset-0 opacity-0 hover:opacity-30 transition-opacity duration-300 bg-gradient-to-br ${project.gradient} blur-xl`}></div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <p className="text-gray-400 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech) => (
                <span 
                  key={tech} 
                  className="px-3 py-1 bg-gray-700 text-sm rounded-full hover:bg-gray-600 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex space-x-4">
              <a 
                href={project.github} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                <Github size={18} />
                <span>Code</span>
              </a>
              <a 
                href={project.live} 
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                <ExternalLink size={18} />
                <span>Live</span>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

                 {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-800/50" ref={skillsRef}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"
            data-aos="fade-up"
          >
            Skills & Technologies
          </h2>
          <div className="skills-container grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {skills.map((skill, index) => (
              <div 
                key={skill.name} 
                className="skill-card bg-gray-800 rounded-xl p-6 text-center hover:bg-gray-700 transition-all duration-300 cursor-pointer transform hover:scale-110"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <div className="text-4xl mb-4 transition-transform duration-300 hover:scale-125">
                  {skill.icon}
                </div>
                <h3 className="font-semibold">{skill.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 
            className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            data-aos="fade-up"
          >
            Get In Touch
          </h2>
          <p 
            className="text-xl text-gray-300 mb-8"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Let's work together to bring your ideas to life
          </p>
          <div 
            className="flex justify-center space-x-6"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <a 
              href="mailto:shiven676@gmail.com" 
              className="interactive-btn bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            >
              Send Message
            </a>
            <a 
              href="https://github.com/shiven0nly/" 
              target="_blank"
              rel="noopener noreferrer"
              className="interactive-btn border border-gray-600 px-8 py-3 rounded-full font-semibold hover:border-purple-400 hover:text-purple-400 transition-all duration-300"
            >
              View GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            All Copyrigths&copy; Reserved by 'Shiven'
          </p>
        </div>
      </footer>
    </div>
  );
}