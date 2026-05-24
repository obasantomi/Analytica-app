"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { MentorPanelContent } from "./MentorPanelContent";
import { BiBot } from "react-icons/bi";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export type MentorChatMessage = {
  id: string;
  kind: "bubble";
  role: "user" | "assistant";
  text: string;
  codeBlock?: string;
};

export interface AIMentorPanelProps {
  projectId: string;
}

const createId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `msg-${crypto.randomUUID()}`;
  }
  return `msg-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const buildSeedMessages = (): MentorChatMessage[] => {
  return [
    {
      id: "seed-1",
      kind: "bubble",
      role: "assistant",
      text: `Hey 👋 I'm analytica.

I'm here to help you think through problems step by step. If something feels confusing, just explain it and I'll guide you through it without jumping straight to the answer.

Let's build this together.`,
    },
  ];
};

export const AIMentorPanel = ({ projectId }: AIMentorPanelProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<MentorChatMessage[]>(() =>
    buildSeedMessages(),
  );
  const [isLoading, setIsLoading] = useState(false);

  const fetchAiResponse = useCallback(
    async (conversation: MentorChatMessage[]) => {
      setIsLoading(true);
      try {
        const response = await axios.post(`/api/projects/${projectId}/chat`, {
          messages: conversation,
        });

        if (response.data?.chatResponse) {
          setMessages((prev) => [
            ...prev,
            {
              id: createId(),
              kind: "bubble",
              role: "assistant",
              text: response.data.chatResponse,
            },
          ]);
        } else {
          toast.error(
            "The AI mentor could not generate a response. Please try again.",
          );
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load the AI mentor response. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [projectId],
  );

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, drawerOpen, scrollToBottom]);

  const sendText = (text: string) => {
    const trimmed = text.trim();
    if (isLoading) return;
    if (!trimmed) {
      toast.error("Please enter a message before sending.");
      return;
    }

    const userMessage: MentorChatMessage = {
      id: createId(),
      kind: "bubble",
      role: "user",
      text: trimmed,
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    fetchAiResponse(nextMessages);
  };

  const handleSend = () => {
    sendText(input);
    setInput("");
  };

  return (
    <div className="w-full">
      <Toaster position="top-right" />
      {/* Mobile trigger */}
      <div className="lg:hidden pb-15 px-5 ">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-700/80 bg-[#1e3a5f] px-4 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#243d63]"
        >
          <BiBot className="h-5 w-5 text-[#2dd4bf]" aria-hidden />
          Open Analytica AI Mentor
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 flex flex-col justify-end bg-slate-950/70 transition lg:hidden ${
          drawerOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!drawerOpen}
      >
        <button
          type="button"
          className="absolute inset-0 cursor-default"
          tabIndex={-1}
          aria-label="Close drawer backdrop"
          onClick={() => setDrawerOpen(false)}
        />
        <div
          className={`relative max-h-[90dvh] transform rounded-t-3xl border border-slate-700/80 border-b-0 bg-[#0f172a] shadow-2xl transition-transform duration-300 ease-out ${
            drawerOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div
            className="mx-auto mt-2 h-1 w-10 rounded-full bg-slate-600"
            aria-hidden
          />
          <div className="h-[min(85dvh,640px)]">
            <MentorPanelContent
              scrollRef={scrollRef}
              messages={messages}
              setDrawerOpen={setDrawerOpen}
              input={input}
              setInput={setInput}
              handleSend={handleSend}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Desktop: fixed right rail (matches dashboard header offset + main `lg:pr-96`) */}
      <aside
        className="hidden lg:fixed lg:right-0 lg:top-[71.5px] lg:z-20 lg:flex lg:h-[calc(100dvh-71.5px)] lg:w-110 lg:flex-col lg:border-l lg:border-slate-700/80 lg:bg-[#0f172a] lg:shadow-[-12px_0_40px_rgba(15,23,42,0.12)]"
        aria-label="Analytica AI Mentor"
      >
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <MentorPanelContent
            scrollRef={scrollRef}
            messages={messages}
            setDrawerOpen={setDrawerOpen}
            input={input}
            setInput={setInput}
            handleSend={handleSend}
            isLoading={isLoading}
          />
        </div>
      </aside>
    </div>
  );
};
