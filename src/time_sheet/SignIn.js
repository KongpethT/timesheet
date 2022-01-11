import React, { useState } from 'react'
import logo from '../image/JCDecaux_logo.png'
import axios from 'axios'
import { api, memory, storage, forms } from './configure/env'

export default function SignIn() {
  const [getAccount, setAccount] = useState({ username: '', password: '' })
  const [getAlert, setAlert] = useState('')
  const isLogged = () => {
    if (!!getAccount.username & !!getAccount.password) {
      axios.post(api.signin, { email: getAccount.username, password: getAccount.password }).then((brick => {
        const data = brick.data
        if (data.error === 401) {
          //console.log('error-----401');
          setAlert(forms.get_message_login_error1 + '\n' + forms.get_message_login_error2)
          setAccount({ username: '', password: '' })
          setTimeout(() => { setAlert('') }, 3000)
        } else {
          const private_id = data.values
          const token = data.token
          const obj = {
            token: token,
            email: private_id.email_id,
            full_name: private_id.full_name,
            user_code: private_id.user_code,
            state_code: private_id.user_state,
            account_id: private_id.account_id,
          }
          for (let key in obj) {
            storage(obj[key], key)
          }
          if (private_id.user_state === 'gm') {
            window.location.href = '/tools/dashboard'
          }
          if (private_id.user_state === 'admin') {
            window.location.href = '/person/view'
          }
          if (private_id.user_state === 'user') {
            window.location.href = '/sales/view'
          }
          if (private_id.user_state === 'analyze') {
            window.location.href = '/sales/admin/view'
          }
        }
      }))
    }
  }


  if (memory.get_token !== null) {
    (memory.get_state_code === 'user') ? window.location.href = '/timeline/view' : window.location.href = '/tools/dashboard'
  } else {
    return (
      <div style={{
        height: "calc(100vh - 120px)",
        display: "flex",
        alignItems: "center",
        justifyItems: "center",
        paddingTop: "40px",
        paddingBottom: "40px",
      }}>
        <div style={{
          margin: "0 auto",
          textAlign: "center"
        }}>
          {/**logo */}
          <img src={logo} className="img-fluid" alt="logo" />
          {/**alert message */}
          <div className='mb-3'>
            <div id="usernameHelp" className="form-text text-warning">{getAlert}</div>
          </div>
          {/**username */}
          <div className="mb-3">
            <label className="form-label text-light">Username</label>
            <input
              type="email"
              className="form-control text-center"
              id="username"
              value={getAccount.username}
              onChange={(e) => { setAccount({ ...getAccount, username: e.target.value }) }}
            />
            <div id="usernameHelp" className="form-text">We'll never share your username with anyone else.</div>
          </div>
          {/**password */}
          <div className="mb-3">
            <label className="form-label text-light">Password</label>
            <input
              type="password"
              className="form-control text-center"
              id="password"
              value={getAccount.password}
              onChange={(e) => { setAccount({ ...getAccount, password: e.target.value }) }}
            />
          </div>
          <button type="button" className="btn btn-primary" onMouseUp={isLogged} >Login</button>

        </div>
      </div >
    )
  }
}

