import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { MeetingCard } from './MeetingCard'
import type { Meeting } from '@/features/meetings/types'

const meeting: Omit<Meeting, 'transcript'> = {
  id: 'sample-meeting',
  title: 'Sample Planning Sync',
  date: '2026-08-01T15:00:00.000Z',
  platform: 'zoom',
  status: 'completed',
  durationMinutes: 30,
  participants: [{ id: 'p1', name: 'Alex Chen', avatarColor: '#f97316' }],
  summary: 'The team reviewed the sample roadmap.',
  keyTopics: ['Roadmap'],
  actionItems: [
    { id: 'a1', description: 'Send recap', owner: 'Alex Chen', done: false },
    { id: 'a2', description: 'Archive notes', owner: 'Alex Chen', done: true },
  ],
}

function renderCard(overrides: Partial<typeof meeting> = {}) {
  return render(
    <MemoryRouter>
      <MeetingCard meeting={{ ...meeting, ...overrides }} />
    </MemoryRouter>,
  )
}

describe('MeetingCard', () => {
  it('renders the meeting title and links to the meeting detail page', () => {
    renderCard()
    expect(screen.getByText('Sample Planning Sync')).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', '/meetings/sample-meeting')
  })

  it('only counts open action items', () => {
    renderCard()
    expect(screen.getByText('1 open action items')).toBeInTheDocument()
  })

  it('shows the completed status badge', () => {
    renderCard()
    expect(screen.getByText('Completed')).toBeInTheDocument()
  })
})
