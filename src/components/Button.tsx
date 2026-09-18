import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'dark';

const styles: Record<Variant, string> = {
  primary: 'bg-marigold text-umber',
  secondary: 'bg-transparent text-indigo border-[1.5px] border-indigo',
  dark: 'bg-umber text-ivory',
};

export default function Button({
  variant = 'primary',
  className = '',
  children,
  ...rest
}: { variant?: Variant } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`font-sans font-semibold text-[13.5px] px-5 py-3 rounded-md cursor-pointer ${styles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}