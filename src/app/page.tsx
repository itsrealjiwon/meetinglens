"use client";

import { useState } from "react";
import TranscriptInput from "@/components/TranscriptInput";
import SummaryView from "@/components/SummaryView";

interface ActionItem {
  assignee: string;
  task: string;
  priority: "high" | "medium" | "low";
}

interface MeetingResult {
  title: string;
  summary: string;
  keyPoints: string[];
  decisions: string[];
  actionItems: ActionItem[];
  nextMeeting: string | null;
}

export default function Home() {
  const [result, setResult] = useState<MeetingResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSummarize = async (transcript: string) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript }),
      });
      if (!res.ok) throw new Error("Summarization failed");
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-cloud">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🔬</span>
            <div>
              <h1 className="text-lg font-bold text-gray-900">MeetingLens</h1>
              <p className="text-xs text-steel">AI meeting notes summarizer</p>
            </div>
          </div>
          <span className="text-xs font-mono text-sky-600 px-3 py-1 bg-sky-50 rounded-full border border-sky-200">
            Powered by MiMo v2.5 Pro
          </span>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 py-10 px-6">
        {error && (
          <div className="max-w-3xl mx-auto mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-red-700 text-sm font-mono">⚠️ {error}</p>
          </div>
        )}

        {result ? (
          <div className="max-w-3xl mx-auto">
            <SummaryView result={result} onReset={() => setResult(null)} />
          </div>
        ) : (
          <TranscriptInput onSubmit={handleSummarize} isLoading={isLoading} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs text-steel font-mono">
            Analyzed by MiMo v2.5 Pro • MeetingLens © 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
