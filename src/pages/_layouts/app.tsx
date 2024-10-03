import { Outlet } from 'react-router-dom'

import { SiteHeader } from '@/components/site-header'

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col antialiased bg-background">
      <SiteHeader />

      <div className="container flex flex-1 flex-col gap-4 p-8 pt-6">
        <Outlet />
      </div>
    </div>
  )
}
