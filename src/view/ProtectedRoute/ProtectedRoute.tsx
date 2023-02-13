import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { LOGIN } from '@router'
type Props = {
    children: ReactNode | undefined
}

const ProtectedRoute = (props: Props) => {
//   const navigate = useNavigate()
  const login = localStorage.getItem('token')
  if (!login) {
    // navigate({
    //   pathname: LOGIN
    // })
    console.warn('1231211111113213')

    return <Navigate to={LOGIN}/>
  }
  console.log(props.children)
  return (
    <>{props.children}</>
  )
}

export default ProtectedRoute
