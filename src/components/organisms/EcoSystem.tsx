import { Card, CardContent } from '@heroui/react'
import Heading2 from '../atoms/Heading2'
import Heading3 from '../atoms/Heading3'
import Writing from '../atoms/Writing'

const CARDS = [
  {
    icon: '/ecosystem/Icon.svg',
    title: 'Membership Organisations',
    description:
      'Our membership management software provides full automation of membership renewals and payments',
  },
  {
    icon: '/ecosystem/Icon-1.svg',
    title: 'National Associations',
    description:
      'Our membership management software provides full automation of membership renewals and payments',
  },
  {
    icon: '/ecosystem/Icon-2.svg',
    title: 'Clubs And Groups',
    description:
      'Our membership management software provides full automation of membership renewals and payments',
  },
]

export default function EcoSystem() {
  return (
    <section className="bg-surface py-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-16">
        <div className="flex flex-col items-center text-center gap-3">
          <Heading2 className="text-neutral-800 text-center">
            Manage your entire community
            <br />
            in a single system
          </Heading2>
          <Writing size="md" className="text-ink-soft">
            Who is Nextcent suitable for?
          </Writing>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {CARDS.map((card) => (
            <Card
              key={card.title}
              className="mx-auto w-full shadow-[0px_2px_4px_rgba(171,190,209,0.2)]"
            >
              <CardContent className="flex flex-col items-center text-center gap-2 px-8 py-6">
                <div className="flex flex-col items-center gap-4">
                  <img
                    src={card.icon}
                    alt=""
                    className="w-16.25 h-14 shrink-0"
                  />
                  <Heading3 className="font-bold text-[28px] leading-9 text-neutral-600">
                    {card.title}
                  </Heading3>
                </div>
                <Writing size="sm" className="text-ink-soft leading-5">
                  {card.description}
                </Writing>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
