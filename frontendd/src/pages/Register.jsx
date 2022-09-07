import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa' 
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
function Register() {
  const [formData, SetFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })
  const { name, email, password, password2 } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  //FOR SELECTING AUTH STATE
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )
  useEffect(() => {
    if(isError){
      toast.error(message)
    }

    //it is when user has logged in and redirecting to /
    if(isSuccess || user){
      navigate('/')
    }
    dispatch(reset())
  }, [user,isError, isSuccess, message, dispatch, navigate])

  const onChange = (e) => {
    SetFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const onSubmit = (e) => {
    e.preventDefault()
    //DISPATCH(sending someone to destination) USER        
    if (password !== password2) {
      toast.error('Passwords do not match')
    }
    else {
      const userData = {
        name,
        email,
        password,
      }
      //dispatching user in authSlice(register) ||  RESETTING EVERYTHING THE FORM AFTER USER HAS LOGGED IN 
      dispatch(register(userData))
    }

  }

  if(isLoading){
    return <Spinner />
  }
  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser />Register
        </h1>
        <p>Please register</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input type="text"
              className='form-control'
              id='name'
              name='name'
              values={name}
              placeholder='enter your name'
              onChange={onChange}>
            </input>
          </div>

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
            <input type="password2"
              className='form-control'
              id='password2'
              name='password2'
              values={password2}
              placeholder='confirm password'
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

export default Register