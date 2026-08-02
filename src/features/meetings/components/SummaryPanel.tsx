import { useState } from 'react'
import { useUpdateMeetingSummaryMutation } from '../api'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Textarea'
import { EmptyState } from '@/components/ui/EmptyState'

interface SummaryPanelProps {
  meetingId: string
  summary: string
  summaryEditedAt?: string
  keyTopics: string[]
}

export function SummaryPanel({
  meetingId,
  summary,
  summaryEditedAt,
  keyTopics,
}: SummaryPanelProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(summary)
  const [updateSummary, { isLoading }] = useUpdateMeetingSummaryMutation()

  async function handleSave() {
    await updateSummary({ meetingId, summary: draft }).unwrap()
    setIsEditing(false)
  }

  function handleCancel() {
    setDraft(summary)
    setIsEditing(false)
  }

  if (!summary && !isEditing) {
    return (
      <Card className="p-5">
        <EmptyState
          title="Summary not ready yet"
          description="Your agent will generate a summary once this meeting wraps up."
          action={
            <Button size="sm" variant="secondary" onClick={() => setIsEditing(true)}>
              Write one manually
            </Button>
          }
        />
      </Card>
    )
  }

  return (
    <Card className="flex flex-col gap-4 p-5">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          AI Summary
        </h2>
        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="flex flex-col gap-3">
          <Textarea
            label="Meeting summary"
            hideLabel
            rows={4}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave} disabled={isLoading || !draft.trim()}>
              {isLoading ? 'Saving…' : 'Save'}
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            {summary}
          </p>
          {summaryEditedAt && (
            <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
              Edited {new Date(summaryEditedAt).toLocaleString()}
            </p>
          )}
        </div>
      )}

      {keyTopics.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {keyTopics.map((topic) => (
            <Badge key={topic} tone="info">
              {topic}
            </Badge>
          ))}
        </div>
      )}
    </Card>
  )
}
