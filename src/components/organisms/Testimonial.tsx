import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import { CLIENT_LOGOS } from '../atoms/ClientLogos'
import Writing from '../atoms/Writing'

const fadeSlide = (x: number) => ({
  hidden: { opacity: 0, x },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: 'easeOut' as const },
  },
})

export default function Testimonial() {
  return (
    <section className="bg-surface-soft py-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16 lg:gap-24">
        {/* Customer image card */}
        <motion.div
          variants={fadeSlide(-40)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="shrink-0"
        >
          <div
            className=" rounded-lg overflow-hidden shrink-0"
            style={{ boxShadow: '0px 8px 16px rgba(171, 190, 209, 0.4)' }}
          >
            <img
              src="/customersImage.png"
              alt="Customer"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          variants={fadeSlide(40)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col gap-6 flex-1"
        >
          <Writing size="md" className="text-ink-soft leading-6">
            Maecenas dignissim justo eget nulla rutrum molestie. Maecenas
            lobortis sem dui, vel rutrum risus tincidunt ullamcorper. Proin eu
            enim metus. Vivamus sed libero ornare, tristique quam in, gravida
            enim. Nullam ut molestie arcu, at hendrerit elit. Morbi laoreet elit
            at ligula molestie, nec molestie mi blandit. Suspendisse cursus
            tellus sed augue ultrices, quis tristique nulla sodales. Suspendisse
            eget lorem eu turpis vestibulum pretium. Suspendisse potenti.
            Quisque malesuada enim sapien, vitae placerat ante feugiat eget.
            Quisque vulputate odio neque, eget efficitur libero condimentum id.
            Curabitur id nibh id sem dignissim finibus ac sit amet magna.
          </Writing>

          <div className="flex flex-col gap-0.5">
            <span className="font-bold text-xl text-brand">Tim Smith</span>
            <Writing size="sm" className="text-ink-soft">
              British Dragon Boat Racing Association
            </Writing>
          </div>

          {/* Logo strip */}
          <div className="flex items-center gap-1 flex-wrap">
            {CLIENT_LOGOS.map((Logo, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.05 }}
                className="p-3 rounded-lg transition-colors duration-200 hover:bg-brand-tint-5 cursor-pointer"
              >
                <Logo className="h-6 w-auto" />
              </motion.button>
            ))}

            <a
              href="#"
              className="ml-auto flex items-center gap-1.5 text-brand font-semibold text-sm whitespace-nowrap hover:underline"
            >
              Meet all customers
              <ArrowRight size={14} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
