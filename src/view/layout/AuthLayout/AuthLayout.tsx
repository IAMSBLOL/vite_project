import './AuthLayout.less'
import { Outlet, useNavigate } from 'react-router-dom'
import { useLayoutEffect } from 'react'
import { isEmpty, isNil } from 'lodash'
const AuthLayout = () => {
  const navigate = useNavigate()
  useLayoutEffect(() => {
    const notLogin = localStorage.getItem('token')
    if (isNil(notLogin) || isEmpty(notLogin)) {
      navigate({
        pathname: '/'
      })
    }
  }, [navigate])
  return (
    <Outlet />
  )
}

export default AuthLayout
