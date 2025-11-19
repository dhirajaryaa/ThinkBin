import Image from "next/image";
import Link from "next/link";

function Logo({ variant,href='/' }: { variant?: string,href?:string }) {
  return (
    <Link href={href} className="flex items-center gap-2 justify-center">
      <Image
        src={"/thinkbin_logo.png"}
        alt="ThinkBin Logo"
        width={"40"}
        height={"40"}
        className={` ${variant === "sm" ? "size-7" : "size-8 sm:size-10"} `}
      />
      <h3
        className={` font-bold tracking-wide ${
          variant === "sm" ? "text-xl" : "text-2xl sm:text-3xl"
        } `}
      >
        ThinkBin
      </h3>
    </Link>
  );
}

export default Logo;
