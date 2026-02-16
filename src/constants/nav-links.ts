import {
  LayoutDashboard,
  ShoppingBasket,
  PackagePlus,
  List,
  BadgeEuro,
} from "lucide-react";

export const NAV_LINKS = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Products",
    href: "/products",
    icon: ShoppingBasket,
  },
  {
    name: "New Product",
    href: "/products/new",
    icon: PackagePlus,
  },
  {
    name: "Categories",
    href: "/categories",
    icon: List,
  },
  {
    name: "Transactions",
    href: "/transactions",
    icon: BadgeEuro,
  },
];
