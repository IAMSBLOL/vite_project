import { Input, Radio } from 'antd';
import { HeatMapOutlined } from '@ant-design/icons'
import type { RadioChangeEvent } from 'antd';
import { useNavigate } from 'react-router-dom'
import { NEWS_DDTAILS } from '@router'
import './NewsList.less'

const { Search } = Input;
const Card = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    console.log(123)
    navigate({
      pathname: NEWS_DDTAILS
    })
  }
  return (
    <div className="card w-full bg-base-100 shadow-xl cursor-pointer hover:scale-105 hover:shadow-md cus_card" onClick={handleClick}>
      <div className="card-body">
        <h2 className="card-title">Shoes!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
      </div>
      <figure><img src="http://www.81.cn/tp_207717/_attachment/2023/01/12/10211669_e0be03360814252a729209.png" alt="Shoes" /></figure>
    </div>
  )
}

const NewsList = () => {
  const onChange = (e: RadioChangeEvent) => {
    console.log(`radio checked:${e.target.value}`);
  };

  return (
    <div className='NewsList container mx-auto mt-4'>
      <div className="navbar bg-base-100 search_wrap">
        <a className="btn btn-ghost normal-case text-xl"><HeatMapOutlined className='mr-1'/> 态势感知</a>
        <div>
          <div className='mr-4'>
            <Radio.Group onChange={onChange} defaultValue="a">
              <Radio.Button value="a">最新</Radio.Button>
              <Radio.Button value="b">热门</Radio.Button>
              <Radio.Button value="c">国内</Radio.Button>
              <Radio.Button value="d">国外</Radio.Button>
            </Radio.Group>
          </div>
          <Search placeholder="input search news" style={{ width: 200 }} />
        </div>
      </div>
      <div className='list_wrap grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-5'>
        {
          Array.from({ length: 25 }).fill('').map((o, i) => {
            return (
              <Card key={i}/>
            )
          })
        }
      </div>
    </div>
  )
}

export default NewsList
