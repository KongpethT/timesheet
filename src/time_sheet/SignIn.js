import React, { useEffect, useState } from 'react'
import Input from './components/Input'
import './SignIn.css'
import Axios from 'axios'
import { api } from './variable/config'

export default function SignIn() {
  //const { isLogged } = props
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [result, setResult] = useState([])
  const [message, setMessage] = useState(null)
  const [warning, setWarning] = useState(null)

  //1. give a data Username & Password and update useState (setUsername || setPassword)
  const isUsername = (e) => {
    setUsername(e.target.value)
  }
  const isPassword = (e) => {
    setPassword(e.target.value)
  }

  //2. checked a data login 
  useEffect(() => {
    if (result.count === 1) {
      localStorage.setItem('accessToken', result.token)
      localStorage.setItem('accessFullName', result.result[0].fullName)
      localStorage.setItem('accessCode', result.result[0].userCode)
      window.location.href = "/profile"
    }
    return () => { }
  }, [result])

  const isChecked = () => {
    Axios.post(api.signin, {
      userCode: username,
      password: password
    }).then((response) => { setResult(response.data) })
    //##########################
    setPassword('')
    setUsername('')
    setTimeout(() => {
      setMessage('Login Failed : "one more time to login"')
      setWarning('If you sure an account please contact to "Admin page"')
    }, 1000)

  }

  // view a webpage
  return (
    <div className='container'>
      <div className='sign-in'>
        <div className="header-point">
          <h1>Welcome to Timesheet Activity</h1>
          <h3 className="message-error">{message}</h3>
          <h4 className="message-warning">{warning}</h4>
        </div>

        <div>
          <Input
            width="60%"
            title="Username"
            type="text"
            value={username}
            onChange={isUsername}
          />
          <Input
            width="60%"
            title="Password"
            type="password"
            value={password}
            onChange={isPassword}
          />
          <Input width="80px" type="button" value="Login" onClick={isChecked} />
        </div>
      </div>
    </div>
  )
}

