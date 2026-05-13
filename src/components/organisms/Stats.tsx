import type { Variants } from 'motion/react'
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from 'motion/react'
import { useEffect, useRef } from 'react'
import Heading2 from '../atoms/Heading2'
import Writing from '../atoms/Writing'

const STATS = [
  { icon: '/stats/Icon.svg', value: 2245341, label: 'Members' },
  { icon: '/stats/Icon-1.svg', value: 46328, label: 'Clubs' },
  { icon: '/stats/Icon-2.svg', value: 828867, label: 'Event Bookings' },
  { icon: '/stats/Icon-3.svg', value: 1926436, label: 'Payments' },
]

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' as const },
  },
}

function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const motionValue = useMotionValue(0)
  const display = useTransform(motionValue, (v) =>
    Math.round(v).toLocaleString('en-US'),
  )

  useEffect(() => {
    if (!isInView) return
    const controls = animate(motionValue, value, {
      duration: 2,
      ease: 'easeOut',
    })
    return controls.stop
  }, [isInView, motionValue, value])

  return <motion.span ref={ref}>{display}</motion.span>
}

export default function Stats() {
  return (
    <section className="bg-surface-soft py-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16 lg:gap-24">
        {/* Left: heading */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
          className="flex-1 flex flex-col gap-3"
        >
          <Heading2 className="lg:text-5xl leading-tight">
            Helping a local{' '}
            <span className="text-brand block">business reinvent itself</span>
          </Heading2>
          <Writing size="md" className="text-ink-soft">
            We reached here with our hard work and dedication
          </Writing>
        </motion.div>

        {/* Right: stats grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="flex-1 grid grid-cols-2 gap-x-16 gap-y-8 shrink-0"
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="flex items-center gap-4"
            >
              <img src={stat.icon} alt="" className="w-7 h-7 md:w-10 md:h-10 shrink-0" />
              <div className="flex flex-col">
                <span className="font-bold text-lg md:text-2xl leading-7 md:leading-8 text-neutral-800">
                  <CountUp value={stat.value} />
                </span>
                <Writing size="sm" className="text-ink-soft">
                  {stat.label}
                </Writing>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
