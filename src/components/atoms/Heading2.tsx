import React from 'react'

type Props = React.ComponentPropsWithoutRef<'h2'>

const Heading2: React.FC<Props> = ({ className = '', ...props }) => (
  <h2
    className={`font-semibold text-3xl lg:text-4xl leading-tight text-neutral-600 ${className}`}
    {...props}
  />
)

export default Heading2
