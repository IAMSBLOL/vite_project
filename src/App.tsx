import {

  RouterProvider,
} from 'react-router-dom';
import { Suspense } from 'react'
import router from '@router'
import './App.css'

function App () {
  return (
    <div className="App">
      <Suspense>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  )
}

export default App
