
import { ReactComponent as ReactLogo } from '@assets/react.svg'
import DatasetViewerExample from '@view/DatasetViewerExample'
import './App.css'

function App () {
  return (
    <div className="App container mx-auto">

      <div className='title_wrap'>
        <h1>Example</h1>
        <div className='logo_wrap'>
          <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
            <img src="/vite.svg" className="logo" alt="Vite logo" />
          </a>
          <a href="https://reactjs.org" target="_blank" rel="noreferrer">
            <ReactLogo className="logo react" />
          </a>
        </div>
      </div>

      <DatasetViewerExample />
    </div>
  )
}

export default App
