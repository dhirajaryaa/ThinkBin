import type { Metadata } from "next";
import "@/app/globals.css";
import  {Inter} from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ThinkBin — Your AI-Powered Second Brain",
  description:
    "ThinkBin helps you store, organize, and rediscover everything you learn — from code snippets to YouTube notes. Powered by AI, embeddings, and semantic search.",
  applicationName: "ThinkBin",
  authors: [{ name: "Dhiraj Arya", url: "https://github.com/dhirajaryaa" }],
  keywords: [
    "AI notes app",
    "Second Brain",
    "Personal Knowledge Management",
    "Semantic Search",
    "Next.js",
    "pgvector",
    "ThinkBin",
    "AI productivity tool",
    "Knowledge graph",
  ],
  creator: "Dhiraj Arya",
  publisher: "ThinkBin",
  category: "Productivity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
