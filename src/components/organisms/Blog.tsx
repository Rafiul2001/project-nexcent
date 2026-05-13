import { Card } from '@heroui/react'
import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import Heading2 from '../atoms/Heading2'
import Heading3 from '../atoms/Heading3'
import Writing from '../atoms/Writing'

const POSTS = [
  {
    image: '/blogImage/image 18.png',
    title: 'Creating Streamlined Safeguarding Processes with OneRen',
  },
  {
    image: '/blogImage/image 19.png',
    title:
      'What are your safeguarding responsibilities and how can you manage them?',
  },
  {
    image: '/blogImage/image 20.png',
    title: 'Revamping the Membership Model with Triathlon Australia',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

export default function Blog() {
  return (
    <section className="bg-surface py-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col items-center text-center gap-3 max-w-2xl"
        >
          <Heading2 className="text-neutral-800">
            Caring is the new marketing
          </Heading2>
          <Writing size="md" className="text-ink-soft leading-6">
            The Nexcent blog is the best place to read about the latest
            membership insights, trends and more. See who's joining the
            community, read about how our community are increasing their
            membership income and lot's more.
          </Writing>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-20 md:gap-8 w-full"
        >
          {POSTS.map((post) => (
            <motion.div
              key={post.title}
              variants={cardVariants}
              className="flex flex-col"
            >
              <Card className="rounded-xl overflow-visible shadow-[0px_2px_4px_rgba(171,190,209,0.2)] group p-0">
                <div className="relative h-80">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Content overlay — absolute at the bottom of the image */}
                  <div className="absolute -bottom-10 left-4 right-4 bg-white rounded-xl px-6 py-5 flex flex-col items-center text-center gap-3 shadow-sm">
                    <Heading3 className="font-semibold text-base leading-snug text-neutral-800">
                      {post.title}
                    </Heading3>
                    <a
                      href="#"
                      className="flex items-center gap-1.5 text-brand font-semibold text-sm hover:underline"
                    >
                      Readmore <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
