import type {
  ActionItem,
  AudioRecording,
  Meeting,
  TranscriptTurn,
} from '@/features/meetings/types'
import { people } from './people'

// One shared placeholder recording asset — kept intentionally small (8kHz mono WAV)
// to reflect that meeting audio is stored in an optimized, not raw, format.
const RECORDING: AudioRecording = {
  url: '/audio/demo-recording.wav',
  format: 'WAV · 8kHz mono (optimized for storage)',
}

let turnCounter = 0
function turn(speakerId: string, timestamp: string, text: string): TranscriptTurn {
  turnCounter += 1
  return { id: `t${turnCounter}`, speakerId, timestamp, text }
}

let itemCounter = 0
function item(description: string, owner: string, done = false): ActionItem {
  itemCounter += 1
  return { id: `a${itemCounter}`, description, owner, done }
}

export const meetings: Meeting[] = [
  {
    id: 'q3-roadmap-sync',
    title: 'Q3 Roadmap Sync',
    audioRecording: RECORDING,
    date: '2026-07-28T15:00:00.000Z',
    platform: 'zoom',
    status: 'completed',
    durationMinutes: 42,
    participants: [people.dami, people.alex, people.jordan],
    summary:
      'The team aligned on the top three Q3 priorities: shipping the AI meeting agent MVP, improving onboarding completion rate, and stabilizing the notifications pipeline. Alex will finalize scope by Friday; Jordan flagged that the notifications work needs a spike before estimation.',
    keyTopics: [
      'Q3 priorities',
      'AI agent MVP',
      'Onboarding metrics',
      'Notifications spike',
    ],
    transcript: [
      turn(
        'alex',
        '00:00',
        "Let's lock the Q3 priorities today so we can start sprint planning tomorrow.",
      ),
      turn(
        'jordan',
        '00:38',
        'From engineering, the agent MVP is the biggest lift. We need at least three weeks.',
      ),
      turn(
        'dami',
        '01:15',
        'Agreed, that has to be priority one. What about the onboarding work?',
      ),
      turn(
        'alex',
        '01:42',
        'Onboarding completion dropped 8% last month, so I want that as priority two.',
      ),
      turn(
        'jordan',
        '02:20',
        'Notifications are flaky in prod. I want a spike before we commit to a full rebuild.',
      ),
      turn('dami', '02:55', "Let's do the spike this week and revisit sizing next sync."),
      turn(
        'alex',
        '03:30',
        "I'll write up the scoped priorities doc and share by Friday.",
      ),
    ],
    actionItems: [
      item('Finalize Q3 priorities doc', 'Alex Chen'),
      item('Run notifications pipeline spike', 'Jordan Lee'),
      item('Share onboarding funnel data with design', 'Alex Chen', true),
    ],
  },
  {
    id: 'design-review-onboarding',
    title: 'Design Review: Onboarding Flow',
    audioRecording: RECORDING,
    date: '2026-07-29T17:30:00.000Z',
    platform: 'google-meet',
    status: 'completed',
    durationMinutes: 35,
    participants: [people.dami, people.priya, people.alex],
    summary:
      'Priya walked through three onboarding redesign concepts. The team converged on "Concept B" — a progressive disclosure flow that defers account setup until after the first note is created. Priya will prep interactive prototypes for user testing next week.',
    keyTopics: ['Onboarding redesign', 'Progressive disclosure', 'Prototype testing'],
    transcript: [
      turn(
        'priya',
        '00:00',
        "I've got three concepts to walk through — A is the current flow simplified, B defers setup, C is fully guided.",
      ),
      turn(
        'alex',
        '00:50',
        'I like B. Getting people to value before asking for account details feels right.',
      ),
      turn('dami', '01:20', 'Agreed. Concept C felt too hand-holdy when I tried it.'),
      turn('priya', '01:55', "B it is. I'll build an interactive prototype for testing."),
      turn('alex', '02:30', 'Can we test with 5 users by end of next week?'),
      turn('priya', '02:48', "That's doable if I start the prototype tomorrow."),
    ],
    actionItems: [
      item('Build interactive prototype for Concept B', 'Priya Nair'),
      item('Recruit 5 users for testing session', 'Alex Chen'),
    ],
  },
  {
    id: 'manager-1-1',
    title: '1:1 with Taylor',
    audioRecording: RECORDING,
    seriesId: '1-1-taylor',
    seriesTitle: '1:1 with Taylor',
    date: '2026-07-30T14:00:00.000Z',
    platform: 'zoom',
    status: 'completed',
    durationMinutes: 28,
    participants: [people.dami, people.taylor],
    summary:
      'Discussed career growth goals for H2, current workload balance, and the upcoming performance review cycle. Taylor suggested taking ownership of the meeting-agent transcript pipeline as a stretch project ahead of the review.',
    keyTopics: ['Career growth', 'Workload check-in', 'Stretch project'],
    transcript: [
      turn('taylor', '00:00', 'How are you feeling about workload this sprint?'),
      turn('dami', '00:20', "It's manageable, though the agent MVP work is picking up."),
      turn(
        'taylor',
        '00:45',
        'Good timing actually — I think owning the transcript pipeline could be a great stretch project for you.',
      ),
      turn(
        'dami',
        '01:10',
        "I'd like that. What would success look like by the review cycle?",
      ),
      turn(
        'taylor',
        '01:35',
        'Shipping the pipeline end-to-end and documenting the architecture decisions.',
      ),
    ],
    actionItems: [
      item('Draft stretch-project proposal for transcript pipeline', 'Dami (You)'),
      item('Schedule mid-cycle check-in', 'Taylor Reyes'),
    ],
  },
  {
    id: 'customer-feedback-deep-dive',
    title: 'Customer Feedback Deep Dive',
    audioRecording: RECORDING,
    date: '2026-07-31T16:00:00.000Z',
    platform: 'google-meet',
    status: 'completed',
    durationMinutes: 51,
    participants: [people.dami, people.morgan, people.sam],
    summary:
      'Morgan shared themes from the last 20 support tickets: users want export-to-PDF for meeting notes and clearer distinction between AI-generated summaries and raw transcripts. Sam suggested surfacing this as a changelog item once shipped to drive re-engagement.',
    keyTopics: [
      'Support ticket themes',
      'Export to PDF',
      'Summary vs transcript clarity',
    ],
    transcript: [
      turn(
        'morgan',
        '00:00',
        'Two themes keep coming up: PDF export, and confusion between summary and full transcript.',
      ),
      turn(
        'dami',
        '00:40',
        'The confusion makes sense — we should visually separate those sections.',
      ),
      turn(
        'sam',
        '01:05',
        'If we ship both, I want to send a changelog email. Good re-engagement hook.',
      ),
      turn(
        'morgan',
        '01:30',
        "I'll compile the full ticket list and share it after this call.",
      ),
      turn(
        'dami',
        '02:00',
        "Let's scope PDF export for next sprint and the visual separation this sprint.",
      ),
    ],
    actionItems: [
      item('Compile support ticket theme summary', 'Morgan Blake'),
      item('Scope PDF export for next sprint', 'Dami (You)'),
      item('Draft changelog email once shipped', 'Sam Okafor'),
    ],
  },
  {
    id: 'sprint-14-retro',
    title: 'Engineering Standup — Sprint 14 Retro',
    audioRecording: RECORDING,
    seriesId: 'sprint-retro',
    seriesTitle: 'Sprint Retro',
    date: '2026-08-01T13:00:00.000Z',
    platform: 'zoom',
    status: 'completed',
    durationMinutes: 30,
    participants: [people.dami, people.jordan, people.taylor],
    summary:
      'Sprint 14 shipped the meeting-list dashboard and integration settings scaffolding. Velocity was slightly below target due to the notifications spike taking longer than planned. Team agreed to carry over 2 points into Sprint 15 and keep the spike learnings documented.',
    keyTopics: ['Sprint 14 review', 'Velocity', 'Carryover work'],
    transcript: [
      turn(
        'jordan',
        '00:00',
        'We shipped the dashboard and settings scaffolding, but the notifications spike ran long.',
      ),
      turn(
        'taylor',
        '00:30',
        'What made it run long — anything we should watch for next time?',
      ),
      turn(
        'jordan',
        '00:55',
        'Mostly unclear requirements upfront. I documented findings in the spike doc.',
      ),
      turn(
        'dami',
        '01:20',
        "Let's carry the remaining 2 points into Sprint 15 and start with clearer acceptance criteria.",
      ),
    ],
    actionItems: [
      item('Carry over notifications work into Sprint 15', 'Jordan Lee'),
      item('Write acceptance criteria template for spikes', 'Taylor Reyes'),
    ],
  },
  {
    id: 'marketing-product-sync',
    title: 'Marketing & Product Sync',
    audioRecording: RECORDING,
    date: '2026-08-01T19:00:00.000Z',
    platform: 'google-meet',
    status: 'completed',
    durationMinutes: 25,
    participants: [people.dami, people.sam, people.alex],
    summary:
      'Sam previewed the launch campaign for the AI meeting agent feature, targeting early September. Alex confirmed the feature will be feature-flagged for a beta cohort first. Team agreed on a shared messaging doc to keep marketing and product copy consistent.',
    keyTopics: ['Launch campaign timing', 'Beta cohort', 'Messaging consistency'],
    transcript: [
      turn(
        'sam',
        '00:00',
        "I'm targeting early September for the agent feature launch campaign.",
      ),
      turn(
        'alex',
        '00:25',
        "We'll beta it with a small cohort first, so let's align messaging to 'early access.'",
      ),
      turn(
        'sam',
        '00:50',
        "Makes sense. I'll draft a shared messaging doc so our copy stays consistent.",
      ),
      turn(
        'dami',
        '01:15',
        "I'll review the doc from a product-accuracy angle before it goes out.",
      ),
    ],
    actionItems: [
      item('Draft shared messaging doc', 'Sam Okafor'),
      item('Review messaging doc for accuracy', 'Dami (You)'),
    ],
  },
  {
    id: 'investor-update-prep',
    title: 'Investor Update Prep',
    date: '2026-08-02T18:00:00.000Z',
    platform: 'zoom',
    status: 'in-progress',
    durationMinutes: 0,
    participants: [people.dami, people.alex],
    summary: '',
    keyTopics: [],
    transcript: [
      turn(
        'alex',
        '00:00',
        "Let's walk through the metrics slide before the board call tomorrow.",
      ),
      turn(
        'dami',
        '00:22',
        'Sharing my screen now — active users are up 14% month over month.',
      ),
    ],
    actionItems: [],
  },
  {
    id: 'august-planning-all-hands',
    title: 'All-Hands: August Planning',
    date: '2026-08-05T15:00:00.000Z',
    platform: 'google-meet',
    status: 'scheduled',
    durationMinutes: 60,
    participants: [
      people.dami,
      people.alex,
      people.jordan,
      people.priya,
      people.sam,
      people.taylor,
    ],
    summary: '',
    keyTopics: [],
    transcript: [],
    actionItems: [],
  },
  {
    id: 'sprint-12-retro',
    title: 'Engineering Standup — Sprint 12 Retro',
    audioRecording: RECORDING,
    seriesId: 'sprint-retro',
    seriesTitle: 'Sprint Retro',
    date: '2026-07-18T13:00:00.000Z',
    platform: 'zoom',
    status: 'completed',
    durationMinutes: 27,
    participants: [people.dami, people.jordan, people.taylor],
    summary:
      'Sprint 12 shipped the auth scaffolding and initial mock API layer. Velocity matched the target for the first time this quarter. Team agreed to keep sprint scope smaller going forward to protect that consistency.',
    keyTopics: ['Sprint 12 review', 'Velocity', 'Scope discipline'],
    transcript: [
      turn(
        'jordan',
        '00:00',
        'Auth scaffolding and the mock API layer both shipped on time this sprint.',
      ),
      turn('taylor', '00:20', 'First sprint on target in a while — what changed?'),
      turn(
        'jordan',
        '00:40',
        'Smaller scope. We cut the notifications work out early instead of letting it slip.',
      ),
      turn(
        'dami',
        '01:05',
        "Let's keep doing that — smaller committed scope, carry the rest over deliberately.",
      ),
    ],
    actionItems: [item('Document the smaller-scope sprint process', 'Jordan Lee', true)],
  },
  {
    id: 'sprint-13-retro',
    title: 'Engineering Standup — Sprint 13 Retro',
    audioRecording: RECORDING,
    seriesId: 'sprint-retro',
    seriesTitle: 'Sprint Retro',
    date: '2026-07-25T13:00:00.000Z',
    platform: 'zoom',
    status: 'completed',
    durationMinutes: 33,
    participants: [people.dami, people.jordan, people.taylor],
    summary:
      'Sprint 13 shipped the dashboard filters and meeting-card UI. One story slipped because the design review ran long. Team agreed to timebox design reviews to 30 minutes going forward.',
    keyTopics: ['Sprint 13 review', 'Design review timeboxing'],
    transcript: [
      turn(
        'jordan',
        '00:00',
        'Dashboard filters and the meeting-card UI shipped. One story slipped though.',
      ),
      turn('taylor', '00:25', 'What slipped, and why?'),
      turn(
        'jordan',
        '00:45',
        'The empty-state work — the design review for it ran almost an hour.',
      ),
      turn(
        'dami',
        '01:10',
        "Let's timebox design reviews to 30 minutes so this doesn't eat sprint time again.",
      ),
    ],
    actionItems: [
      item('Add a 30-minute timebox to design review invites', 'Taylor Reyes', true),
    ],
  },
  {
    id: 'manager-1-1-prior',
    title: '1:1 with Taylor',
    audioRecording: RECORDING,
    seriesId: '1-1-taylor',
    seriesTitle: '1:1 with Taylor',
    date: '2026-07-16T14:00:00.000Z',
    platform: 'zoom',
    status: 'completed',
    durationMinutes: 25,
    participants: [people.dami, people.taylor],
    summary:
      'Checked in on the current sprint load and discussed interest areas for H2 growth. Dami flagged interest in owning more of the meeting-agent architecture; Taylor agreed to keep an eye out for the right project.',
    keyTopics: ['Workload check-in', 'Growth interests'],
    transcript: [
      turn('taylor', '00:00', 'How has the workload felt the last couple sprints?'),
      turn(
        'dami',
        '00:20',
        "Good — steady. I'd like more ownership on the agent architecture side though.",
      ),
      turn(
        'taylor',
        '00:45',
        "Noted. I'll keep an eye out for a project that fits that.",
      ),
    ],
    actionItems: [
      item('Keep an eye out for an architecture-ownership project', 'Taylor Reyes', true),
    ],
  },
]
