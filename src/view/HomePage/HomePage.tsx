import Header from '@commonUI/Header'
import Footer from '@commonUI/Footer'
import CarouselContent from './CarouselContent'
import NewsList from './NewsList'
import AudioConcatenator from './audio/audio'
import './HomePage.less'

import { useEffect, useRef } from 'react'

const HomePage = () => {
  const handle = useRef(new AudioConcatenator({
    wait: 5000
  }))

  useEffect(() => {
    handle.current.loadResources([
      '/haha.mp3',
      '/test.mp3',
      '/noproblem.mp3'
    ]);

    setTimeout(() => {
      window.clearInterval(handle.current.timer)
      handle.current.loadResources([
        '/haha.mp3',
        '/test.mp3',

      ]);
    }, 10000)
  }, [])

  return (
    <div className='HomePage'>

      {/* <audio autoPlay src={url}></audio> */}
      <Header />
      <div className="hero bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">

          <CarouselContent />
          <div>
            <h1 className="text-5xl font-bold">全球军事态势</h1>
            <p className="py-6">百年变局加速演进，世界并不太平。我们始终如一珍视和平和发展，始终如一珍惜朋友和伙伴，坚定站在历史正确的一边、站在人类文明进步的一边，努力为人类和平与发展事业贡献中国智慧、中国方案。</p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>

      <NewsList />
      <Footer />
    </div>
  )
}

export default HomePage
