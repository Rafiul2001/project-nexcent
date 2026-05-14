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

export default function Achievement() {
  return (
    <section className="bg-surface py-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16 lg:gap-24">
        {/* Illustration */}
        <motion.div
          variants={fadeSlide(-40)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="shrink-0 flex justify-center"
        >
          <img
            src="/rafiki.svg"
            alt="Pixelgrade story illustration"
            className="w-72 md:w-105 max-w-full"
          />
        </motion.div>

        {/* Text content */}
        <motion.div
          variants={fadeSlide(40)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col gap-6"
        >
          <Heading2 className="text-neutral-800">
            The unseen of spending three years at Pixelgrade
          </Heading2>
          <Writing size="md" className="text-ink-soft leading-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
            amet justo ipsum. Sed accumsan quam vitae est varius fringilla.
            Pellentesque placerat vestibulum lorem sed porta. Nullam mattis
            tristique iaculis. Nullam pulvinar sit amet risus pretium auctor.
            Etiam quis massa pulvinar, aliquam quam vitae, tempus sem. Donec
            elementum pulvinar odio.
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
