# 👁️ MeetingLens

Stop re-reading meeting transcripts. MeetingLens takes raw meeting notes and pulls out what actually matters — action items, decisions, key discussion points, and follow-ups.

![MeetingLens](proof/commit-log.png)

## The problem

Meetings generate walls of text. Important decisions get buried. Action items are forgotten by EOD.

## The solution

Paste your meeting notes → get structured output:

- **Key Decisions** — What was decided
- **Action Items** — Who does what by when
- **Discussion Summary** — Condensed from verbose notes
- **Follow-ups** — What needs another meeting
- **Sentiment Pulse** — Overall team mood from the discussion

## Getting started

```
npm install
npm run dev
```

Open `localhost:3000`, paste your notes, click Analyze.

## What's under the hood

| Component | Choice |
|-----------|--------|
| Runtime | Next.js 16 (App Router) |
| Styling | Tailwind CSS 4 |
| Types | TypeScript |
| AI | MiMo v2.5 Pro |
| Layout | Split-panel (input left, analysis right) |

## API

```typescript
POST /api/analyze
Body: { notes: string }
Response: { summary: string, actions: string[], decisions: string[] }
```

## File map

```
src/app/
├── api/analyze/route.ts    meeting analysis endpoint
├── page.tsx                main interface
├── globals.css             dark teal theme
└── layout.tsx              root shell
```

## Visual style

Dark background (#0f172a) with teal accents (#14b8a6). Clean cards, minimal borders. The UI stays out of your way — the content is the focus.

---

Built with **MiMo v2.5 Pro** by Xiaomi → [huggingface.co/XiaomiMiMo](https://huggingface.co/XiaomiMiMo)

*Crafted with MiMo v2.5 Pro*

MIT
