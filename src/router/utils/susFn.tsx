
import { Suspense } from 'react'

// 路由分割必须得要、react的代码如此
export function SuspenseFn (Comp?: any) {
  return (
    <Suspense>
      {Comp}
    </Suspense>
  )
}
