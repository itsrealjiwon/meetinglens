"use client";

import { useState } from "react";

interface TranscriptInputProps {
  onSubmit: (transcript: string) => void;
  isLoading: boolean;
}

const SAMPLE = `[Meeting Start - 10:00 AM]

Sarah (PM): Good morning everyone. Let's kick off the Q3 planning meeting. First agenda item — the mobile app redesign. Where are we on that?

Jake (Design): We've completed the wireframes for the new onboarding flow. User testing showed a 40% improvement in completion rate. I'd like to discuss moving to high-fidelity prototypes.

Sarah: That's great progress. What timeline are you thinking?

Jake: About 3 weeks for full mockups, then 1 week for dev handoff prep.

Mike (Engineering): Quick note — we're still blocked on the API v3 migration. The auth service needs to be updated first. I'd estimate 2 more sprints.

Sarah: OK, let's prioritize the auth service update then. Mike, can you own that?

Mike: Sure, I'll take it. Should have it done by end of next sprint.

Lisa (QA): I want to flag that we found 3 critical bugs in the payment flow last week. We should fix those before any new feature work.

Sarah: Agreed. Lisa, please create tickets and assign to Mike's team. Let's aim to have those resolved by Friday.

Lisa: Will do.

Sarah: Any other blockers? OK, let's plan the next sync for Thursday. Thanks everyone.

[Meeting End - 10:32 AM]`;

export default function TranscriptInput({ onSubmit, isLoading }: TranscriptInputProps) {
  const [transcript, setTranscript] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (transcript.trim().length > 50) onSubmit(transcript.trim());
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Hero */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Paste your meeting transcript</h2>
        <p className="text-sm text-steel mt-2">
          AI will extract key points, decisions, and action items in seconds
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-gray-700">Meeting Transcript</label>
            <button
              type="button"
              onClick={() => setTranscript(SAMPLE)}
              className="text-xs font-mono text-sky-600 hover:text-sky-800 underline decoration-dotted"
            >
              Load sample transcript
            </button>
          </div>
          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Paste your meeting notes, call transcript, or recording transcript here..."
            rows={14}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 text-sm leading-relaxed resize-none font-mono"
          />
          <p className="text-xs text-steel mt-1 text-right font-mono">
            {transcript.length} characters {transcript.length < 50 && transcript.length > 0 ? "(min 50)" : ""}
          </p>
        </div>

        <button
          type="submit"
          disabled={transcript.trim().length < 50 || isLoading}
          className="w-full py-3.5 bg-sky-600 text-white font-semibold rounded-xl hover:bg-sky-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Analyzing transcript...
            </span>
          ) : (
            "🔍 Summarize Meeting"
          )}
        </button>
      </form>

      {/* Tips */}
      <div className="mt-8 bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">💡 Tips for best results</h3>
        <ul className="space-y-2 text-sm text-steel">
          <li>• Include speaker names for better action item attribution</li>
          <li>• Longer transcripts (5+ minutes) give richer summaries</li>
          <li>• Works with Zoom, Google Meet, Teams, or manual notes</li>
        </ul>
      </div>
    </div>
  );
}
