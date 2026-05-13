import Heading2 from '../atoms/Heading2'
import Writing from '../atoms/Writing'

const LOGOS = [
  { src: '/clients/client-logo-1.svg', alt: 'Client logo 1' },
  { src: '/clients/client-logo-2.svg', alt: 'Client logo 2' },
  { src: '/clients/client-logo-3.svg', alt: 'Client logo 3' },
  { src: '/clients/client-logo-4.svg', alt: 'Client logo 4' },
  { src: '/clients/client-logo-5.svg', alt: 'Client logo 5' },
  { src: '/clients/client-logo-6.svg', alt: 'Client logo 6' },
  { src: '/clients/client-logo-3.svg', alt: 'Client logo 7' },
]

export default function Clients() {
  return (
    <section className="bg-surface py-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-10 items-center">
        <div className="flex flex-col gap-2 items-center text-center">
          <Heading2>Our Clients</Heading2>
          <Writing size="md" className="text-ink-soft">
            We have been working with some Fortune 500+ clients
          </Writing>
        </div>

        <div className="flex items-center justify-between w-full">
          {LOGOS.map((logo, i) => (
            <img key={i} src={logo.src} alt={logo.alt} className=" w-10 h-10" />
          ))}
        </div>
      </div>
    </section>
  )
}
