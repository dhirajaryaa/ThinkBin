import { SidebarTrigger } from "@/components/ui/sidebar";

export default function AppHeader({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className="flex items-center z-20 w-full sticky top-4 gap-2">
      <SidebarTrigger variant={"outline"} />
      <div className={`flex-1 w-full h-full ${className}`}>{children}</div>
    </header>
  );
}
