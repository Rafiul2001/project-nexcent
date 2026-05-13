import React from 'react'

type Props = React.ComponentPropsWithoutRef<'h1'>

const Heading1: React.FC<Props> = ({ className = '', ...props }) => (
  <h1
    className={`font-semibold text-5xl lg:text-6xl leading-tight lg:leading-19 text-neutral-600 ${className}`}
    {...props}
  />
)

export default Heading1
