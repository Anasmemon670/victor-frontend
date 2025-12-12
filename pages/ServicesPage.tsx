"use client";

import { motion } from "motion/react";
import { Zap, Rocket, Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import { services } from "@/data/services";

const stats = [
  { number: "500+", label: "Projects Completed" },
  { number: "98%", label: "Client Satisfaction" },
  { number: "50+", label: "Team Members" },
  { number: "24/7", label: "Support Available" },
];

export function ServicesPage() {
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
              <Rocket className="w-5 h-5" />
              <span className="text-sm">★ Professional Services</span>
            </div>
            <h1 className="text-white text-4xl md:text-6xl mb-6">
              Welcome to Vytrion Technologies
            </h1>
            <p className="text-slate-300 text-lg md:text-xl mb-8 leading-relaxed">
              We are a leading technology company dedicated to providing innovative solutions
              that empower businesses and individuals. Our mission is to make technology
              accessible, reliable, and transformative for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2">
                <Zap className="w-5 h-5" />
                Get Started
              </button>
              <button className="bg-transparent border-2 border-white hover:bg-white hover:text-slate-900 text-white px-8 py-4 rounded-lg transition-all">
                Learn More
              </button>
            </div>
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
                <div className="text-cyan-600 text-4xl md:text-5xl mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-6">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-slate-900 text-3xl mb-4">Our Mission</h2>
              <p className="text-slate-600 leading-relaxed">
                To empower businesses and individuals with cutting-edge technology solutions
                that drive innovation, efficiency, and growth. We strive to make advanced
                technology accessible to everyone, regardless of their technical expertise.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-slate-900 text-3xl mb-4">Our Vision</h2>
              <p className="text-slate-600 leading-relaxed">
                To be the world's most trusted technology partner, recognized for our
                innovation, quality, and customer-centric approach. We envision a future
                where technology seamlessly integrates into daily life, making everything easier and more efficient.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 text-cyan-600 mb-3">
              <span className="text-sm">★ What We Offer</span>
            </div>
            <h2 className="text-slate-900 text-3xl md:text-5xl mb-4">
              Our Services
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Comprehensive technology services designed to meet your unique needs and drive your success.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-50 rounded-2xl p-8 hover:shadow-2xl transition-all group border border-slate-200 hover:border-cyan-500"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-slate-900 text-2xl mb-4 group-hover:text-cyan-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-700">
                      <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="text-cyan-600 hover:text-cyan-700 flex items-center gap-2 group-hover:gap-3 transition-all">
                  Learn More
                  <span>→</span>
                </button>
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
              Ready to Transform Your Business?
            </h2>
            <p className="text-slate-300 text-lg mb-8">
              Get in touch with our team to discuss how we can help you achieve your goals
              with our innovative technology solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-lg transition-all transform hover:scale-105" onClick={() => router.push('/contact')}>
                Contact Us
              </button>
              <button className="bg-transparent border-2 border-white hover:bg-white hover:text-slate-900 text-white px-8 py-4 rounded-lg transition-all">
                View Portfolio
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ServicesPage;