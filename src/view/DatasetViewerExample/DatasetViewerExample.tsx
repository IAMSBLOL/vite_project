import DatasetViewer from '@src/components/DatasetViewer'
import { useEffect, useRef, useState } from 'react'
import { pose_detection, detection, car_pose_detection, segment } from './transfromUtils'
import './DatasetViewerExample.less'

const DatasetViewerExample = () => {
  const canvas = useRef<HTMLCanvasElement|null>(null)

  const viewer = useRef<DatasetViewer|null>(null)

  const [src, setSRc] = useState('')

  useEffect(() => {
    if (canvas.current) {
      // 需要拿到父容器信息，因为待会需要设置矩阵来自适应图片大小
      const { url, data }: any = detection()
      viewer.current = new DatasetViewer({
        canvasInstance: canvas.current,
        url,
        data,
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

  const handleTest_car_pose_detection = () => {
    const { url, data }: any = car_pose_detection()
    console.log(data)
    viewer.current?.resetConfig({
      url,
      data: data || [],
      opreationsConfig: {
        zoom: true
      }
    })
    viewer.current?.init()
  }

  const handleTestSegment = async () => {
    const { url, data }: any = await segment()

    viewer.current?.resetConfig({
      url,
      data: data || [],
      opreationsConfig: {
        zoom: true
      }
    })
    viewer.current?.init()
    setSRc(url)
  }

  return (
    <div className='shadow-lg m-2 DatasetViewerExample'>
      <div className='canvas_wrap'>
        <canvas ref={canvas} className='canvas' />
      </div>
      <div onClick={handleTest}>目标检测</div>
      <div onClick={handleTest}>分类</div>
      <div onClick={handleTest_car_pose_detection}>car_pose_detection</div>
      <div onClick={handleTestSegment}>通用分割</div>
      <div onClick={handleTestPose}>姿态检测</div>
      <img src={src}/>
    </div>
  )
}

export default DatasetViewerExample
