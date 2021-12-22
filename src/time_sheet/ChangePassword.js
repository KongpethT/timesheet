import { api, account, keys } from './variable/config'
import { IoPeople, IoCheckmark, IoCheckmarkDone } from "react-icons/io5";
import { useState, useEffect } from 'react';
import axios from 'axios';


const ChangePassword = () => {
    const [getPassword, setPassword] = useState({ oldPassword: '', newPassword: '', confirmPassword: '', userCode: account.get_staff_code })
    const [getCount, setCount] = useState(0)
    const [getAlert, setAlert] = useState(null)

    useEffect(() => {
        setAlert(localStorage.getItem('message'))
    }, [getCount])

    const exit = () => {
        localStorage.removeItem('message')
        setCount((getCount + 1) % 2)
        window.location.href = '/person/view'
    }

    const password_reset = (callback) => {
        if (getPassword.oldPassword !== '') {
            if (getPassword.newPassword === getPassword.confirmPassword & getPassword.newPassword.length >= 8) {
                axios.post(api.change_password, { getPassword }).then((brick) => {
                    const affectedRows = brick.data
                    console.log(0 === affectedRows.affectedRows);
                    if (affectedRows.affectedRows !== 0) {

                        localStorage.setItem('message', 'successfully ')
                        setCount((getCount + 1) % 2)
                    } else {

                        localStorage.setItem('message', 'unsuccessfully, The old password is invalid.')
                        setCount((getCount + 1) % 2)
                    }
                })

            } else {
                localStorage.setItem('message', 'unsuccessfully, need to new password at least 8 character sample(!Qa4xxxx)')
                setCount((getCount + 1) % 2)
            }
        }
    }


    if (keys.get_token === null) { window.location.href = "/signin" }
    else {
        return (
            <div lassName='container'>
                <h1>Change password</h1>
                {getAlert}
                <hr />
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
                <button type="submit" className="btn btn-primary" onClick={password_reset}>Submit</button>&#160;&#160;
                <button type="submit" className="btn btn-primary" onClick={exit}>Exit</button>
            </div>
        )
    }
}
export default ChangePassword
