import { Link, useParams } from 'react-router-dom'
import { useGetMeetingByIdQuery } from '../api'
import { MeetingHeader } from '../components/MeetingHeader'
import { SummaryPanel } from '../components/SummaryPanel'
import { TranscriptView } from '../components/TranscriptView'
import { ActionItemsList } from '../components/ActionItemsList'
import { ParticipantsList } from '../components/ParticipantsList'
import { MeetingChat } from '../components/MeetingChat'
import { AudioRecordingPlayer } from '../components/AudioRecordingPlayer'
import { Card } from '@/components/ui/Card'
import { Spinner } from '@/components/ui/Spinner'
import { ErrorBanner } from '@/components/ui/ErrorBanner'
import { EmptyState } from '@/components/ui/EmptyState'

export function MeetingDetailPage() {
  const { meetingId } = useParams<{ meetingId: string }>()
  const {
    data: meeting,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetMeetingByIdQuery(meetingId ?? '', {
    skip: !meetingId,
  })

  const isNotFound = isError && !!error && 'status' in error && error.status === 404

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      {isLoading && (
        <div className="flex justify-center py-12">
          <Spinner label="Loading meeting" />
        </div>
      )}

      {isNotFound && (
        <EmptyState
          title="Meeting not found"
          description="This meeting may have been deleted, or the link is incorrect."
          action={
            <Link
              to="/dashboard"
              className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Back to dashboard
            </Link>
          }
        />
      )}

      {isError && !isNotFound && (
        <ErrorBanner message="Couldn't load this meeting." onRetry={refetch} />
      )}

      {meeting && (
        <>
          <MeetingHeader meeting={meeting} />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="flex flex-col gap-6 lg:col-span-2">
              <AudioRecordingPlayer recording={meeting.audioRecording} />
              <SummaryPanel
                meetingId={meeting.id}
                summary={meeting.summary}
                summaryEditedAt={meeting.summaryEditedAt}
                keyTopics={meeting.keyTopics}
              />
              <TranscriptView
                meetingId={meeting.id}
                transcript={meeting.transcript}
                participants={meeting.participants}
              />
              <MeetingChat
                meetingId={meeting.id}
                disabled={meeting.transcript.length === 0}
              />
            </div>
            <div className="flex flex-col gap-6">
              <ActionItemsList meetingId={meeting.id} items={meeting.actionItems} />
              <Card className="p-5">
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Participants
                </h2>
                <ParticipantsList participants={meeting.participants} />
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
