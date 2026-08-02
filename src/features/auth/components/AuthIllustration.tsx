// Decorative panel for the sign-in screen — a floating "meeting notes" card
// getting summarized, echoing what the product actually does, rather than
// generic stock art.
export function AuthIllustration() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-500 via-indigo-600 to-slate-900">
      <svg
        className="absolute inset-0 h-full w-full opacity-40"
        viewBox="0 0 400 600"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="60" cy="80" r="1.5" fill="white" />
        <circle cx="140" cy="40" r="1" fill="white" />
        <circle cx="320" cy="90" r="1.5" fill="white" />
        <circle cx="350" cy="200" r="1" fill="white" />
        <circle cx="40" cy="260" r="1" fill="white" />
        <circle cx="300" cy="320" r="1.5" fill="white" />
        <circle cx="80" cy="420" r="1" fill="white" />
        <circle cx="330" cy="480" r="1.5" fill="white" />
        <circle cx="120" cy="540" r="1" fill="white" />
      </svg>

      <div className="relative flex flex-col items-center gap-6 px-10 text-center">
        <svg
          width="220"
          height="220"
          viewBox="0 0 220 220"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="110"
            cy="110"
            r="95"
            stroke="white"
            strokeOpacity="0.15"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
          <g transform="translate(48 40)">
            <rect x="0" y="0" width="124" height="150" rx="14" fill="white" />
            <rect x="16" y="24" width="92" height="8" rx="4" fill="#c7d2fe" />
            <rect x="16" y="44" width="72" height="8" rx="4" fill="#e0e7ff" />
            <rect x="16" y="64" width="80" height="8" rx="4" fill="#e0e7ff" />
            <rect x="16" y="84" width="56" height="8" rx="4" fill="#e0e7ff" />
            <rect x="16" y="112" width="92" height="26" rx="8" fill="#eef2ff" />
            <path
              d="M28 125.5 34.5 132 46 118"
              stroke="#4f46e5"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <circle cx="172" cy="60" r="22" fill="#facc15" />
          <path
            d="M164 60l5.5 5.5L180 55"
            stroke="#78350f"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className="max-w-xs">
          <p className="text-lg font-semibold text-white">
            Your meetings, already summarized
          </p>
          <p className="mt-2 text-sm text-indigo-100">
            While you're away, your agent joins the call, takes notes, and has everything
            ready the moment you sign back in.
          </p>
        </div>
      </div>
    </div>
  )
}
