"use client";
import { useState, useEffect, useRef } from "react";

export function ChatBot({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      containerRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!isOpen) return null;

  const sendMessage = async () => {
  const trimmed = input.trim();
  if (!trimmed) return;

  setMessages([...messages, { role: "user", content: trimmed }]);
  setInput("");

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: trimmed }),
    });

    // 👇 Log to check status or content type mismatch
    if (!res.ok) {
      const text = await res.text(); // ← try parsing as plain text
      throw new Error(`Server responded with ${res.status}: ${text}`);
    }

    const data = await res.json();
    setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
  } catch (err) {
    console.error("Fetch failed:", err);
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "⚠️ BryBot hit a snag: " + err.message },
    ]);
  }
};

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-6 w-full max-w-md bg-black/90 text-white border border-purple-600 p-4 rounded-xl shadow-2xl z-50"
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-bold text-lg">BryBot 🤖</h2>
        <button onClick={onClose} className="text-purple-300 hover:text-white text-sm">
          ✖
        </button>
      </div>

      <div className="max-h-64 overflow-y-auto space-y-2 mb-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded ${
              msg.role === "user" ? "bg-purple-600 text-right" : "bg-gray-700 text-left"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 p-2 rounded bg-gray-800 border border-purple-500 text-white"
          placeholder="Ask BryBot anything..."
        />
        <button
          onClick={sendMessage}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
