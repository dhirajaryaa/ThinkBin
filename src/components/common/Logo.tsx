import Image from "next/image"
import Link from "next/link"

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
      src={"/thinkbin_logo.png"}
      alt="ThinkBin Logo"
      width={'40'}
      height={'40'}
      className="size-8 sm:size-10"
      />
      <h3 className="text-2xl sm:text-3xl font-bold tracking-wide">ThinkBin</h3>
    </Link>
  )
}

export default Logo
