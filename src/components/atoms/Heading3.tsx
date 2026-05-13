import React from 'react'

type Props = React.ComponentPropsWithoutRef<'h3'>

const Heading3: React.FC<Props> = ({ className = '', ...props }) => (
  <h3
    className={`font-semibold text-xl lg:text-2xl leading-snug text-neutral-600 ${className}`}
    {...props}
  />
)

export default Heading3
