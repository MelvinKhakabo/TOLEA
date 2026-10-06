import type { ReactNode } from 'react'

export default function FormField({
  label,
  required,
  hint,
  children,
}: {
  label: string
  required?: boolean
  hint?: string
  children: ReactNode
}) {
  return (
    <label className="block">
      <span className="block text-[12.5px] font-medium text-umber mb-1.5">
        {label}
        {required && <span className="text-marigold ml-0.5">*</span>}
      </span>
      {children}
      {hint && <span className="block text-[11px] text-taupe mt-1">{hint}</span>}
    </label>
  )
}