import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Github, Instagram, MessageCircle, Send } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { cn } from './lib/utils';

// --- Types ---
interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  demo: string;
  github: string;
}

interface Skill {
  name: string;
  level: number;
}

// --- Components ---

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setProgress(Number((currentScroll / scrollHeight).toFixed(2)) * 100);
      }
    };
    window.addEventListener('scroll', updateScroll);
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-white z-[100] origin-left"
      style={{ scaleX: progress / 100 }}
    />
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        isScrolled ? 'bg-black/80 backdrop-blur-lg border-bottom border-white/10' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.a
          href="#home"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold tracking-tighter"
        >
          MOSTAFA<span className="text-white/50">.DEV</span>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              {link.name}
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-5 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-white/90 transition-all"
          >
            Hire Me
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-white/70 hover:text-white"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const TypingEffect = ({ texts }: { texts: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === texts[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 75 : subIndex === texts[index].length ? 1000 : 150, parseInt((Math.random() * 350).toString())));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, texts]);

  return (
    <span className="inline-block min-h-[1.2em]">
      {texts[index].substring(0, subIndex)}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-white/60 font-medium tracking-widest uppercase text-sm mb-4">
            Available for new projects
          </h2>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-none mb-6">
            Mostofa <br />
            <span className="text-gradient">Mahros</span>
          </h1>
          <div className="text-xl md:text-2xl text-white/70 font-light mb-8 h-8">
            <TypingEffect texts={['Full-Stack Web Developer', 'UI/UX Enthusiast', 'Problem Solver', 'Clean Code Advocate']} />
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform"
            >
              View Projects
            </a>
            <button
              className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition-colors"
            >
              Download CV
            </button>
          </div>
        </motion.div>


      </div>
    </section>
  );
};

