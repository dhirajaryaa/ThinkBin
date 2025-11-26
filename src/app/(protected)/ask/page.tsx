import { ChatCallout } from "@/components/ask/ChatCallout";
import UserInput from "@/components/ask/UserInput";
import AppHeader from "@/components/common/AppHeader";

export default function DashboardPage() {
  return (
    <>
      <AppHeader>
        <h1 className="text-xl font-bold">Ask Memories</h1>
      </AppHeader>
      <main className="w-full relative max-w-4xl mx-auto">
        <section className="w-full h-full py-8 space-y-8">
          <ChatCallout
            message="who are you? and what task you want to perform"
          />
          <ChatCallout
            message="who are you? and what task you want to perform"
          />
        </section>

        <UserInput />
      </main>
    </>
  );
}
