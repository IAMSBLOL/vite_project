import DatasetViewer from '@src/components/DatasetViewer'
import { useEffect, useRef } from 'react'
import { pose_detection, detection } from './transfromUtils'
import './DatasetViewerExample.less'

const DatasetViewerExample = () => {
  const canvas = useRef<HTMLCanvasElement|null>(null)

  const viewer = useRef<DatasetViewer|null>(null)

  useEffect(() => {
    if (canvas.current) {
      // 需要拿到父容器信息，因为待会需要设置矩阵来自适应图片大小

      viewer.current = new DatasetViewer({
        canvasInstance: canvas.current,
        url: 'http://s3.ceph.k8s.gddi.com/storage-ic5rlt/2021/09/07/309b3801c353c115f2aaa0ef14650770013bcb50.jpg',
        data: [
          {
            label: 'banana',
            rectData: [24.145, 92.157, 285.789, 283.977],
            type:
              'CustomRect'
          }
        ],
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
    const { url, data }: any = detection()
    viewer.current?.resetConfig({
      url,
      data,
      opreationsConfig: {
        zoom: true
      }
    })
    viewer.current?.init()
  }

  const handleTestPose = () => {
    const { url, data } :any = pose_detection()
    viewer.current?.resetConfig({
      url,
      data: data || [],
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
      <div onClick={handleTest}>目标检测</div>
      <div onClick={handleTest}>分类</div>
      <div onClick={handleTest}>单目3D</div>
      <div onClick={handleTest}>通用分割</div>
      <div onClick={handleTestPose}>姿态检测</div>

    </div>
  )
}

export default DatasetViewerExample
