import { PropsWithChildren, useState, Children } from 'react'
import { useTrail, a } from '@react-spring/web'

// https://codesandbox.io/s/yps54?file=/src/App.tsx:0-718
function Trail({ open, children }: PropsWithChildren<{ open: boolean }>) {
//             {Children?.map(children, (child, index) => {
//                 if (isValidElement(child)) {  
  const items = Children.toArray(children)
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? 110 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  })

  return (
    <div>
      {trail.map(({ height, ...style }, index) => (
        <a.div key={index} className="" style={style}>
          <a.div style={{ height }}>{items[index]}</a.div>
        </a.div>
      ))}
    </div>
  )
}

export default Trail;