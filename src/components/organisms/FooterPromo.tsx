import { Button } from '@heroui/react'
import type { Variants } from 'motion/react'
import { motion } from 'motion/react'
import Heading2 from '../atoms/Heading2'
import Writing from '../atoms/Writing'

const fadeSlide = (x: number): Variants => ({
  hidden: { opacity: 0, x },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: 'easeOut' as const },
  },
})

export default function FooterPromo() {
  return (
    <section className="bg-white-soft py-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16 lg:gap-24">
        {/* Illustration */}
        <motion.div
          variants={fadeSlide(-40)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex-1 flex justify-center"
        >
          <img
            src="/pana.svg"
            alt="Footer design illustration"
            className="w-72 md:w-full"
          />
        </motion.div>

        {/* Text content */}
        <motion.div
          variants={fadeSlide(40)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex-2 flex flex-col gap-6"
        >
          <Heading2 className="text-neutral-800">
            How to design your site footer like we did
          </Heading2>
          <Writing size="md" className="text-ink-soft leading-6">
            Donec a eros justo. Fusce egestas tristique ulrices. Nam tempor,
            augue nec tincidunt molestie, massa nunc varius arcu, at scelerisque
            elit erat a magna. Donec quis erat at libero ultrices mollis. In hac
            habitasse platea dictumst. Vivamus vehicula leo dui, at porta nisi
            facilisis finibus. In euismod augue vitae nisi ultricies, non
            aliquet urna tincidunt. Integer in nisi eget nulla commodo faucibus
            efficitur quis massa. Praesent felis est, finibus et nisi ac,
            hendrerit venenatis libero. Donec consectetur faucibus ipsum id
            gravida.
          </Writing>
          <a href="#feature">
            <Button className="bg-brand hover:bg-brand-dark text-white font-medium text-base px-8 py-3.5 rounded-sm w-fit h-auto">
              Learn More
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
