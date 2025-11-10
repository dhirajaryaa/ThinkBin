import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import Link from "next/link";

function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-gradient-to-b from-background via-background to-background/20 p-8 sm:px-12 hover:cursor-pointer">
      <nav className="flex items-center justify-between w-full">
        <Logo />
        <div className="space-x-8 sm:block hidden">
          <a
            href={"#feature"}
            className="text-base font-normal hover:underline"
          >
            Features
          </a>
          <Link
            href={"/about"}
            className="text-base font-normal hover:underline"
          >
            About
          </Link>
          <Link
            href={"#pricing"}
            className="text-base font-normal hover:underline"
          >
            Pricing
          </Link>
        </div>
        <div className="space-x-4">
        <Button asChild>
          <Link href={"/signin"}> SignIn
          </Link>
        </Button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
