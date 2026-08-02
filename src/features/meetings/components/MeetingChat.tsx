import { useState, type FormEvent } from 'react'
import type { ChatMessage } from '../types'
import { useAskMeetingQuestionMutation } from '../api'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'

interface MeetingChatProps {
  meetingId: string
  disabled?: boolean
}

export function MeetingChat({ meetingId, disabled }: MeetingChatProps) {
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [askQuestion, { isLoading }] = useAskMeetingQuestionMutation()

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const trimmed = question.trim()
    if (!trimmed || isLoading) return

    const userMessage: ChatMessage = {
      id: `local-${Date.now()}`,
      role: 'user',
      text: trimmed,
      timestamp: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, userMessage])
    setQuestion('')

    const reply = await askQuestion({ meetingId, question: trimmed }).unwrap()
    setMessages((prev) => [...prev, reply])
  }

  return (
    <Card className="flex flex-col gap-4 p-5">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Ask about this meeting
        </h2>
        <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
          Answers are grounded in this meeting's own transcript and notes.
        </p>
      </div>

      {messages.length > 0 && (
        <ul className="flex max-h-80 flex-col gap-3 overflow-y-auto">
          {messages.map((message) => (
            <li
              key={message.id}
              className={message.role === 'user' ? 'self-end text-right' : 'self-start'}
            >
              <div
                className={
                  message.role === 'user'
                    ? 'inline-block whitespace-pre-line rounded-lg bg-indigo-600 px-3 py-2 text-sm text-white'
                    : 'inline-block whitespace-pre-line rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-800 dark:bg-slate-800 dark:text-slate-200'
                }
              >
                {message.text}
              </div>
            </li>
          ))}
        </ul>
      )}

      {isLoading && (
        <div className="self-start">
          <Spinner label="Thinking" />
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <label htmlFor="meeting-chat-input" className="sr-only">
          Ask a question about this meeting
        </label>
        <input
          id="meeting-chat-input"
          type="text"
          placeholder={
            disabled
              ? 'Chat is available once this meeting has a transcript.'
              : 'e.g. "What did Jordan commit to?"'
          }
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          disabled={disabled}
          className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        />
        <Button
          type="submit"
          size="sm"
          disabled={disabled || isLoading || !question.trim()}
        >
          Ask
        </Button>
      </form>
    </Card>
  )
}
