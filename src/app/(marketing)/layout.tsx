import Footer from "@/components/common/Footer";
import {Header} from "@/components/common/Header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)  {
    return (
        <main className="w-full container mx-auto min-h-screen max-w-5xl">
          <Header />
          {children}
          <Footer />
        </main>
    )
}