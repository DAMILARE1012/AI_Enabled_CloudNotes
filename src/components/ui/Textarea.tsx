import { forwardRef, useId, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  hideLabel?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, hideLabel, id, className, ...props }, ref) => {
    const generatedId = useId()
    const textareaId = id ?? generatedId

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={textareaId}
          className={cn(
            'text-sm font-medium text-slate-700 dark:text-slate-300',
            hideLabel && 'sr-only',
          )}
        >
          {label}
        </label>
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm',
            'placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500',
            'dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100',
            className,
          )}
          {...props}
        />
      </div>
    )
  },
)
Textarea.displayName = 'Textarea'
