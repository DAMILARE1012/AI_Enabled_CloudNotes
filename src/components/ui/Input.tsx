import { forwardRef, useId, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className, ...props }, ref) => {
    const generatedId = useId()
    const inputId = id ?? generatedId
    const errorId = error ? `${inputId}-error` : undefined

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          className={cn(
            'rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm',
            'placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500',
            'dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100',
            error && 'border-red-400 focus:border-red-500 focus:ring-red-500',
            className,
          )}
          {...props}
        />
        {error && (
          <p id={errorId} className="text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
      </div>
    )
  },
)
Input.displayName = 'Input'
