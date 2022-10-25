import datasetViewer from '@src/components/DatasetViewer'
import { useEffect, useRef } from 'react'
import './DatasetViewerExample.less'

const DatasetViewerExample = () => {
  const canvas = useRef<HTMLCanvasElement|null>(null)

  useEffect(() => {
    if (canvas.current) {
      // 需要拿到父容器信息，因为待会需要设置矩阵来自适应图片大小
      const fatherNode = canvas.current.parentNode;
      console.log(fatherNode)

      datasetViewer(
        {
          canvasInstance: canvas.current,
          parrentNode: fatherNode as HTMLElement,
          url: 'http://s3.ceph.k8s.gddi.com/storage-ic5rlt/2022/10/25/6d2938c954a1c5a57e93b45909255ba06abc584b.jpg',
          data: [],
          opreationsConfig: {
            zoom: true
          }
        }
      )
    }
  }, [])

  return (
    <div className='shadow-lg m-2 DatasetViewerExample'>
      <div className='canvas_wrap'>
        <canvas ref={canvas} className='canvas' />
      </div>
    </div>
  )
}

export default DatasetViewerExample
