import { Grid2X2, LayoutList, Search, Settings, SquarePen, UserCircle2 } from "lucide-react";

export const sidebarLinks = [
    { title: "Dashboard", href: "/dashboard", icon: Grid2X2 },
    { title: "Ask", href: "/ask", icon: Search },
    { title: "Notes", href: "/notes", icon: LayoutList },
    { title: "Create", href: "/notes/create", icon: SquarePen },
    { title: "Profile", href: "/profile", icon: UserCircle2 },
    { title: "Settings", href: "/settings", icon: Settings },
]