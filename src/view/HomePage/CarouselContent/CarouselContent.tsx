import { Carousel } from 'antd';
// import { useEffect, useState } from 'react';
// import api from '@api'
import './CarouselContent.less'

const CarouselContent = () => {
  // const [dataList, setDataList] = useState<any[]>([])
  // useEffect(() => {
  //   const fetchList = async () => {
  //     const res = await api.get('https://r.inews.qq.com/web_feed/getPCList')
  //     console.log(res)
  //   }
  //   fetchList()
  // }, [])
  return (
    <div className='CarouselContent max-w-xl rounded-lg shadow-2xl mt-5'>
      <Carousel className='carousel w-full' autoplay>
        <div className="carousel-item w-full h-96 pb-4">
          <img src='http://www.81.cn/tp_207717/_attachment/2023/01/31/10215707_18606b6ce8f10215707125.jpg' className='carousel_img'/>
        </div>
        <div className="carousel-item w-full h-96 pb-4">

          <img src='http://www.81.cn/tp_207717/_attachment/2023/02/07/16199970_f1d1dad4a80a8dac3221a294c4313d2a.jpg' className='carousel_img'/>
        </div>
        <div className="carousel-item w-full h-96 pb-4">
          <img src='http://www.81.cn/tp_207717/_attachment/2023/01/11/10211372_e0be033608142528f9d719.jpg' className='carousel_img'/>
        </div>
        <div className="carousel-item w-full h-96 pb-4">
          <img src='http://www.81.cn/tp_207717/_attachment/2023/01/05/10209869_1857f5be45610209869224.jpg' className='carousel_img'/>
        </div>
      </Carousel>

    </div>
  )
}

export default CarouselContent
