import { useState } from 'react'
import { FaSignInAlt, FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { login } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isLoading, message } = useSelector((state) => state.auth)

  const onChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const onSubmit = (e) => {
    const userData = {
      email,
      password,
    }
    e.preventDefault()
    dispatch(login(userData))
    navigate('/')
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please log in to get support</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              onChange={onChange}
              placeholder='Enter your email'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              onChange={onChange}
              placeholder='Enter password'
              required
            />
          </div>

          <div className='form-group'>
            <button className='btn btn-block' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login
