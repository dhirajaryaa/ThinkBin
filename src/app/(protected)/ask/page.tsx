"use client";
import { AIChatCallout, ChatCallout } from "@/components/ask/ChatCallout";
import UserInput from "@/components/ask/UserInput";
import AppHeader from "@/components/common/AppHeader";
import { useState } from "react";

export interface chatData {
  content: string;
  role: string;
}

export default function DashboardPage() {
  const [llmAnswer, setLlmAnswer] = useState<chatData[]>([]);
  return (
    <>
      <AppHeader>
        <h1 className="text-xl font-bold">Ask Memories</h1>
      </AppHeader>
      <main className="w-full relative max-w-4xl mx-auto flex flex-col">
        <section className="w-full h-full py-8 space-y-8">
          {llmAnswer?.map((item,index) => {
            return item.role === "user" ? (
              <ChatCallout message={item?.content} key={index}/>
            ) : (
              <AIChatCallout message={item?.content} key={index}/>
            );
          })}
        </section>
        {/* form  */}
        <UserInput setLlmAnswer={setLlmAnswer} />
      </main>
    </>
  );
}
