import { Button } from '@heroui/react'
import { Link } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import type { Variants } from 'motion/react'
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import { useState } from 'react'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Feature', href: '#feature' },
  { label: 'Community', href: '#community' },
  { label: 'Blog', href: '#blog' },
  { label: 'Pricing', href: '#pricing' },
]

const menuVariants: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.25,
      ease: 'easeOut',
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.22, ease: 'easeOut' },
  },
  exit: { opacity: 0, x: -16, transition: { duration: 0.15 } },
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()
  const shadow = useTransform(
    scrollY,
    [0, 40],
    ['0 0 0 0 transparent', '0 2px 16px 0 rgba(0,0,0,0.08)'],
  )

  return (
    <motion.header
      style={{ boxShadow: shadow }}
      className="sticky top-0 z-50 w-full bg-surface-soft border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Logo */}
        <a href="/" className="shrink-0">
          <img src="/Logo.svg" alt="Nexcent" className="h-6 w-auto" />
        </a>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-ink text-sm font-medium hover:text-brand transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/login">
            <Button
              variant="outline"
              className="border-brand text-brand font-semibold text-sm px-6 rounded-md"
            >
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button className="bg-brand text-surface font-semibold text-sm px-6 rounded-md hover:bg-brand-dark">
              Sign up
            </Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <Button
          variant="ghost"
          isIconOnly
          className="md:hidden text-ink"
          onPress={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </Button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden overflow-hidden bg-surface-soft border-t border-border"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  variants={itemVariants}
                  className="text-ink text-base font-medium py-2 hover:text-brand transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.div
                variants={itemVariants}
                className="flex flex-col gap-3 pt-3 mt-1 border-t border-border"
              >
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full border-brand text-brand font-semibold rounded-md"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full bg-brand text-surface font-semibold rounded-md">
                    Sign up
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
