import type { Participant } from '@/features/meetings/types'

export const people = {
  dami: {
    id: 'dami',
    name: 'Dami (You)',
    role: 'Host',
    avatarColor: '#6366f1',
  },
  alex: {
    id: 'alex',
    name: 'Alex Chen',
    role: 'Product Manager',
    avatarColor: '#f97316',
  },
  jordan: {
    id: 'jordan',
    name: 'Jordan Lee',
    role: 'Engineering Lead',
    avatarColor: '#10b981',
  },
  priya: {
    id: 'priya',
    name: 'Priya Nair',
    role: 'Designer',
    avatarColor: '#ec4899',
  },
  sam: {
    id: 'sam',
    name: 'Sam Okafor',
    role: 'Marketing Lead',
    avatarColor: '#eab308',
  },
  taylor: {
    id: 'taylor',
    name: 'Taylor Reyes',
    role: 'Engineering Manager',
    avatarColor: '#06b6d4',
  },
  morgan: {
    id: 'morgan',
    name: 'Morgan Blake',
    role: 'Customer Success',
    avatarColor: '#8b5cf6',
  },
} satisfies Record<string, Participant>
