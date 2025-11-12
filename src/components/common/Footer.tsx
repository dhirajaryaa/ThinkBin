import { Badge } from "@/components/ui/badge";
import { links } from "@/data/links";
import Link from "next/link";

function Footer() {
  return (
    <footer className="w-full border-t border-muted px-8 sm:px-12 py-8">
      <nav className="mb-8 flex gap-4 items-center w-full justify-center flex-wrap">
        {links.map((link,index) => (
          <Badge
            className="text-xs sm:text-sm sm:px-4 font-normal"
            variant={"secondary"}
            key={index}
            asChild
          >
            <Link href={link.href}>
              {link.title}
            </Link>
          </Badge>
        ))}
      </nav>
      <p className="text-sm sm:text-base text-muted-foreground text-center">
        &copy; {new Date().getFullYear()} ThinkBin. All rights reserved.
      </p>
      <div className="w-full tracking-wide py-8 text-5xl sm:text-7xl lg:text-9xl font-black text-center text-foreground/20 select-none uppercase font-serif">
        Think Bin
      </div>
      <p className="text-sm sm:text-base text-muted-foreground text-center">
        Build and ❤️ by
        <a
          href="https://github.com/dhirajaryaa"
          target="_blank"
          referrerPolicy="no-referrer"
          className="ml-1 underline font-medium text-foreground"
        >
          DhirajArya
        </a>
      </p>
    </footer>
  );
}

export default Footer;
