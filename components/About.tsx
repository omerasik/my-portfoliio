"use client";

import { motion } from "framer-motion";
import { Code2, Coffee, Lightbulb, Rocket, Users, Zap } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import { languages } from "@/lib/data";

const values = [
  {
    icon: Rocket,
    title: "Shipping Products",
    description: "I love turning ideas into real products that people actually use and benefit from."
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Great software is built together. I enjoy working with others, sharing ideas, and learning as a team."
  },
  {
    icon: Lightbulb,
    title: "Problem Solving",
    description: "My science background helps me break problems into pieces, experiment, and find solutions that make sense."
  },
  {
    icon: Zap,
    title: "Automation",
    description: "I like using AI and automation to make work easier, smarter, and way faster."
  },
  {
    icon: Code2,
    title: "Clean Code",
    description: "Readable, maintainable code feels good and makes building things much more enjoyable."
  },
  {
    icon: Coffee,
    title: "Continuous Learning",
    description: "Technology moves fast. Staying curious and learning by building keeps me excited about what's next."
  }
];

export default function About() {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.3 }}
      className="section-padding space-y-10"
    >
      <SectionHeader
        eyebrow="About"
        title="About Me"
        description="A motivated full-stack developer in training who enjoys exploring new technologies and building practical solutions for real users."
      />

      {/* Main Story Card */}
      <Card className="p-8">
        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-white/80">
            I&apos;m especially interested in how modern tools like <span className="text-accent-cyan">AI and automation</span> can improve
            digital workflows, simplify everyday tasks, and help create more efficient applications. My background in{" "}
            <span className="text-accent-cyan">science and mathematics</span> shaped the way I analyze problems, think critically, and
            approach challenges with curiosity.
          </p>
          <p className="text-lg leading-relaxed text-white/80">
            Today, I design and build <span className="text-accent-pink">full-stack applications</span> using modern web technologies. I
            focus on choosing the right solution for each project, learning through real work, and improving my skills with{" "}
            <span className="text-accent-cyan">hands-on practice and collaboration</span>.
          </p>
          <p className="text-lg leading-relaxed text-white/80">
            When I&apos;m not coding, I&apos;m usually exploring new technologies, experimenting with side projects, or enjoying a good cup
            of coffee while reading about the latest web trends.
          </p>
        </div>

        {/* Languages */}
        <div className="mt-8 border-t border-white/10 pt-8">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-white/50">Languages I Speak</p>
          <div className="flex flex-wrap gap-3">
            {languages.map((language) => (
              <motion.span
                key={language}
                whileHover={{ scale: 1.05, y: -2 }}
                className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-sm"
              >
                {language}
              </motion.span>
            ))}
          </div>
        </div>
      </Card>

      {/* Values Grid */}
      <div>
        <h3 className="mb-6 text-center font-display text-2xl text-white sm:text-3xl">What Drives Me</h3>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group h-full p-6 transition-all duration-200 hover:border-accent-cyan/40">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan transition-all duration-200 group-hover:border-accent-cyan/50 group-hover:bg-accent-cyan/20">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h4 className="mb-2 font-display text-lg text-white">{value.title}</h4>
                  <p className="text-sm leading-relaxed text-white/70">{value.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
