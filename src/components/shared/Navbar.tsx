"use client";

// React/Next
import { JSX, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Constants
import { NAV_LINKS } from "@/src/constants/nav-links";

// Components
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";

// Utils
import { cn } from "@/lib/utils";

// Icons
import { Menu, X } from "lucide-react";

/**
 * Navbar component.
 *
 * Displays a responsive navigation bar with links to different pages of the app.
 * On mobile devices, it displays a dropdown menu with the same links.
 *
 * @returns {JSX.Element} A JSX element representing the navigation bar.
 */
export default function Navbar(): JSX.Element {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-2">
      <div className="flex items-center justify-between">
        {/* logo */}
        <span className="text-xl font-bold text-gray-600">SeeMyStock</span>

        {/* desktop navbar */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem className="flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                const isActiveRoute =
                  pathname.startsWith(link.href) && link.href !== "/";

                return (
                  <NavigationMenuLink asChild key={link.href}>
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

        {/* mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden cursor-pointer"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* mobile navbar - dropdown menu */}
      {isMobileMenuOpen && (
        <div className="absolute left-0 right-0 top-14 z-50 mx-auto w-full bg-white shadow-lg md:hidden">
          <nav className="container mx-auto flex flex-col px-4 py-4">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              const isActiveRoute =
                pathname.startsWith(link.href) && link.href !== "/";

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-all",
                    "hover:bg-gray-50 active:bg-gray-100",
                    isActive || isActiveRoute
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5",
                      isActive || isActiveRoute
                        ? "text-blue-600"
                        : "text-gray-500",
                    )}
                  />
                  <span className="flex-1">{link.name}</span>

                  {/* active page indicator for mobile */}
                  {(isActive || isActiveRoute) && (
                    <span className="h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      )}

      {/* overlay to close mobile menu on click outside */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 md:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
