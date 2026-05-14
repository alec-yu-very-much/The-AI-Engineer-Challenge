"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
}

export default function MessageBubble({ role, content }: MessageBubbleProps) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-lg bg-primary/20 border border-border-glow flex items-center justify-center mr-3 mt-1 flex-shrink-0">
          <span className="text-primary text-sm font-bold">AI</span>
        </div>
      )}
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${
          isUser
            ? "bg-user-bubble text-white rounded-br-md"
            : "bg-ai-bubble text-foreground rounded-bl-md border border-border-glow shadow-[0_0_15px_rgba(99,102,241,0.08)]"
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap leading-relaxed">{content}</p>
        ) : (
          <div className="prose-chat">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
