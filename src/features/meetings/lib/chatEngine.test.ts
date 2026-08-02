import { describe, expect, it } from 'vitest'
import { answerFromTranscript } from './chatEngine'
import type { Meeting } from '../types'

const meeting: Meeting = {
  id: 'sample',
  title: 'Sample Sync',
  date: '2026-08-01T15:00:00.000Z',
  platform: 'zoom',
  status: 'completed',
  durationMinutes: 30,
  participants: [
    { id: 'jordan', name: 'Jordan Lee', avatarColor: '#10b981' },
    { id: 'alex', name: 'Alex Chen', avatarColor: '#f97316' },
  ],
  summary: 'The team discussed the notifications pipeline spike.',
  keyTopics: ['Notifications spike'],
  transcript: [
    {
      id: 't1',
      speakerId: 'jordan',
      timestamp: '00:10',
      text: 'I will run the notifications pipeline spike this week.',
    },
    {
      id: 't2',
      speakerId: 'alex',
      timestamp: '00:40',
      text: 'Sounds good, report back Friday.',
    },
  ],
  actionItems: [
    {
      id: 'a1',
      description: 'Run notifications spike',
      owner: 'Jordan Lee',
      done: false,
    },
  ],
}

describe('answerFromTranscript', () => {
  it('quotes the transcript turn matching the question keywords', () => {
    const answer = answerFromTranscript(meeting, 'What did Jordan commit to?')
    expect(answer).toContain('Jordan Lee')
    expect(answer).toContain('notifications pipeline spike')
  })

  it('returns a formatted action item list for action-item questions', () => {
    const answer = answerFromTranscript(meeting, 'What are my action items?')
    expect(answer).toContain('Run notifications spike')
    expect(answer).toContain('Jordan Lee')
  })

  it('returns the summary for "what was this meeting about" questions', () => {
    const answer = answerFromTranscript(meeting, 'What was this meeting about?')
    expect(answer).toBe(meeting.summary)
  })

  it('falls back gracefully when nothing matches', () => {
    const answer = answerFromTranscript(meeting, 'Did we discuss quantum computing?')
    expect(answer).toMatch(/couldn't find/i)
  })
})
