import { IconCirclePlusFilled, type Icon } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { NuevoAsientoForm } from "@/components/dashboard/modals/nuevo-asiento.modal"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
}) {

  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl w-full h-[90vh] p-0 overflow-auto" style={{ scrollbarWidth: 'none', minWidth: '45%' }}>
          <NuevoAsientoForm setOpen={setOpen} />
        </DialogContent>
      </Dialog>

      <SidebarGroup>
        <SidebarGroupContent className="flex flex-col gap-2">
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center gap-2">
              <SidebarMenuButton
                tooltip="Quick Create"
                className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
                onClick={() => setOpen(true)}
              >
                <IconCirclePlusFilled />
                <span>Registrar Asiento</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton tooltip={item.title} onClick={() => navigate(item.url)}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  )
}
