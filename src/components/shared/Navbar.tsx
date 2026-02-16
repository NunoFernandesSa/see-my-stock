"use client";

// React/Next
import { JSX } from "react";
import Link from "next/link";

// Constants
import { NAV_LINKS } from "@/src/constants/nav-links";

// Components
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function Navbar(): JSX.Element {
  const pathname = usePathname();
  return (
    <div className="container mx-auto flex items-center justify-between px-4 py-2">
      {/* logo */}
      <div className="text-xl font-bold">SeeMyStock</div>
      {/* navbar */}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem className="flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              const isActiveRoute =
                pathname.startsWith(link.href) && link.href !== "/";

              return (
                <NavigationMenuLink
                  asChild
                  key={link.href}
                  className="flex flex-row"
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "group relative flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all",
                      "hover:bg-gray-100",
                      isActive || isActiveRoute
                        ? "text-blue-600"
                        : "text-gray-600 hover:text-gray-900",
                    )}
                  >
                    {/* Indicateur actif - ligne en dessous */}
                    {(isActive || isActiveRoute) && (
                      <span className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 bg-blue-600" />
                    )}

                    <Icon
                      className={cn(
                        "h-4 w-4 transition-transform",
                        isActive || isActiveRoute
                          ? "text-blue-600"
                          : "text-gray-400",
                      )}
                    />
                    {link.name}
                  </Link>
                </NavigationMenuLink>
              );
            })}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
