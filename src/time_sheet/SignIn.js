import React, { useState } from 'react'
import logo from '../image/JCDecaux_logo.png'
import axios from 'axios'
import { api, memory, storage } from './configure/env'

export default function SignIn() {
  const [getAccount, setAccount] = useState({ username: null, password: null })
  const isLogged = () => {
    if (!!getAccount.username & !!getAccount.password) {
      axios.get(`${api.signin}/${getAccount.username}/${getAccount.password}`).then((brick => {
        const data = brick.data
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
          //console.log('key: ', key);
          //console.log('value:', obj[key]);
        }
        window.location.href = '/timeline/view'
      }))
    }
  }


  if (memory.get_token !== null) {
    window.location.href = '/timeline/view'
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
          <img src={logo} className="img-fluid" alt="logo" />
          <form className='form'>
            <div className="mb-3">
              <label className="form-label text-light">Username</label>
              <input
                type="text"
                className="form-control text-center"
                id="username"
                onChange={(e) => { setAccount({ ...getAccount, username: e.target.value }) }}
              />
              <div id="usernameHelp" className="form-text">We'll never share your username with anyone else.</div>
            </div>

            <div className="mb-3">
              <label className="form-label text-light">Password</label>
              <input
                type="password"
                className="form-control text-center"
                id="password"
                onChange={(e) => { setAccount({ ...getAccount, password: e.target.value }) }}
              />
            </div>
            <button type="button" className="btn btn-primary" onMouseUp={isLogged} >Login</button>
          </form>
        </div>
      </div >
    )
  }
}

