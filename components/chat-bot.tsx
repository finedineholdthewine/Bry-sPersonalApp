"use client";
import { useState, useEffect, useRef } from "react";

export function ChatBot({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  if (!isOpen) return null;

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server responded with ${res.status}: ${text}`);
      }

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err: any) {
      console.error("Fetch failed:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ BryBot hit a snag: " + err.message },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed bottom-4 right-4 left-4 sm:left-auto sm:right-6 w-auto sm:w-full max-w-md p-5 rounded-xl shadow-2xl z-50 overflow-hidden"
      style={{
        background: "linear-gradient(to bottom right, rgba(15, 15, 25, 0.95), rgba(0, 0, 0, 0.98))",
      }}
    >
      {/* Glow effect border */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl blur opacity-40 pointer-events-none" />

      {/* Content container */}
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold text-lg text-white">BryBot 🤖</h2>
          <button onClick={onClose} className="text-purple-300 hover:text-white text-sm transition-colors">
            ✖
          </button>
        </div>

        <div className="max-h-64 overflow-y-auto space-y-3 mb-3 pr-1 scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-transparent">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg ${
                msg.role === "user"
                  ? "bg-gradient-to-r from-purple-900/80 to-purple-800/80 text-right ml-8"
                  : "bg-gradient-to-r from-gray-900/90 to-gray-800/90 text-left mr-8"
              } border border-purple-500/30 shadow-md`}
            >
              {msg.content}
            </div>
          ))}

          {loading && (
            <div className="p-3 italic text-gray-400 animate-pulse">BryBot is thinking...</div>
          )}

          <div ref={endRef} />
        </div>

        <div className="flex gap-2 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 p-3 rounded-lg bg-gray-800/80 border border-purple-500/50 text-white focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 focus:outline-none transition-all"
            placeholder="Ask BryBot anything..."
          />
          <button
            onClick={sendMessage}
            className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-[0_0_10px_rgba(139,92,246,0.3)] hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
