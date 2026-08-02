import type { AudioRecording } from '../types'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

export function AudioRecordingPlayer({ recording }: { recording?: AudioRecording }) {
  if (!recording) {
    return (
      <Card className="p-5">
        <EmptyState
          title="Recording not ready yet"
          description="Your agent saves an optimized audio recording once this meeting wraps up."
        />
      </Card>
    )
  }

  return (
    <Card className="flex flex-col gap-3 p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Recording
        </h2>
        <a
          href={recording.url}
          download
          className="text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          Download
        </a>
      </div>
      {/* Native controls used deliberately — they carry built-in keyboard and
          screen-reader support that a custom scrubber would have to reimplement.
          No <track> captions here: the text equivalent for this recording is the
          full transcript already rendered on this page, not a separate WebVTT file. */}
      <audio controls preload="metadata" className="w-full" src={recording.url}>
        Your browser doesn't support audio playback.
      </audio>
      <p className="text-xs text-slate-400 dark:text-slate-500">{recording.format}</p>
    </Card>
  )
}
