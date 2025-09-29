import * as React from "react"
import {
  IconCamera,
  IconDashboard,
  IconFileAi,
  IconFileDescription,
  IconBook,
  IconBook2,
  IconBooks,
} from "@tabler/icons-react"

import { NavMain } from "@/components/dashboard/sidebar/nav-main"
import { NavUser } from "@/components/dashboard/sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { AuthContext } from "@/context/AuthContext"
import avatarDefault from '@/assets/avatar.jpg'

import QuintLogoWhiteBG from '@/assets/quint-logos/quint-logo-whitebg.png'


const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Libro Diario",
      url: "/libro-diario",
      icon: IconBook,
    },
    {
      title: "Libro Mayor",
      url: "/mayorizacion",
      icon: IconBook2,
    },
    {
      title: "Catálogo de Cuentas",
      url: "/catalogo-cuentas",
      icon: IconBooks,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  // navSecondary: [
  //   {
  //     title: "Settings",
  //     url: "#",
  //     icon: IconSettings,
  //   },
  //   {
  //     title: "Get Help",
  //     url: "#",
  //     icon: IconHelp,
  //   },
  //   {
  //     title: "Search",
  //     url: "#",
  //     icon: IconSearch,
  //   },
  // ],
  // documents: [
  //   {
  //     name: "Data Library",
  //     url: "#",
  //     icon: IconDatabase,
  //   },
  //   {
  //     name: "Reports",
  //     url: "#",
  //     icon: IconReport,
  //   },
  //   {
  //     name: "Word Assistant",
  //     url: "#",
  //     icon: IconFileWord,
  //   },
  // ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  // Obtener datos del usuario desde el contexto de autenticación y pasarlos como objeto a la navbar
  const session = React.useContext(AuthContext).session;
  const userData = {
    // Default values
    name: 'usuario',
    email: 'email',
    avatar: avatarDefault
  }

  if (session?.user) {
    userData.email = session.user.email || userData.email;
    if (session.user.user_metadata && session.user.user_metadata.full_name) {
      userData.name = session.user.user_metadata.full_name;
    }
    if (session.user.user_metadata && session.user.user_metadata.avatar_url) {
      userData.avatar = session.user.user_metadata.avatar_url;
    }
  }



  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="">
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!py-6"
            >
              <a href="/dashboard">
                <img src={QuintLogoWhiteBG} alt="logo" width={130} style={{ borderRadius: '8px' }}/>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  )
}
