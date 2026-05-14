import { Button, Input } from '@heroui/react'
import { Send } from 'lucide-react'
import type { Variants } from 'motion/react'
import { motion } from 'motion/react'
import Writing from '../atoms/Writing'

const COMPANY_LINKS = [
  { label: 'About us', href: '#' },
  { label: 'Blog', href: '/#blog' },
  { label: 'Contact us', href: '#' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Testimonials', href: '/#community' },
]

const SUPPORT_LINKS = [
  { label: 'Help center', href: '#' },
  { label: 'Terms of service', href: '#' },
  { label: 'Legal', href: '#' },
  { label: 'Privacy policy', href: '#' },
  { label: 'Status', href: '#' },
]

const SOCIAL_ICONS = [
  { src: '/socialIcons/Social Icons.svg', alt: 'Instagram' },
  { src: '/socialIcons/Social Icons-1.svg', alt: 'Dribbble' },
  { src: '/socialIcons/Social Icons-2.svg', alt: 'Twitter' },
  { src: '/socialIcons/Social Icons-3.svg', alt: 'YouTube' },
]

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const colVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Footer() {
  return (
    <footer className="bg-neutral-800 text-neutral-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto] gap-12 lg:gap-20"
        >
          {/* Brand column */}
          <motion.div variants={colVariants} className="flex flex-col gap-6">
            <a href="/">
              <img
                src="/Logo.svg"
                alt="Nexcent"
                className="h-6 w-auto brightness-0 invert"
              />
            </a>
            <Writing size="sm" className="text-neutral-400">
              Copyright © {new Date().getFullYear()} Nexcent ltd.
              <br />
              All rights reserved
            </Writing>
            <div className="flex items-center gap-3 mt-2">
              {SOCIAL_ICONS.map((icon) => (
                <a
                  key={icon.alt}
                  href="#"
                  aria-label={icon.alt}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-neutral-600 hover:border-brand transition-colors"
                >
                  <img
                    src={icon.src}
                    alt={icon.alt}
                    className="w-full h-full"
                  />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Company column */}
          <motion.div variants={colVariants} className="flex flex-col gap-4">
            <h4 className="text-white font-semibold text-base">Company</h4>
            <ul className="flex flex-col gap-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support column */}
          <motion.div variants={colVariants} className="flex flex-col gap-4">
            <h4 className="text-white font-semibold text-base">Support</h4>
            <ul className="flex flex-col gap-3">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter column */}
          <motion.div variants={colVariants} className="flex flex-col gap-4">
            <h4 className="text-white font-semibold text-base">
              Stay up to date
            </h4>
            <div className="flex items-center gap-0">
              <Input
                type="email"
                placeholder="Your email address"
                className="w-56 h-10 bg-neutral-700 border border-neutral-600 rounded-l-md rounded-r-none text-sm text-white placeholder:text-neutral-400 focus-within:ring-0"
              />
              <Button
                isIconOnly
                className="h-10 w-10 min-w-10 bg-neutral-600 hover:bg-brand rounded-r-md rounded-l-none border border-neutral-600 border-l-0 transition-colors"
                aria-label="Subscribe"
              >
                <Send size={15} className="text-white" />
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}
