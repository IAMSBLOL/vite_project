import { Carousel } from 'antd';
import { useEffect, useState } from 'react';
import api from '@api'
import './CarouselContent.less'

const CarouselContent = () => {
  const [dataList, setDataList] = useState<any[]>([])
  useEffect(() => {
    const fetchList = async () => {
      const res = await api.get('https://r.inews.qq.com/web_feed/getPCList')
      console.log(res)
    }
    fetchList()
  }, [])
  return (
    <div className='CarouselContent container mx-auto mt-5'>
      <Carousel className='carousel w-full' autoplay>
        <div className="carousel-item w-full h-96 pb-4">
          <img src='http://www.81.cn/tp_207717/jdt_207718/_attachment/2023/01/31/10215708_18606b6cfcd10215708131.jpg' className='carousel_img'/>
        </div>
        <div className="carousel-item w-full h-96 pb-4">

          <img src='http://www.81.cn/2022zt/51641.files/banner.jpg' className='carousel_img'/>
        </div>
        <div className="carousel-item w-full h-96 pb-4">
          <img src='http://www.81.cn/2023zt/52401.files/banner.jpg' className='carousel_img'/>
        </div>
        <div className="carousel-item w-full h-96 pb-4">
          <img src='http://www.81.cn/2022zt/52301.files/banenr.png' className='carousel_img'/>
        </div>
      </Carousel>

    </div>
  )
}

export default CarouselContent
