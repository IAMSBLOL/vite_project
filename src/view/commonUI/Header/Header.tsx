import { ChromeOutlined } from '@ant-design/icons'
import './Header.less'

const Header = () => {
  return (
    <div className='Header'>
      <div className='container mx-auto Header_wrap'>
        <div className='web_site_title text-red-600 antialiased font-semibold'>
          <ChromeOutlined className='logo'/>
          <p className='ml-4'>SY-Design</p>
        </div>
        <div className='user_center_wrap text-sm btn btn-xs btn-outline btn-primary'>
            SIGN IN
        </div>
      </div>
    </div>
  )
}

export default Header
