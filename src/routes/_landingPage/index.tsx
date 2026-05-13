import Achievement from '#/components/organisms/Achievement'
import Banner from '#/components/organisms/Banner'
import Blog from '#/components/organisms/Blog'
import Clients from '#/components/organisms/Clients'
import EcoSystem from '#/components/organisms/EcoSystem'
import FooterPromo from '#/components/organisms/FooterPromo'
import Stats from '#/components/organisms/Stats'
import Testimonial from '#/components/organisms/Testimonial'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_landingPage/')({ component: App })

function App() {
  return (
    <>
      <Banner />
      <Clients />
      <EcoSystem />
      <Achievement />
      <Stats />
      <FooterPromo />
      <Testimonial />
      <Blog />
    </>
  )
}