const About = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const features = [
    { title: 'Problem Solver', desc: 'I focus on solving real problems with efficient code.' },
    { title: 'Clean Architecture', desc: 'I write scalable, maintainable, and clean codebases.' },
    { title: 'Responsive by Default', desc: 'Seamless experiences across all device sizes.' },
    { title: 'Performance & UX', desc: 'Optimized for speed and smooth user interactions.' },
  ];

  return (
    <section id="about" className="py-24 bg-zinc-950/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
            <p className="text-lg text-white/60 leading-relaxed mb-8">
              I'm a full-stack developer with experience in building modern web applications from the ground up. 
              From responsive user interfaces to secure back-end APIs and database-driven systems, 
              I focus on writing clean code, scalable architecture, and real-world solutions.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {features.map((f, i) => (
                <div key={i} className="space-y-2">
                  <h4 className="font-bold text-white">{f.title}</h4>
                  <p className="text-sm text-white/40">{f.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden glass p-8 flex flex-col justify-center items-center text-center">
              <div className="text-6xl font-black mb-2">5+</div>
              <div className="text-white/50 uppercase tracking-widest text-sm">Years of Experience</div>
              <div className="mt-12 space-y-4 w-full">
                <div className="flex justify-between text-xs uppercase tracking-tighter text-white/40">
                  <span>Projects Completed</span>
                  <span>50+</span>
                </div>
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={inView ? { width: '85%' } : {}}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-white" 
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const skills: Skill[] = [
    { name: 'HTML / CSS / Responsive', level: 95 },
    { name: 'JavaScript / ES6+ / DOM', level: 90 },
    { name: 'React / Hooks / Components', level: 85 },
    { name: 'Node.js / Express / APIs', level: 85 },
    { name: 'MySQL / Design / CRUD', level: 85 },
    { name: 'Auth / Security', level: 80 },
  ];

  return (
    <section id="skills" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Technical Expertise</h2>
          <p className="text-white/50">A comprehensive set of tools I use to bring ideas to life.</p>
        </div>

        <div ref={ref} className="grid md:grid-cols-2 gap-x-16 gap-y-8">
          {skills.map((skill, i) => (
            <div key={skill.name} className="space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-sm font-medium uppercase tracking-wider">{skill.name}</span>
                <span className="text-xs font-mono text-white/40">{skill.level}%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${skill.level}%` } : {}}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className="h-full bg-white neon-glow"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index }: { project: Project; index: number; key?: string }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ 
        y: -10,
        rotateX: 2,
        rotateY: -2,
        transition: { duration: 0.3 }
      }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl glass transition-all duration-500 hover:border-white/30 perspective-1000"
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} className="text-[10px] uppercase tracking-widest px-2 py-1 bg-white/5 rounded-md text-white/60">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-sm text-white/50 mb-6 line-clamp-2">{project.description}</p>
        <div className="flex gap-4">
          <a
            href={project.demo}
            className="flex-1 text-center py-2 bg-white text-black text-xs font-bold rounded-lg hover:bg-white/90 transition-colors"
          >
            Live Demo
          </a>
          <a
            href={project.github}
            className="px-4 py-2 border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
          >
            <Github size={16} />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const projects: Project[] = [
    {
      title: 'ApexConstruct – Building',
      description: 'Premium Construction, Architectural Finishing, and Renovation Services for Modern Developers and Businesses',
      image: '1.png',
      tags: ['React', 'Node.js', 'Stripe', 'MySQL'],
      demo: 'https://construction-cv.netlify.app/',
      github: '#',
    },
    {
      title: 'Dr. Mona Dental Clinic',
      description: 'Confident Smile Starts Here with Advanced Cosmetic Dentistry, Smart Technology, and Personalized VIP Dental Care',
      image: '2.png',
      tags: ['React', 'Express', 'Socket.io', 'Auth'],
      demo: 'https://d-mona.netlify.app/',
      github: '#',
    },
    {
      title: 'Momentum Digital Growth Agency',
      description: 'We Scale Your Brand with Data-Driven Strategy, High-Impact Creative, and Performance Marketing That Delivers Real Results',
      image: '5.png',
      tags: ['React', 'Redux', 'Node.js', 'Chart.js'],
      demo: 'https://e-commersmostafa.netlify.app/',
      github: '#',
    },
    {
      title: 'AURA Home',
      description: 'Elevate Your Sanctuary with Curated Minimalist Furniture and Modern Decor Designed for Stylish, Peaceful Living',
      image: '4.png',
      tags: ['React', 'Firebase', 'Tailwind'],
      demo: 'https://aura-storee.netlify.app/',
      github: '#',
    },
    {
      title: 'Al Rasikhoun Contracting',
      description: 'Building Landmarks of Success with Strategic Project Management, Premium Construction Solutions, and Trusted Expertise Since 1998',
      image: '6.png',
      tags: ['Next.js', 'TypeScript', 'Prisma'],
      demo: 'https://beautiful-custard-1113f5.netlify.app/',
      github: '#',
    },
    {
      title: 'Elite Homes Real Estate',
      description: 'Discover Exceptional Living with Premium Properties, Smart Investments, and Luxury Homes in Prime Locations',
      image: '3.png',
      tags: ['React', 'Google Maps API', 'Node.js'],
      demo: 'https://profil-works.netlify.app/',
      github: '#',
    },
  ];

  return (
    <section id="projects" className="py-24 bg-zinc-950/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Work</h2>
            <p className="text-white/50">A selection of my recent full-stack projects.</p>
          </div>
          <a href="#" className="text-sm font-bold border-b border-white/20 pb-1 hover:border-white transition-all">
            View All Projects
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="contact" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Get in Touch</h2>
            <p className="text-lg text-white/50 mb-12">
              Have a project in mind? Let's build something amazing together. 
              I'm always open to discussing new opportunities and challenges.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  <Send size={20} />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-widest">Email</p>
                  <p className="text-lg font-medium">mahrosmostafa89@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-widest">WhatsApp</p>
                  <p className="text-lg font-medium">+201095262372</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-12">
              {[
                { icon: <Instagram size={20} />, href: 'https://instagram.com/mostaafa505' },
                { icon: <Github size={20} />, href: '#' },
                { icon: <span className="font-bold text-xs">TT</span>, href: '#' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass p-8 rounded-3xl space-y-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/40">Name</label>
                <input
                  type="text"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/30 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/40">Email</label>
                <input
                  type="email"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/30 transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-white/40">Subject</label>
              <input
                type="text"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/30 transition-colors"
                placeholder="Project Inquiry"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-white/40">Message</label>
              <textarea
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/30 transition-colors resize-none"
                placeholder="Tell me about your project..."
              />
            </div>
            <button className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-colors">
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-sm text-white/40">
          © {new Date().getFullYear()} Mostofa Mahros. All rights reserved.
        </p>
        <div className="flex gap-8">
          <a href="#" className="text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 2 }}
      onAnimationComplete={() => document.body.style.overflow = 'auto'}
      className="fixed inset-0 z-[200] bg-black flex items-center justify-center pointer-events-none"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-black tracking-tighter"
      >
        MAHROS<span className="text-white/50">.DEV</span>
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  return (
    <main className="relative selection:bg-white selection:text-black">
      <LoadingScreen />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
