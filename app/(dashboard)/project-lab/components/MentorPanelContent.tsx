"use client";

import { BiBot } from "react-icons/bi";
import { FiSend } from "react-icons/fi";
import { HiLightBulb } from "react-icons/hi2";
import type { RefObject } from "react";
import type { MentorChatMessage } from "./AIMentorPanel";

export interface MentorPanelContentProps {
  scrollRef: RefObject<HTMLDivElement | null>;
  messages: MentorChatMessage[];
  setDrawerOpen: (open: boolean) => void;
  input: string;
  setInput: (input: string) => void;
  handleSend: () => void;
  isLoading: boolean;
}

export const MentorPanelContent = ({
  scrollRef,
  messages,
  setDrawerOpen,
  input,
  setInput,
  handleSend,
  isLoading,
}: MentorPanelContentProps) => {
  return (
    <div className="flex h-full flex-col bg-[#0f172a] lg:rounded-none lg:border-0 lg:shadow-none">
      <div className="flex items-start gap-3 border-b  border-slate-700/80 px-4 py-4 sm:px-5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#14b8a6]/15 text-[#2dd4bf]">
          <BiBot className="h-6 w-6" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-semibold text-white sm:text-lg">
            Analytica AI Mentor
          </h2>
          <p className="mt-1 text-sm text-slate-200">
            Ask for hints to keep your project moving.
          </p>
        </div>
        <button
          type="button"
          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white lg:hidden"
          onClick={() => setDrawerOpen(false)}
          aria-label="Close mentor panel"
        >
          <span className="text-lg leading-none">x</span>
        </button>
      </div>

      <div
        ref={scrollRef}
        className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:px-5"
        role="log"
      >
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={msg.id}
              className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm sm:max-w-[85%] ${
                  isUser
                    ? "bg-[#1e3a5f] text-white"
                    : "border border-slate-700/60 bg-slate-800/80 text-slate-100"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>
                {msg.codeBlock ? (
                  <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-950/80 p-3 font-mono text-xs text-slate-100 ring-1 ring-slate-700/80 sm:text-sm">
                    <code>{msg.codeBlock}</code>
                  </pre>
                ) : null}
              </div>
            </div>
          );
        })}

        {isLoading ? (
          <div className="flex w-full justify-start">
            <div className="flex items-center gap-3 max-w-[92%] rounded-2xl border border-slate-700/60 bg-slate-800/80 px-4 py-3 text-sm text-slate-100 shadow-sm sm:max-w-[85%]">
              <span className="inline-flex h-2.5 w-2.5 animate-pulse rounded-full bg-[#2dd4bf]" />
              <span>Analytica is typing...</span>
            </div>
          </div>
        ) : null}
      </div>

      <div className="border-t border-slate-700/80 px-4 py-4 sm:px-5">
        <div className="flex gap-2">
          <textarea
            id="mentor-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={
              isLoading ? "Waiting for AI response..." : "Ask for a hint..."
            }
            className="h-25 resize-none flex-1 rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#14b8a6] focus:outline-none focus:ring-2 focus:ring-[#14b8a6]/30"
            disabled={isLoading}
            aria-busy={isLoading}
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={isLoading}
            className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-[#0f172a] shadow-md transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2dd4bf] ${
              isLoading
                ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                : "bg-[#14b8a6] hover:bg-[#2dd4bf]"
            }`}
            aria-label="Send message"
          >
            <FiSend className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
