import type { Participant } from '../types'
import { Avatar } from '@/components/ui/Avatar'

export function ParticipantsList({ participants }: { participants: Participant[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {participants.map((participant) => (
        <li key={participant.id} className="flex items-center gap-3">
          <Avatar name={participant.name} color={participant.avatarColor} size={32} />
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
              {participant.name}
            </p>
            {participant.role && (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {participant.role}
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}
