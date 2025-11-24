"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { navItems } from "@/lib/data";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";

export default function Navbar() {
  const [active, setActive] = useState<string>(navItems[0]?.href.replace("#", "") ?? "hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    navItems.forEach(({ href }) => {
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
        scrolled 
          ? "bg-gradient-to-b from-onyx/95 via-charcoal/90 to-onyx/95 backdrop-blur-2xl shadow-2xl shadow-accent-pink/10" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between">
          <motion.a 
            href="#hero" 
            className="flex items-center group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Logo className="w-12 h-12 transition-all duration-300 group-hover:scale-110" />
          </motion.a>
          
          <nav className="flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "relative text-sm font-medium transition-all duration-300 hover:text-white group",
                  active === item.href.replace("#", "") 
                    ? "text-white" 
                    : "text-white/60"
                )}
              >
                {item.label}
                <span className={cn(
                  "absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-accent-pink to-accent-cyan transition-all duration-300",
                  active === item.href.replace("#", "")
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                )} />
              </motion.a>
            ))}
          </nav>
        </div>
        
        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center justify-between">
          <a href="#hero" className="flex items-center">
            <Logo className="w-10 h-10 transition-all duration-300 hover:scale-110" />
          </a>
          
          <nav className="flex items-center space-x-4 overflow-x-auto scrollbar-hide">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "text-xs font-medium whitespace-nowrap transition-colors duration-300 px-2 py-1 rounded-md",
                  active === item.href.replace("#", "")
                    ? "text-white bg-white/10"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
