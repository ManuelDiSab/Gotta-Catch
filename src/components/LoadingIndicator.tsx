import type { HTMLAttributes } from 'react'

type LoadingIndicatorProps = HTMLAttributes<HTMLDivElement> & {
  label?: string
  size?: 'inline' | 'panel'
}

export default function LoadingIndicator ({
  label,
  size = 'panel',
  className = '',
  ...props
}: LoadingIndicatorProps) {
  return (
    <div
      {...props}
      className={`capture-loader capture-loader--${size} ${className}`.trim()}
      role='status'
      aria-live='polite'
      aria-label={label ?? 'Caricamento in corso'}
    >
      <span className='capture-loader__ring' aria-hidden='true' />
      <span className='capture-loader__scan' aria-hidden='true' />
      <span className='capture-loader__core' aria-hidden='true' />
      <span className='capture-loader__orbit' aria-hidden='true' />
      {label && <span className='capture-loader__label'>{label}</span>}
    </div>
  )
}
