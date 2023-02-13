import Header from '@commonUI/Header'
import CarouselContent from './CarouselContent'
import NewsList from './NewsList'
import './HomePage.less'

const HomePage = () => {
  return (
    <div className='HomePage'>
      <Header />
      <CarouselContent />

      <NewsList />
    </div>
  )
}

export default HomePage
