import { Button } from '@heroui/react'
import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import Heading1 from '../atoms/Heading1'

export default function CTA() {
  return (
    <section className="bg-surface-soft py-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-8 text-center"
      >
        <Heading1 className="text-neutral-800 text-4xl lg:text-5xl max-w-2xl">
          Pellentesque suscipit fringilla libero eu.
        </Heading1>

        <a href="/register">
          <Button className="bg-brand hover:bg-brand-dark text-white font-medium text-base px-8 py-3.5 rounded-sm h-auto gap-2">
            Get a Demo <ArrowRight size={16} />
          </Button>
        </a>
      </motion.div>
    </section>
  )
}
