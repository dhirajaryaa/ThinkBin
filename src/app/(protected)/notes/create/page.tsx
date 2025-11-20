import { DashboardHeader } from "@/components/common/Header";

export default function CreateNotePage() {
  return (
    <section className="w-full min-h-svh p-4 sm:px-6 ">
      <DashboardHeader title="Capture Memories" />
      <div className="w-full h-[90vh] overflow-auto pt-12 "></div>
    </section>
  );
}
