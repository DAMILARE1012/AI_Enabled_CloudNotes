import { describe, expect, it } from 'vitest'
import { formatDuration, initials } from './utils'

describe('formatDuration', () => {
  it('shows "In progress" for zero or negative minutes', () => {
    expect(formatDuration(0)).toBe('In progress')
  })

  it('formats sub-hour durations in minutes', () => {
    expect(formatDuration(42)).toBe('42 min')
  })

  it('formats whole-hour durations without a minutes suffix', () => {
    expect(formatDuration(120)).toBe('2 hr')
  })

  it('formats mixed hour/minute durations', () => {
    expect(formatDuration(90)).toBe('1 hr 30 min')
  })
})

describe('initials', () => {
  it('takes the first letter of up to two words', () => {
    expect(initials('Alex Chen')).toBe('AC')
  })

  it('handles a single-word name', () => {
    expect(initials('Dami')).toBe('D')
  })
})
