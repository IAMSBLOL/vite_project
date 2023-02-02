
import React, { Suspense } from 'react'

// 路由分割必须得要、react的代码如此
export function SuspenseFn (Comp?: React.ReactNode | undefined) {
  return (
    <Suspense>
      {Comp}
    </Suspense>
  )
}
