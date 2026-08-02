import type { Meeting, TranscriptTurn } from '../types'

const STOPWORDS = new Set([
  'a',
  'an',
  'the',
  'is',
  'are',
  'was',
  'were',
  'do',
  'does',
  'did',
  'what',
  'who',
  'when',
  'where',
  'why',
  'how',
  'in',
  'on',
  'at',
  'to',
  'of',
  'for',
  'and',
  'or',
  'about',
  'this',
  'that',
  'meeting',
  'did',
  'me',
  'my',
  'i',
  'we',
  'us',
  'said',
])

function keywords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 2 && !STOPWORDS.has(word))
}

function mentionedParticipantId(question: string, meeting: Meeting): string | undefined {
  const lowerQuestion = question.toLowerCase()
  const match = meeting.participants.find((participant) => {
    const firstName = participant.name.toLowerCase().split(' ')[0]
    return firstName.length > 2 && lowerQuestion.includes(firstName)
  })
  return match?.id
}

function speakerName(meeting: Meeting, speakerId: string): string {
  return (
    meeting.participants.find((participant) => participant.id === speakerId)?.name ??
    'Someone'
  )
}

function scoreTurn(turn: TranscriptTurn, questionWords: string[]): number {
  const turnWords = new Set(keywords(turn.text))
  return questionWords.reduce((score, word) => score + (turnWords.has(word) ? 1 : 0), 0)
}

const ACTION_ITEM_INTENTS = [
  'action item',
  'action items',
  'follow up',
  'follow-up',
  'todo',
  'to do',
  'to-do',
]
const SUMMARY_INTENTS = ['summary', 'summarize', 'about', 'topics', 'recap']

/**
 * Answers a question about a meeting using only that meeting's own transcript,
 * summary, and action items — no external model call. Kept as a single pure
 * function so it's the one place to swap in a real LLM call later.
 */
export function answerFromTranscript(meeting: Meeting, question: string): string {
  const trimmed = question.trim()
  if (!trimmed)
    return 'Ask me something about this meeting — like what a specific person said or committed to.'

  const lowerQuestion = trimmed.toLowerCase()

  if (ACTION_ITEM_INTENTS.some((phrase) => lowerQuestion.includes(phrase))) {
    if (meeting.actionItems.length === 0) {
      return 'No action items were captured for this meeting.'
    }
    return (
      'Action items from this meeting:\n' +
      meeting.actionItems
        .map(
          (item) =>
            `• ${item.description}${item.owner ? ` (${item.owner})` : ''}${item.done ? ' — done' : ''}`,
        )
        .join('\n')
    )
  }

  if (SUMMARY_INTENTS.some((phrase) => lowerQuestion.includes(phrase))) {
    if (!meeting.summary) return "This meeting doesn't have a summary yet."
    return meeting.summary
  }

  const questionWords = keywords(trimmed)
  const speakerId = mentionedParticipantId(trimmed, meeting)
  const candidateTurns = speakerId
    ? meeting.transcript.filter((turn) => turn.speakerId === speakerId)
    : meeting.transcript

  const scored = candidateTurns
    .map((turn) => ({ turn, score: scoreTurn(turn, questionWords) }))
    .filter(({ score }) => score > 0 || speakerId)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)

  if (scored.length === 0) {
    return "I couldn't find anything about that in this meeting's transcript. Try asking about a specific topic or person."
  }

  return scored
    .map(
      ({ turn }) =>
        `${speakerName(meeting, turn.speakerId)} (${turn.timestamp}): "${turn.text}"`,
    )
    .join('\n')
}
