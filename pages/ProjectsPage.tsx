"use client";

import { motion } from "motion/react";
import { Cpu, Code, Globe, Shield, Smartphone, Headphones, CheckCircle, Calendar, Users } from "lucide-react";
import { useRouter } from "next/navigation";

const completedProjects = [
  {
    icon: Cpu,
    title: "Technology Solutions",
    client: "TechCorp Global",
    year: "2024",
    description: "Delivered cutting-edge technology solutions including cloud computing infrastructure, IT system integration, and comprehensive tech consulting services.",
    features: ["Cloud Computing", "IT Infrastructure", "System Integration", "Tech Consulting"],
    status: "Completed",
    image: "/images/products/usb-hub.png"
  },
  {
    icon: Code,
    title: "Software Development",
    client: "StartupHub Inc",
    year: "2024",
    description: "Built custom web and mobile applications with seamless API integration, delivering a complete software solution from concept to deployment.",
    features: ["Web Development", "Mobile Apps", "Custom Software", "API Integration"],
    status: "Completed",
    image: "/images/products/laptop-stand.png"
  },
  {
    icon: Globe,
    title: "Digital Marketing",
    client: "BrandBoost Ltd",
    year: "2024",
    description: "Executed comprehensive digital marketing strategy that increased online presence by 300% through SEO optimization, social media campaigns, and content marketing.",
    features: ["SEO Optimization", "Social Media", "Content Marketing", "Analytics"],
    status: "Completed",
    image: "/images/products/charging-pad.png"
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    client: "SecureBank Corp",
    year: "2023",
    description: "Implemented advanced cybersecurity solutions with 24/7 monitoring, threat detection, and complete compliance with industry standards.",
    features: ["Threat Detection", "Security Audits", "Data Protection", "Compliance"],
    status: "Completed",
    image: "/images/products/laptop-stand.png"
  },
  {
    icon: Smartphone,
    title: "Mobile Solutions",
    client: "MobileFirst Co",
    year: "2023",
    description: "Developed innovative mobile applications for both iOS and Android platforms with cross-platform compatibility and ongoing maintenance support.",
    features: ["iOS Development", "Android Apps", "Cross-Platform", "App Maintenance"],
    status: "Completed",
    image: "/images/products/smart-watch.png"
  },
  {
    icon: Headphones,
    title: "24/7 Support System",
    client: "GlobalTech Solutions",
    year: "2023",
    description: "Established round-the-clock customer support infrastructure with multi-channel assistance ensuring zero downtime for critical operations.",
    features: ["Live Chat", "Phone Support", "Email Support", "Remote Assistance"],
    status: "Completed",
    image: "/images/products/headphones.png"
  },
];

const stats = [
  { number: "6", label: "Projects Completed", icon: CheckCircle },
  { number: "100%", label: "Success Rate", icon: CheckCircle },
  { number: "50+", label: "Team Members", icon: Users },
  { number: "2023-24", label: "Timeline", icon: Calendar },
];

export function ProjectsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 text-cyan-400 mb-4">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm">★ Successful Deliveries</span>
            </div>
            <h1 className="text-white text-4xl md:text-6xl mb-6">
              Our Completed Projects
            </h1>
            <p className="text-slate-300 text-lg md:text-xl mb-8 leading-relaxed">
              Showcasing our portfolio of successfully delivered projects across various domains.
              Each project represents our commitment to excellence and client satisfaction.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12 border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex items-center justify-center mb-3">
                  <stat.icon className="w-8 h-8 text-cyan-600" />
                </div>
                <div className="text-cyan-600 text-4xl md:text-5xl mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 text-cyan-600 mb-3">
              <span className="text-sm">★ Portfolio Highlights</span>
            </div>
            <h2 className="text-slate-900 text-3xl md:text-5xl mb-4">
              Project Showcase
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Explore our diverse range of completed projects that demonstrate our expertise and commitment to quality.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {completedProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group border border-slate-200 hover:border-cyan-500"
              >
                {/* Project Header with Gradient */}
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2 shadow-lg">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-slate-900 font-medium">{project.status}</span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                      <project.icon className="w-6 h-6 text-cyan-600" />
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-slate-900 text-2xl group-hover:text-cyan-600 transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{project.client}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{project.year}</span>
                    </div>
                  </div>

                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6">
                    <p className="text-slate-700 text-sm mb-3">Key Deliverables:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {project.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-slate-700 text-sm">
                          <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-white text-3xl md:text-4xl mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-slate-300 text-lg mb-8">
              Join our list of satisfied clients and let us help you turn your vision into reality
              with our proven expertise and commitment to excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/services')}
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-lg transition-all transform hover:scale-105"
              >
                Start a Project
              </button>
              <button
                onClick={() => router.push('/contact')}
                className="bg-transparent border-2 border-white hover:bg-white hover:text-slate-900 text-white px-8 py-4 rounded-lg transition-all"
              >
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ProjectsPage;