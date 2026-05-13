import RootLayout from '#/components/layout/RootLayout'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_landingPage')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  )
}
