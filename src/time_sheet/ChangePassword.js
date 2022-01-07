import axios from 'axios'
import { useCallback, useState } from 'react'
import { memory, forms, passwordValidity, alphabet, api } from './configure/env'

const ChangePassword = () => {
    if (memory.get_token === null) { window.location.href = '/' }
    const [getAlert, setAlert] = useState('')
    const [getBrick, setBrick] = useState({ current: '', new: '', confirm: '', id: JSON.parse(memory.get_account_id).value })
    const [getPlaceholder, setPlaceholder] = useState('')
    /**push brick update */
    const pushPassword = useCallback(() => {
        if (!getBrick.current | !getBrick.new | !getBrick.confirm) {
            setPlaceholder(forms.get_placeholder_warning)
        } else {
            setPlaceholder('')
            const isLength = (getBrick.new.length >= 8)
            const isEqual = (getBrick.new === getBrick.confirm)
            const brickArray = Array.from(getBrick.new)
            const isNumber = passwordValidity(Object.assign([], brickArray), alphabet.get_number)
            const isSpecial = passwordValidity(Object.assign([], brickArray), alphabet.get_special)
            const isCapital = passwordValidity(Object.assign([], brickArray), alphabet.get_capital)
            const isLowercase = passwordValidity(Object.assign([], brickArray), alphabet.get_lowercase)
            //const isCurrentPassword = false

            if (isLength) {
                if (isNumber & isSpecial & isCapital & isLowercase) {
                    if (isEqual) {
                        axios.put(`${api.person}/changedPassword`, { getBrick }).then((brick) => {

                            if (brick.data === 'change a password successfully') {
                                setBrick({ current: '', new: '', confirm: '' })
                                localStorage.clear()
                                window.location.href = '/'
                            } else {
                                setAlert(brick.data)
                            }
                        })
                    } else {
                        setAlert(' | The passwords do not match')
                    }
                } else {
                    setAlert(' | The password do not compatible. *sample ("!qaz2Wsx")')

                }
            } else {
                setAlert(' | The system require a password 8 at least alphabet. *sample ("!qaz2Wsx")')
            }
        }

    }, [getBrick])
    /**view */
    if (memory.get_token === null) { window.location.href = "/" }
    else {
        return (
            <div >
                <h1>View person <span className='text-warning' style={{ fontSize: '12px' }}>{getAlert}</span></h1>
                <hr />
                <div className='row g-3'>
                    {/**current password */}
                    <div className="col-md-4">
                        <label htmlFor="inputOldPassword" className="form-label">Current password</label>
                        <input
                            id="inputClient"
                            type="password"
                            className="form-control"
                            placeholder={getPlaceholder}
                            value={getBrick.current}
                            onChange={(e) => { setBrick({ ...getBrick, current: e.target.value }) }}
                        />
                    </div>
                    {/**new password */}
                    <div className="col-md-4">
                        <label htmlFor="inputNewPassword" className="form-label">New password</label>
                        <input
                            id="inputNewPassword"
                            type="password"
                            className="form-control"
                            placeholder={getPlaceholder}
                            value={getBrick.new}
                            onChange={(e) => { setBrick({ ...getBrick, new: e.target.value }) }}
                        />
                    </div>
                    {/**confirm password */}
                    <div className="col-md-4">
                        <label htmlFor="inputConfirmPassword" className="form-label">Confirm password</label>
                        <input
                            id="inputConfirmPassword"
                            type="password"
                            className="form-control"
                            placeholder={getPlaceholder}
                            value={getBrick.confirm}
                            onChange={(e) => { setBrick({ ...getBrick, confirm: e.target.value }) }}
                        />
                    </div>
                    {/**submit */}
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary" onClick={pushPassword}>Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChangePassword