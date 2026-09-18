import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react'
import LoadingIndicator from './LoadingIndicator'

export type ButtonCategory = 'primary' | 'secondary' | 'ghost'

export interface ButtonConfig {
  onClick?: MouseEventHandler<HTMLButtonElement>
  label: string
  category: ButtonCategory
}

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'onClick'
> & {
  buttonProps: ButtonConfig
  children?: ReactNode
  loading?: boolean
}

const categoryClasses: Record<ButtonCategory, string> = {
  primary:
    'bg-[var(--lime)] text-[var(--ink)] hover:bg-[#e1ff9b] hover:shadow-[0_8px_22px_rgba(201,242,105,.16)]',
  secondary:
    'bg-[var(--coral)] text-[var(--ink)] hover:bg-[#ff9c83] hover:shadow-[0_8px_22px_rgba(255,135,105,.16)]',
  ghost:
    'border-[var(--line)] bg-transparent text-[var(--paper)] hover:border-[var(--lime)] hover:text-[var(--lime)]'
}

export default function Button ({
  buttonProps,
  children,
  className = '',
  disabled = false,
  loading = false,
  type = 'button',
  ...props
}: ButtonProps) {
  const cssClass =
    `inline-flex min-h-11 max-w-full cursor-pointer items-center justify-between gap-5 border px-4 py-3 text-[11px] font-semibold uppercase tracking-[.1em] transition-[background,border-color,color,transform,box-shadow] duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-[var(--paper)] focus-visible:outline-offset-3 disabled:cursor-not-allowed disabled:opacity-50 ${
      categoryClasses[buttonProps.category]
    } ${className}`.trim()
  const isDisabled = disabled || loading

  return (
    <button
      {...props}
      type={type}
      onClick={buttonProps.onClick}
      className={cssClass}
      disabled={isDisabled}
      aria-busy={loading || undefined}
    >
      <span>{loading ? 'Loading...' : children ?? buttonProps.label}</span>
      {!loading && buttonProps.category !== 'ghost' && (
        <span className='text-[17px] leading-[.7]' aria-hidden='true'>
          ↗
        </span>
      )}
      {loading && <LoadingIndicator size='inline' aria-hidden='true' />}
    </button>
  )
}
