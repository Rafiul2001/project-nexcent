import { usePlans } from '#/hooks/usePlans'
import { Check, X } from 'lucide-react'
import type { Variants } from 'motion/react'
import { motion } from 'motion/react'
import { useState } from 'react'
import Heading2 from '../atoms/Heading2'
import Writing from '../atoms/Writing'

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' as const },
  },
}

const CURRENCY_SYMBOLS: Record<string, string> = {
  GBP: '£',
  USD: '$',
  EUR: '€',
  AUD: 'A$',
}

export default function Pricing() {
  const { data: plans } = usePlans()
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <section id="pricing" className="bg-surface-soft py-20">
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
            Simple, transparent pricing
          </Heading2>
          <Writing size="md" className="text-ink-soft leading-6">
            No hidden fees. Cancel anytime. Pick the plan that fits your
            community.
          </Writing>
        </motion.div>

        {/* Billing toggle */}
        <div className="flex items-center gap-1 bg-white rounded-full p-1 shadow-sm">
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
              !isAnnual
                ? 'bg-brand text-white'
                : 'text-ink-soft hover:text-neutral-700'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 flex items-center gap-1.5 ${
              isAnnual
                ? 'bg-brand text-white'
                : 'text-ink-soft hover:text-neutral-700'
            }`}
          >
            Annually
            <span
              className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${
                isAnnual ? 'bg-white/20 text-white' : 'bg-brand/10 text-brand'
              }`}
            >
              save 20%
            </span>
          </button>
        </div>

        {/* Plan cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full items-stretch"
        >
          {(plans ?? []).map((plan) => {
            const price = isAnnual ? plan.price.annually : plan.price.monthly
            const symbol =
              CURRENCY_SYMBOLS[plan.price.currency] ?? plan.price.currency

            return (
              <motion.div
                key={plan.id}
                variants={cardVariants}
                className="flex flex-col"
              >
                <div
                  className={`relative flex flex-col gap-6 rounded-xl p-8 h-full bg-white ${
                    plan.isPopular
                      ? 'border-2 border-brand shadow-[0px_8px_24px_rgba(74,108,247,0.15)]'
                      : 'shadow-[0px_2px_4px_rgba(171,190,209,0.2)]'
                  }`}
                >
                  {plan.isPopular && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand text-white text-xs font-semibold px-4 py-1 rounded-full whitespace-nowrap">
                      Most Popular
                    </span>
                  )}

                  {/* Plan name & tagline */}
                  <div className="flex flex-col gap-1">
                    <h3 className="font-bold text-xl text-neutral-800">
                      {plan.name}
                    </h3>
                    <Writing size="sm" className="text-ink-soft">
                      {plan.tagline}
                    </Writing>
                  </div>

                  {/* Price */}
                  <div className="flex items-end gap-1">
                    {plan.isFree ? (
                      <span className="font-bold text-4xl text-neutral-800">
                        Free
                      </span>
                    ) : (
                      <>
                        <span className="font-bold text-4xl text-neutral-800">
                          {symbol}
                          {price}
                        </span>
                        <span className="text-ink-soft text-sm mb-1.5">
                          /mo
                        </span>
                      </>
                    )}
                  </div>

                  {/* Features list */}
                  <ul className="flex flex-col gap-3 flex-1">
                    {plan.features.map((feature) => (
                      <li
                        key={feature.label}
                        className="flex items-center gap-3"
                      >
                        {feature.included ? (
                          <Check size={16} className="text-brand shrink-0" />
                        ) : (
                          <X size={16} className="text-gray-300 shrink-0" />
                        )}
                        <Writing
                          size="sm"
                          className={
                            feature.included
                              ? 'text-neutral-700'
                              : 'text-ink-soft'
                          }
                        >
                          {feature.label}
                        </Writing>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href={plan.ctaHref}
                    className={`w-full rounded-sm font-medium text-base py-3.5 text-center transition-colors duration-200 ${
                      plan.isPopular
                        ? 'bg-brand hover:bg-brand-dark text-white'
                        : 'border border-brand text-brand hover:bg-brand-tint-5'
                    }`}
                  >
                    {plan.cta}
                  </a>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
