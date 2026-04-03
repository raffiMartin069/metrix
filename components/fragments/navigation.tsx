import React from 'react'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";

export default function Navigation() {
    return (
        <nav className="border-b bg-linear-to-r from-blue-50 to-purple-50 p-4">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <p className="font-semibold text-2xl bg-clip-text text-foreground">metrix</p>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </nav>
    )
}
