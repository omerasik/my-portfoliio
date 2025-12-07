"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems } from "@/lib/data";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";

export default function Navbar() {
  const [active, setActive] = useState<string>(navItems[0]?.href.replace("#", "") ?? "hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const handleMobileNavClick = (href: string) => {
    setMobileMenuOpen(false);
  };

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
          
          {/* Hamburger Menu Button */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="relative z-50 p-2 text-white/80 hover:text-white transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-gradient-to-b from-charcoal/95 to-onyx/95 backdrop-blur-xl border-l border-white/10 shadow-2xl z-50 md:hidden"
            >
              <div className="flex flex-col h-full pt-20 px-6 pb-8">
                {/* Navigation Links */}
                <nav className="flex-1 space-y-2">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleMobileNavClick(item.href)}
                      className={cn(
                        "block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300",
                        active === item.href.replace("#", "")
                          ? "text-white bg-gradient-to-r from-accent-pink/20 to-accent-cyan/20 border border-accent-cyan/30"
                          : "text-white/70 hover:text-white hover:bg-white/5"
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <span className={cn(
                          "w-1.5 h-1.5 rounded-full transition-all duration-300",
                          active === item.href.replace("#", "")
                            ? "bg-accent-cyan"
                            : "bg-white/30"
                        )} />
                        {item.label}
                      </span>
                    </motion.a>
                  ))}
                </nav>

                {/* Footer Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="pt-6 border-t border-white/10"
                >
                  <p className="text-xs text-white/40 text-center">
                    © 2024 Omer Faruk Asik
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
