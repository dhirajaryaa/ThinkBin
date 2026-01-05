import AppHeader from "@/components/common/AppHeader";

export default function DashboardPage() {
  return (
    <>
    <AppHeader>
      <h1 className="text-xl font-bold">Dashboard</h1>
    </AppHeader>
    <main className="w-full relative">
      <div className="w-full tracking-wide py-8 text-4xl xs:text-5xl sm:text-7xl lg:text-9xl font-black text-center text-foreground/20 select-none uppercase font-serif my-30">
        DashBoard
      </div>
    </main>
    </>
  );
}
