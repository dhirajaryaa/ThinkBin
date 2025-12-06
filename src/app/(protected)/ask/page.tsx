"use client";
import { AIChatCallout, ChatCallout } from "@/components/ask/ChatCallout";
import UserInput from "@/components/ask/UserInput";
import AppHeader from "@/components/common/AppHeader";
import { useState } from "react";

export default function DashboardPage() {
  const [llmAnswer, setLlmAnswer] = useState("");
  return (
    <>
      <AppHeader>
        <h1 className="text-xl font-bold">Ask Memories</h1>
      </AppHeader>
      <main className="w-full relative max-w-4xl mx-auto flex flex-col min-h-1/2 h-full">
        <section className="w-full h-full py-8 space-y-8">
          <ChatCallout message="who are you? and what task you want to perform" />
          <AIChatCallout message={llmAnswer} />
        </section>
        <UserInput llmAnswer={llmAnswer} setLlmAnswer={setLlmAnswer} />
      </main>
    </>
  );
}
