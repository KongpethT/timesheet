import React, { useState } from 'react'
import logo from '../image/JCDecaux_logo.png'
import Axios from 'axios'
import { api, keys } from './variable/config'

export default function SignIn() {
  const [getAccount, setAccount] = useState({ username: null, password: null })
  const [getResult, setResult] = useState([])

  const next_page = () => {
    if (getResult.length !== 0) {
      localStorage.setItem('accessToken', getResult.token)
      localStorage.setItem('accessFullName', getResult[0].fullName)
      localStorage.setItem('accessCode', getResult[0].userCode)
      window.location.href = "/timeline/view"
    } else {
      window.location.href = "/signin"
    }
  }

  const isLogged = async () => {
    if (!!getAccount.username & !!getAccount.password) {
      await Axios.post(api.signin, { getAccount }).then((resporn) => { setResult(resporn.data) })
    }
  }
  if (keys.get_token !== null) {
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
            <button type="button" className="btn btn-primary" onMouseDown={isLogged} onMouseUp={next_page}>Login</button>
          </form>
        </div>
      </div >
    )
  }
}

