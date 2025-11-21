import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Logo from "./Logo";
import Link from "next/link";

// static page header
export function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-linear-to-b from-background via-background to-background/20 p-8 sm:px-12 hover:cursor-pointer">
      <nav className="flex items-center justify-between w-full">
        <Logo />
        <div className="space-x-8 sm:block hidden">
          <a
            href={"/#feature"}
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
            href={"/#pricing"}
            className="text-base font-normal hover:underline"
          >
            Pricing
          </Link>
        </div>
        <div className="space-x-4">
          <Button asChild>
            <Link href={"/login"}> Login</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
//! dash board header
export function DashboardHeader({
  children,
  title,
}: {
  children?: React.ReactNode;
  title: string;
}) {
  return (
    <header className="w-full flex items-center justify-between sticky z-50 bg-background top-0 right-0 left-0 py-4">
      <div className="flex items-center justify-start w-full">
        <SidebarTrigger className="md:hidden" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-6 md:hidden"
        />
        <div className="text-lg md:text-xl font-semibold flex-1">{title}</div>
      </div>
      {children}
    </header>
  );
}
