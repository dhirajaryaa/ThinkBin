import Logo from "@/components/common/Logo";

export default function DashboardPage() {
  return (
    <section className="bg-muted flex mt-20 flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Logo />
        <h1 className="text-2xl font-bold text-muted">Dashboard</h1>
      </div>
    </section>
  );
}
