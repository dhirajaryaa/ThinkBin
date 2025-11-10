# 🧠 ThinkBin — Your AI-Powered Personal Knowledge Brain

**ThinkBin** helps you collect, organize, and recall everything you learn — from notes and PDFs to screenshots and web content — using **AI-powered semantic search**.

---

## 🚀 Features

* ✍️ **Add Notes** — Save text, code, PDFs, or screenshots.
* 🔍 **AI Search** — Find notes by meaning, not keywords.
* 🏷️ **Auto Tagging** — AI categorizes notes (e.g., *Next.js, caching, bugfix*).
* 🔗 **Context Linking** — Discover relationships between ideas.
* 📅 **Timeline & Insights** — Track what you learned over time.
* 📚 **Knowledge Cards** — Flashcard-style summaries for revision.

---

## 🧩 How It Works

1. You save content (text, images, PDFs, URLs).
2. AI extracts and chunks the text.
3. Embeddings are generated and stored in a vector database.
4. When you search, ThinkBin retrieves and summarizes the most relevant knowledge.

---

## ⚙️ Tech Stack

* **Frontend:** Next.js + TypeScript + shadcn/ui
* **AI / NLP:** OpenAI or Nomic Embeddings + Groq for LLM
* **Database:** Supabase (PostgreSQL + pgvector) or Qdrant
* **OCR:** Tesseract.js for text from images
* **Storage:** Supabase or local upload

---

## 🧠 Example Query

> “Find the Tailwind bug fix I saved last week.”
>
> ThinkBin retrieves your note, shows related topics, and explains the fix in context.

---

## 📂 Folder Structure (MVP)

```
/app
  /dashboard
  /notes
  /search
  /api
/lib
  /ai
  /embeddings
  /chunker
/components
  NoteCard.tsx
  UploadDropzone.tsx
  SearchBar.tsx
```

---

## 💡 Roadmap (MVP)

**Week 1:** Auth + Text Notes + Search
**Week 2:** OCR + Auto Tagging
**Week 3:** PDF Ingestion + Timeline
**Week 4:** Browser Extension + Weekly Digest

---

## 🧭 Vision

> “Your second brain — powered by AI, built for thinkers.”

ThinkBin helps developers, students, and creators **never lose context again**.
Store once. Recall forever.

