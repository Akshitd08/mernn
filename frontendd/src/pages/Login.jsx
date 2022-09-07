import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
function Login() {
  const [formData, SetFormData] = useState({
    email: '',
    password: '',
  })

  const onChange = (e) => {
    SetFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const onSubmit = (e) => {
    e.preventDefault()
    const userData = {
      email,
      password,
    }
    dispatch(login(userData))
  }

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  //FOR SELECTING AUTH STATE
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    //it is when user has logged in and redirecting to /
    if (isSuccess || user) {
      navigate('/')
    }
    dispatch(reset())
  }, [user, isError, isSuccess, message, dispatch, navigate])

  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt />Login
        </h1>
        <p>Getting Started</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>

          <div className='form-group'>
            <input type="email"
              className='form-control'
              id='email'
              name='email'
              values={email}
              placeholder='enter your email'
              onChange={onChange}>
            </input>
          </div>

          <div className='form-group'>
            <input type="password"
              className='form-control'
              id='password'
              name='password'
              values={password}
              placeholder='enter password'
              onChange={onChange}>
            </input>
          </div>

          <div className='form-group'>
            <button type='submit' className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login