"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Github, Linkedin, Loader2, Mail, MapPin, Phone } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { contactDetails } from "@/lib/data";
import type { ContactDetail } from "@/lib/data";

const detailIcons: Record<ContactDetail["icon"], ReactNode> = {
  Mail: <Mail className="h-5 w-5" />,
  Phone: <Phone className="h-5 w-5" />,
  MapPin: <MapPin className="h-5 w-5" />,
  Linkedin: <Linkedin className="h-5 w-5" />,
  Github: <Github className="h-5 w-5" />
};

const initialForm = {
  fullName: "",
  email: "",
  subject: "",
  message: ""
};

type FormState = typeof initialForm;

type FormErrors = Partial<Record<keyof FormState, string>>;

type FormStatus = "idle" | "loading" | "success" | "validation-error" | "server-error";

export default function Contact() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleChange = (field: keyof FormState) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    setStatus((prev) => (prev === "loading" ? prev : "idle"));
  };

  const validate = () => {
    const newErrors: FormErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Please enter your name.";
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please provide a valid email.";
    }
    if (!form.subject.trim()) newErrors.subject = "Please add a subject.";
    if (!form.message.trim()) newErrors.message = "Let me know how I can help.";
    return newErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length > 0) {
      setStatus("validation-error");
      return;
    }
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      setStatus("success");
      setForm(initialForm);
      setErrors({});
    } catch (error) {
      console.error("Contact form submission failed", error);
      setStatus("server-error");
    }
  };

  return (
    <motion.section
      id="contact"
      className="relative section-padding space-y-16 overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
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
        transition={{ duration: 0.6 }}
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
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <motion.p 
            className="text-lg text-white/80 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            I am available for full-stack roles, and collaborations on real-world products. 
            If you need someone who can take a concept from idea to working prototype, let&apos;s talk.
          </motion.p>

          <div className="space-y-6">
            {contactDetails.slice(0, 2).map((detail, index) => (
              <motion.div
                key={detail.label}
                className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
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
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
        <Card className="backdrop-blur-sm bg-white/5 border-white/10">
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="fullName" className="text-xs uppercase tracking-[0.4em] text-white/50">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={form.fullName}
                onChange={handleChange("fullName")}
                className={`mt-2 w-full rounded-2xl border bg-transparent px-4 py-3 text-white focus:border-accent-cyan focus:outline-none ${
                  errors.fullName ? "border-[#ff4d6d]" : "border-white/15"
                }`}
              />
              {errors.fullName && <p className="mt-1 text-sm text-[#ff4d6d]">{errors.fullName}</p>}
            </div>
            <div>
              <label htmlFor="email" className="text-xs uppercase tracking-[0.4em] text-white/50">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={handleChange("email")}
                className={`mt-2 w-full rounded-2xl border bg-transparent px-4 py-3 text-white focus:border-accent-cyan focus:outline-none ${
                  errors.email ? "border-[#ff4d6d]" : "border-white/15"
                }`}
              />
              {errors.email && <p className="mt-1 text-sm text-[#ff4d6d]">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="subject" className="text-xs uppercase tracking-[0.4em] text-white/50">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                value={form.subject}
                onChange={handleChange("subject")}
                className={`mt-2 w-full rounded-2xl border bg-transparent px-4 py-3 text-white focus:border-accent-cyan focus:outline-none ${
                  errors.subject ? "border-[#ff4d6d]" : "border-white/15"
                }`}
              />
              {errors.subject && <p className="mt-1 text-sm text-[#ff4d6d]">{errors.subject}</p>}
            </div>
            <div>
              <label htmlFor="message" className="text-xs uppercase tracking-[0.4em] text-white/50">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                value={form.message}
                onChange={handleChange("message")}
                className={`mt-2 w-full rounded-2xl border bg-transparent px-4 py-3 text-white focus:border-accent-cyan focus:outline-none ${
                  errors.message ? "border-[#ff4d6d]" : "border-white/15"
                }`}
              />
              {errors.message && <p className="mt-1 text-sm text-[#ff4d6d]">{errors.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={status === "loading"}>
              {status === "loading" ? "Sending..." : "Send Message"}
            </Button>
            {status !== "idle" && (
              <div
                className={`flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm ${
                  status === "success"
                    ? "border-accent-cyan/40 text-accent-cyan"
                    : status === "loading"
                    ? "border-white/20 text-white/80"
                    : "border-[#ff4d6d]/60 text-[#ff4d6d]"
                }`}
              >
                {status === "success" ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : status === "loading" ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <AlertCircle className="h-5 w-5" />
                )}
                {status === "success"
                  ? "Thanks! I will reply shortly."
                  : status === "loading"
                  ? "Sending your message..."
                  : status === "validation-error"
                  ? "Please fix the highlighted fields and try again."
                  : "Something went wrong. Please try again later."}
              </div>
            )}
          </form>
        </Card>
        </motion.div>
      </div>
    </motion.section>
  );
}

