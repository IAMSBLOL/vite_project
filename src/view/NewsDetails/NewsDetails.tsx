import Header from '@commonUI/Header'
import Footer from '@commonUI/Footer'
import NewContent from './NewContent'
import Comments from './Comments'

const NewsDetails = () => {
  return (
    <div className="NewsDetails">
      <Header/>
      <NewContent />

      <Comments/>
      <Footer/>
    </div>
  )
}

export default NewsDetails
