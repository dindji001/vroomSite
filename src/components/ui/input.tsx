import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const inputVariants = cva(
  "w-full text-foreground font-medium transition-all duration-[400ms] ease-[var(--ease-premium)] outline-none placeholder:text-muted-foreground/60 disabled:cursor-not-allowed disabled:opacity-50 [&::-webkit-calendar-picker-indicator]:opacity-60 [&::-webkit-calendar-picker-indicator]:cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "h-12 rounded-xl border border-border bg-background px-4 shadow-sm focus:border-[#253E38] focus:bg-[#253E38]/2 focus:shadow-[0_0_0_4px_rgba(37,62,56,0.08)] dark:focus:border-[#A7CD0F] dark:focus:bg-[#A7CD0F]/5 dark:focus:shadow-[0_0_0_4px_rgba(167,205,15,0.10)] aria-[invalid=true]:border-destructive aria-[invalid=true]:focus:border-destructive aria-[invalid=true]:focus:shadow-[0_0_0_4px_rgba(239,68,68,0.12)]",
        filled:
          "h-12 rounded-xl border-2 border-transparent bg-muted px-4 shadow-inner hover:bg-muted/80 focus:bg-background focus:border-[#253E38] focus:shadow-[0_0_0_4px_rgba(37,62,56,0.08)] dark:focus:border-[#A7CD0F] dark:focus:shadow-[0_0_0_4px_rgba(167,205,15,0.10)] aria-[invalid=true]:border-destructive aria-[invalid=true]:focus:shadow-[0_0_0_4px_rgba(239,68,68,0.12)]",
        outlined:
          "h-12 rounded-xl border-2 border-border/80 bg-transparent px-4 hover:border-[#253E38]/40 focus:border-[#253E38] focus:shadow-[0_0_0_4px_rgba(37,62,56,0.08)] dark:hover:border-[#A7CD0F]/40 dark:focus:border-[#A7CD0F] dark:focus:shadow-[0_0_0_4px_rgba(167,205,15,0.10)] aria-[invalid=true]:border-destructive aria-[invalid=true]:focus:shadow-[0_0_0_4px_rgba(239,68,68,0.12)]",
        glass:
          "h-12 rounded-xl backdrop-blur-xl border border-white/40 dark:border-white/10 bg-white/70 dark:bg-[#1a2027]/70 px-4 shadow-[0_4px_16px_rgba(16,20,24,0.06)] hover:bg-white/85 dark:hover:bg-[#1a2027]/80 focus:border-[#253E38]/40 focus:bg-white/90 dark:focus:border-[#A7CD0F]/40 dark:focus:bg-[#1a2027]/90 focus:shadow-[0_0_0_4px_rgba(37,62,56,0.10)] aria-[invalid=true]:border-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix">,
    VariantProps<typeof inputVariants> {
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  error?: string
  floatingLabel?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, leadingIcon, trailingIcon, error, floatingLabel, id, ...props }, ref) => {
    const generatedId = React.useId()
    const inputId = id ?? generatedId
    const [isFocused, setIsFocused] = React.useState(false)
    const hasValue = typeof props.value === "string" ? props.value.length > 0 : Boolean(props.defaultValue)

    return (
      <div data-slot="input-wrapper" className="relative w-full">
        {leadingIcon && (
          <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors duration-400 ease-[var(--ease-premium)] [&>svg]:size-5 peer-focus:text-[#253E38] dark:peer-focus:text-[#A7CD0F] peer-aria-[invalid=true]:text-destructive">
            {leadingIcon}
          </div>
        )}
        {floatingLabel && (
          <label
            htmlFor={inputId}
            className={cn(
              "pointer-events-none absolute left-4 z-10 origin-left transition-all duration-400 ease-[var(--ease-premium)]",
              leadingIcon ? "left-11" : "left-4",
              (isFocused || hasValue)
                ? "top-1.5 scale-[0.78] font-semibold text-[#253E38] dark:text-[#A7CD0F]"
                : "top-1/2 -translate-y-1/2 text-muted-foreground",
              error && "text-destructive"
            )}
          >
            {floatingLabel}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          data-slot="input"
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          onFocus={(e) => {
            setIsFocused(true)
            props.onFocus?.(e)
          }}
          onBlur={(e) => {
            setIsFocused(false)
            props.onBlur?.(e)
          }}
          className={cn(
            "peer",
            leadingIcon && "pl-11",
            trailingIcon && "pr-11",
            floatingLabel && (isFocused || hasValue) ? "pt-4 pb-1.5 text-base" : "",
            inputVariants({ variant }),
            className
          )}
          {...props}
        />
        {trailingIcon && (
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors duration-400 ease-[var(--ease-premium)] [&>svg]:size-5 peer-focus:text-[#253E38] dark:peer-focus:text-[#A7CD0F] peer-aria-[invalid=true]:text-destructive">
            {trailingIcon}
          </div>
        )}
        {error && (
          <p
            id={`${inputId}-error`}
            role="alert"
            className="mt-1.5 text-xs font-medium text-destructive animate-fade-in"
          >
            {error}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "prefix">,
    VariantProps<typeof inputVariants> {
  error?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, error, id, ...props }, ref) => {
    const generatedId = React.useId()
    const textareaId = id ?? generatedId

    return (
      <div data-slot="textarea-wrapper" className="relative w-full">
        <textarea
          ref={ref}
          id={textareaId}
          data-slot="textarea"
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? `${textareaId}-error` : undefined}
          className={cn(
            inputVariants({ variant }),
            "min-h-[140px] resize-y py-3.5 leading-relaxed",
            className
          )}
          {...props}
        />
        {error && (
          <p
            id={`${textareaId}-error`}
            role="alert"
            className="mt-1.5 text-xs font-medium text-destructive animate-fade-in"
          >
            {error}
          </p>
        )}
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "prefix">,
    VariantProps<typeof inputVariants> {
  error?: string
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, variant, error, id, children, ...props }, ref) => {
    const generatedId = React.useId()
    const selectId = id ?? generatedId

    return (
      <div data-slot="select-wrapper" className="relative w-full">
        <select
          ref={ref}
          id={selectId}
          data-slot="select"
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? `${selectId}-error` : undefined}
          className={cn(
            inputVariants({ variant }),
            "cursor-pointer appearance-none pr-11 bg-no-repeat bg-[right_1rem_center] bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2216%22%20height=%2216%22%20viewBox=%220%200%2024%2024%22%20fill=%22none%22%20stroke=%22currentColor%22%20stroke-width=%222%22%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22%3E%3Cpath%20d=%22m6%209%206%206%206-6%22/%3E%3C/svg%3E')] text-muted-foreground",
            className
          )}
          {...props}
        >
          {children}
        </select>
        {error && (
          <p
            id={`${selectId}-error`}
            role="alert"
            className="mt-1.5 text-xs font-medium text-destructive animate-fade-in"
          >
            {error}
          </p>
        )}
      </div>
    )
  }
)
Select.displayName = "Select"

export { Input, Textarea, Select, inputVariants }
