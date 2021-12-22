import { api, account, keys } from './variable/config'
import { IoPeople, IoCheckmark, IoCheckmarkDone } from "react-icons/io5";
import { useState } from 'react';
import axios from 'axios';


const ChangePassword = () => {
    const [getPassword, setPassword] = useState({ oldPassword: '', newPassword: '', confirmPassword: '', userCode: account.get_staff_code })

    axios.get(api.message).then(
        (brick) => {
            localStorage.setItem('message', JSON.stringify(brick.data))
            //console.log(Object.entries(localStorage.getItem('message')))
            
            //const obj = localStorage.getItem('message')
        
        })


    const password_reset = (callback) => {
        if (getPassword.oldPassword !== '') {
            if (getPassword.newPassword === getPassword.confirmPassword & getPassword.newPassword.length >= 8) {
                axios.post(api.change_password, { getPassword })
            }
            else {
                localStorage.setItem('message', 'Passwords do not match or less 8 letter of length one more time')
            }
        }

    }


    if (keys.get_token === null) { window.location.href = "/signin" }
    else {
        return (
            <div lassName='container'>
                <h1>Change password</h1>
                {localStorage.getItem('message')}
                <hr />
                <form className='from-control'>
                    <div className="mb-3">
                        <label for="currentPassword" className="form-label"><IoPeople /> Current Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="currentPassword"
                            onChange={(e) => { setPassword({ ...getPassword, oldPassword: e.target.value }) }}
                        />
                    </div>
                    <div className="mb-3">
                        <label for="newPassword" className="form-label"><IoCheckmark /> New Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="newPassword"
                            onChange={(e) => { setPassword({ ...getPassword, newPassword: e.target.value }) }}
                        />
                    </div>
                    <div className="mb-3">
                        <label for="confirmPassword" className="form-label"><IoCheckmarkDone /> Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            onChange={(e) => { setPassword({ ...getPassword, confirmPassword: e.target.value }) }}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={password_reset}>Submit</button>&#160;
                    <button type="submit" className="btn btn-primary" onClick={() => { localStorage.removeItem('message') }}>Exit</button>
                </form>
            </div>
        )
    }
}
export default ChangePassword
