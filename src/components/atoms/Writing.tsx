import React from 'react'

type Size = 'sm' | 'md' | 'lg'

type Props = React.ComponentPropsWithoutRef<'p'> & {
  size?: Size
}

const sizeClasses: Record<Size, string> = {
  sm: 'text-sm leading-5',
  md: 'text-base leading-6',
  lg: 'text-lg leading-7',
}

const Writing: React.FC<Props> = ({ size = 'md', className = '', ...props }) => (
  <p
    className={`${sizeClasses[size]} ${className}`}
    {...props}
  />
)

export default Writing
