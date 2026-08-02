import { useState } from 'react'
import type {
  NotificationChannel,
  NotificationFrequency,
  NotificationPreferences,
} from '../types'
import { useUpdateNotificationPreferencesMutation } from '../api'
import { Card } from '@/components/ui/Card'

const CHANNEL_OPTIONS: { value: NotificationChannel; label: string }[] = [
  { value: 'none', label: 'Off' },
  { value: 'email', label: 'Email' },
  { value: 'slack', label: 'Slack' },
  { value: 'both', label: 'Email + Slack' },
]

const FREQUENCY_OPTIONS: { value: NotificationFrequency; label: string }[] = [
  { value: 'immediately', label: 'Immediately' },
  { value: 'daily', label: 'Daily digest' },
  { value: 'weekly', label: 'Weekly digest' },
]

export function NotificationPreferencesForm({
  preferences,
}: {
  preferences: NotificationPreferences
}) {
  const [updatePreferences] = useUpdateNotificationPreferencesMutation()
  // Optimistic local copy so the selection updates instantly on click rather than
  // waiting on the mutation round-trip; reconciled with the server value below.
  const [optimistic, setOptimistic] = useState(preferences)

  function handleChannelChange(channel: NotificationChannel) {
    setOptimistic((prev) => ({ ...prev, channel }))
    updatePreferences({ channel })
  }

  function handleFrequencyChange(frequency: NotificationFrequency) {
    setOptimistic((prev) => ({ ...prev, frequency }))
    updatePreferences({ frequency })
  }

  return (
    <Card className="flex flex-col gap-5 p-5">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Digest preferences
        </h2>
        <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
          Choose how you'd like to hear when your agent finishes taking notes. Actual
          email/Slack delivery requires a backend and isn't wired up in this demo — these
          preferences are saved and drive the in-app notification list.
        </p>
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Channel
        </legend>
        <div className="flex flex-wrap gap-2">
          {CHANNEL_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-50 dark:border-slate-700 dark:text-slate-300 dark:has-[:checked]:bg-indigo-950/40"
            >
              <input
                type="radio"
                name="channel"
                value={option.value}
                checked={optimistic.channel === option.value}
                onChange={() => handleChannelChange(option.value)}
                className="h-3.5 w-3.5"
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Frequency
        </legend>
        <div className="flex flex-wrap gap-2">
          {FREQUENCY_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-50 dark:border-slate-700 dark:text-slate-300 dark:has-[:checked]:bg-indigo-950/40"
            >
              <input
                type="radio"
                name="frequency"
                value={option.value}
                checked={optimistic.frequency === option.value}
                onChange={() => handleFrequencyChange(option.value)}
                className="h-3.5 w-3.5"
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>
    </Card>
  )
}
