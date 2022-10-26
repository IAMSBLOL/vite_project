import DatasetViewer from '@src/components/DatasetViewer'
import { useEffect, useRef } from 'react'

import './DatasetViewerExample.less'

const DatasetViewerExample = () => {
  const canvas = useRef<HTMLCanvasElement|null>(null)

  const viewer = useRef<DatasetViewer|null>(null)

  useEffect(() => {
    if (canvas.current) {
      // 需要拿到父容器信息，因为待会需要设置矩阵来自适应图片大小

      viewer.current = new DatasetViewer({
        canvasInstance: canvas.current,
        url: 'http://s3.ceph.k8s.gddi.com/storage-ic5rlt/2022/10/25/6d2938c954a1c5a57e93b45909255ba06abc584b.jpg',
        data: [],
        opreationsConfig: {
          zoom: false
        }
      })

      viewer.current.init()
    }

    window.addEventListener('resize', () => {
      // 防抖
      viewer.current?.init()
    })
  }, [])

  const handleTest = () => {
    viewer.current?.resetConfig({
      url: 'http://s3.ceph.k8s.gddi.com/storage-0l6qoa/2022/10/25/2e9929be47d70c5b553f219aeb17549718d64997.jpg',
      data: [],
      opreationsConfig: {
        zoom: true
      }
    })
    viewer.current?.init()
  }

  return (
    <div className='shadow-lg m-2 DatasetViewerExample'>
      <div className='canvas_wrap'>
        <canvas ref={canvas} className='canvas' />
      </div>

      <div onClick={handleTest}>切换照片</div>
    </div>
  )
}

export default DatasetViewerExample
