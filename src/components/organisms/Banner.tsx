import { Button } from '@heroui/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import Heading1 from '../atoms/Heading1'
import Writing from '../atoms/Writing'

const SLIDES = [
  {
    headline: 'Lessons and insights ',
    accent: 'from 8 years',
    subtitle:
      'Where to grow your business as a photographer: site or social media?',
  },
  {
    headline: 'Build and grow your ',
    accent: 'online presence',
    subtitle:
      'Empower your brand with tools that make digital growth simple and effective.',
  },
  {
    headline: 'Connect with a ',
    accent: 'thriving community',
    subtitle:
      'Join thousands of creators and professionals sharing knowledge and growing together.',
  },
  {
    headline: 'Start your journey ',
    accent: 'to success today',
    subtitle:
      'Get the insights, tools, and community you need to take your business further.',
  },
]

export default function Banner() {
  return (
    <section id="home" className="bg-surface-soft w-full">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        className="banner-swiper"
      >
        {SLIDES.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center gap-16 lg:gap-26">
              <div className="flex-1 flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <Heading1>
                    {slide.headline}
                    <span className="text-brand">{slide.accent}</span>
                  </Heading1>
                  <Writing size="md" className="text-ink-soft max-w-md">
                    {slide.subtitle}
                  </Writing>
                </div>
                <a href="/register">
                  <Button className="bg-brand hover:bg-brand-dark text-white font-medium text-base px-8 py-3.5 rounded-sm w-fit h-auto">
                    Register
                  </Button>
                </a>
              </div>
              <div className="shrink-0">
                <img
                  src="/bannerimage.svg"
                  alt="Banner illustration"
                  className="w-80 md:w-97.75 max-w-full"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
