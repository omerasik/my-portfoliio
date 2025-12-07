"use client";

import { motion } from "framer-motion";
import { Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Card from "@/components/ui/Card";
import { contactDetails } from "@/lib/data";
import type { ContactDetail } from "@/lib/data";

const detailIcons: Record<ContactDetail["icon"], React.ReactNode> = {
  Mail: <Mail className="h-5 w-5" />,
  Phone: <Phone className="h-5 w-5" />,
  MapPin: <MapPin className="h-5 w-5" />,
  Linkedin: <Linkedin className="h-5 w-5" />,
  Github: null
};

export default function Contact() {
  return (
    <motion.section
      id="contact"
      className="relative section-padding space-y-16 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.3 }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Sphere */}
        <div className="absolute top-1/2 right-10 transform -translate-y-1/2 hidden lg:block">
          <motion.div
            className="w-80 h-80 relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {/* Sphere Rings */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 border border-accent-pink/20 rounded-full"
                style={{
                  transform: `rotateX(${i * 30}deg) rotateY(${i * 30}deg)`,
                }}
                animate={{ 
                  rotateX: i * 30 + 360,
                  rotateY: i * 30 + 360 
                }}
                transition={{
                  duration: 15 + i * 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
            
            {/* Central Glow */}
            <motion.div
              className="absolute inset-1/3 bg-gradient-to-r from-accent-pink/20 to-accent-cyan/20 rounded-full blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>
      </div>
      {/* Header */}
      <motion.div 
        className="text-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <p className="text-sm uppercase tracking-[0.4em] text-accent-pink mb-4">GET IN TOUCH</p>
        <h2 className="font-display text-5xl md:text-7xl text-white mb-6">
          Contact<span className="text-accent-pink">.</span>
        </h2>
        <p className="text-white/70 text-lg max-w-2xl mx-auto">
          Let&apos;s talk about your next project. I build modern full-stack apps, dashboards, and integrations.
        </p>
      </motion.div>
      <div className="grid gap-12 lg:grid-cols-2 relative z-10">
        {/* Contact Info */}
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.p 
            className="text-lg text-white/80 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            I am available for full-stack roles, and collaborations on real-world products. 
            If you need someone who can take a concept from idea to working prototype, let&apos;s talk.
          </motion.p>

          <div className="space-y-6">
            {contactDetails.slice(0, 2).map((detail, index) => (
              <motion.div
                key={detail.label}
                className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <span className="text-accent-cyan text-2xl">{detailIcons[detail.icon]}</span>
                <div>
                  <p className="text-white/60 text-sm uppercase tracking-wide">{detail.label}</p>
                  <a href={detail.href} className="text-white hover:text-accent-cyan transition font-medium text-lg">
                    {detail.value}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div 
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {contactDetails.slice(2).filter(detail => detail.icon !== 'Github').map((detail) => (
              <motion.a
                key={detail.label}
                href={detail.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-white/70 transition-all duration-300 hover:text-accent-pink hover:bg-white/10"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                {detailIcons[detail.icon]}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Send Email Button */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          viewport={{ once: true, amount: 0.2 }}
          className="flex items-center justify-center"
        >
          <Card className="backdrop-blur-sm bg-white/5 border-white/10 p-8 sm:p-12 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="h-16 w-16 sm:h-20 sm:w-20 mx-auto mb-6 text-accent-cyan" />
              <h3 className="font-display text-2xl sm:text-3xl text-white mb-4">Ready to start a project?</h3>
              <p className="text-white/70 mb-8 max-w-md mx-auto">
                Click below to send me an email directly. I&apos;ll get back to you as soon as possible.
              </p>
              <a
                href="mailto:omerfarukasik54@gmail.com?subject=Project%20Inquiry&body=Hi%20Omer,%0A%0A"
                className="inline-flex items-center gap-3 rounded-full border-2 border-accent-cyan bg-accent-cyan/10 px-8 py-4 text-lg font-semibold text-accent-cyan transition-all hover:bg-accent-cyan hover:text-white hover:shadow-[0_0_30px_rgba(45,212,191,0.5)]"
              >
                <Mail className="h-5 w-5" />
                <span>Send a Mail</span>
              </a>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
}

