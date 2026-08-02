import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AudioRecordingPlayer } from './AudioRecordingPlayer'

describe('AudioRecordingPlayer', () => {
  it('renders a playable audio element and download link when a recording exists', () => {
    render(
      <AudioRecordingPlayer
        recording={{
          url: '/audio/demo-recording.wav',
          format: 'WAV · 8kHz mono (optimized for storage)',
        }}
      />,
    )
    expect(screen.getByText(/optimized for storage/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /download/i })).toHaveAttribute(
      'href',
      '/audio/demo-recording.wav',
    )
  })

  it('shows an empty state when no recording is available yet', () => {
    render(<AudioRecordingPlayer />)
    expect(screen.getByText(/recording not ready yet/i)).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /download/i })).not.toBeInTheDocument()
  })
})
