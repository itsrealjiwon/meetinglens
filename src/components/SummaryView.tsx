"use client";

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

interface SummaryViewProps {
  result: MeetingResult;
  onReset: () => void;
}

const priorityColors: Record<string, { bg: string; text: string; border: string }> = {
  high: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
  medium: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  low: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
};

export default function SummaryView({ result, onReset }: SummaryViewProps) {
  return (
    <div className="space-y-6 animate-slide-up">
      {/* Title */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{result.title}</h2>
            <p className="text-sm text-steel mt-1 font-mono">
              {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <span className="tag bg-sky-50 text-sky-700 border border-sky-200">📋 Summarized</span>
        </div>
        <p className="mt-4 text-gray-700 leading-relaxed">{result.summary}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Key Points */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-sm font-mono font-semibold text-steel uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-450"></span>
            Key Discussion Points
          </h3>
          <ul className="space-y-3">
            {result.keyPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 flex-shrink-0 flex items-center justify-center bg-sky-50 text-sky-700 rounded-full text-xs font-bold mt-0.5">
                  {i + 1}
                </span>
                <span className="text-sm text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Decisions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-sm font-mono font-semibold text-steel uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Decisions Made
          </h3>
          {result.decisions.length > 0 ? (
            <ul className="space-y-3">
              {result.decisions.map((d, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-emerald-500 mt-0.5">✓</span>
                  <span className="text-sm text-gray-700">{d}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400 italic">No formal decisions recorded</p>
          )}
        </div>
      </div>

      {/* Action Items */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-sm font-mono font-semibold text-steel uppercase tracking-wider mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          Action Items
        </h3>
        {result.actionItems.length > 0 ? (
          <div className="space-y-3">
            {result.actionItems.map((item, i) => {
              const p = priorityColors[item.priority] || priorityColors.medium;
              return (
                <div key={i} className={`flex items-center gap-4 p-3 rounded-lg border ${p.bg} ${p.border}`}>
                  <span className={`tag ${p.bg} ${p.text} ${p.border}`}>
                    {item.priority}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{item.task}</p>
                    <p className="text-xs text-steel mt-0.5">Assigned to: {item.assignee}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-gray-400 italic">No action items identified</p>
        )}
      </div>

      {/* Next Meeting */}
      {result.nextMeeting && (
        <div className="bg-sky-50 rounded-xl border border-sky-200 p-5">
          <p className="text-sm font-semibold text-sky-800">📅 Next Meeting Topic</p>
          <p className="text-sm text-sky-700 mt-1">{result.nextMeeting}</p>
        </div>
      )}

      {/* Reset */}
      <div className="text-center pt-4">
        <button
          onClick={onReset}
          className="px-6 py-2.5 bg-white text-gray-700 font-medium rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors text-sm"
        >
          ← Summarize another meeting
        </button>
      </div>
    </div>
  );
}
