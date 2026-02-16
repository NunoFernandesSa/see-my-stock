import Image from "next/image";
import { Button } from "../components/ui/button";
import Navbar from "../components/shared/Navbar";

export default function Home() {
  return (
    <>
      <header className="w-full h-16 flex items-center justify-center">
        <Navbar />
      </header>
      <main></main>
      <footer></footer>
    </>
  );
}
