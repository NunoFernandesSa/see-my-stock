import { LogoProps } from "@/src/types/logo-types";
import Link from "next/link";
import { JSX } from "react";

/**
 * A component that displays the logo of the app. It is a link to the homepage.
 *
 * @param {LogoProps} props - The props of the component.
 * @returns {JSX.Element} A JSX element representing the logo.
 */
export default function Logo({ href = "/" }: LogoProps): JSX.Element {
  return (
    <Link href={href} className="text-xl font-bold text-gray-600">
      SeeMyStock
    </Link>
  );
}
