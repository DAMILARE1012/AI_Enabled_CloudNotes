import { useState } from 'react'
import type { Participant, TranscriptTurn } from '../types'
import { useUpdateTranscriptTurnMutation } from '../api'
import { Card } from '@/components/ui/Card'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Textarea'
import { EmptyState } from '@/components/ui/EmptyState'

interface TranscriptViewProps {
  meetingId: string
  transcript: TranscriptTurn[]
  participants: Participant[]
}

function TranscriptTurnRow({
  meetingId,
  turn,
  speaker,
}: {
  meetingId: string
  turn: TranscriptTurn
  speaker?: Participant
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(turn.text)
  const [updateTurn, { isLoading }] = useUpdateTranscriptTurnMutation()

  async function handleSave() {
    await updateTurn({ meetingId, turnId: turn.id, text: draft }).unwrap()
    setIsEditing(false)
  }

  function handleCancel() {
    setDraft(turn.text)
    setIsEditing(false)
  }

  return (
    <li className="group flex gap-3">
      <Avatar
        name={speaker?.name ?? 'Unknown'}
        color={speaker?.avatarColor ?? '#94a3b8'}
        size={28}
      />
      <div className="flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
            {speaker?.name ?? 'Unknown speaker'}
          </span>
          <time className="text-xs text-slate-400 dark:text-slate-500">
            {turn.timestamp}
          </time>
          {turn.edited && (
            <span className="text-xs italic text-slate-400 dark:text-slate-500">
              (edited)
            </span>
          )}
          {!isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="text-xs font-medium text-indigo-600 opacity-0 hover:underline group-hover:opacity-100 focus:opacity-100 dark:text-indigo-400"
            >
              Edit
            </button>
          )}
        </div>
        {isEditing ? (
          <div className="mt-1 flex flex-col gap-2">
            <Textarea
              label={`Edit what ${speaker?.name ?? 'this speaker'} said`}
              hideLabel
              rows={2}
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
              <Button
                size="sm"
                onClick={handleSave}
                disabled={isLoading || !draft.trim()}
              >
                {isLoading ? 'Saving…' : 'Save'}
              </Button>
            </div>
          </div>
        ) : (
          <p className="mt-0.5 text-sm text-slate-700 dark:text-slate-300">{turn.text}</p>
        )}
      </div>
    </li>
  )
}

export function TranscriptView({
  meetingId,
  transcript,
  participants,
}: TranscriptViewProps) {
  const participantById = new Map(
    participants.map((participant) => [participant.id, participant]),
  )

  if (transcript.length === 0) {
    return (
      <Card className="p-5">
        <EmptyState
          title="No transcript yet"
          description="Once your agent joins and the conversation starts, the transcript will appear here in real time."
        />
      </Card>
    )
  }

  return (
    <Card className="p-5">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        Transcript
      </h2>
      <ol className="flex flex-col gap-4">
        {transcript.map((turn) => (
          <TranscriptTurnRow
            key={turn.id}
            meetingId={meetingId}
            turn={turn}
            speaker={participantById.get(turn.speakerId)}
          />
        ))}
      </ol>
    </Card>
  )
}
