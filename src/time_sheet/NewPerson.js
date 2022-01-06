//import axios from 'axios'
import axios from 'axios'
import { useState } from 'react'
import { memory, keys, api, forms } from './configure/env'


const NewPerson = () => {
    const [getAlert, setAlert] = useState('')
    const [getPlaceholder, setPlaceholder] = useState('')
    const [getValue, setValue] = useState(
        {
            userCode: '',
            firstName: '',
            lastName: '',
            password: keys.get_default_password,
            userState: 'user'
        })
    const newAccount = () => {
        if (!!getValue.userCode & !!getValue.firstName & !!getValue.lastName) {
            console.log('OK');
            axios.post(api.person, { getValue }).then((brick) => {
                if (brick.status === 200) {
                    document.getElementById('defaultChecked').setAttribute('checked', 'checked')
                    setAlert(' | ' + forms.get_massage_success)
                    setValue({
                        userCode: '',
                        firstName: '',
                        lastName: '',
                    })
                }

            })
        } else {
            setPlaceholder(forms.get_placeholder_warning)
        }
    }

    if (memory.get_token === null) { window.location.href = "/" }
    else {
        return (
            <div>
                <h1>New account <span className='fs-5 text-success'>{getAlert}</span></h1>
                <hr />
                <div className='row g-3'>
                    <div className="col-md-12 text-center ">
                        <label className="form-check-label">Authorization</label>
                    </div>
                    {/** radio button*/}
                    <div></div>
                    <div className="row col-md-10 offset-sm-2 " >
                        {/**admin */}
                        <div className=" col-md-4 form-check">
                            <input
                                name="state"
                                className="form-check-input"
                                type="radio"
                                value="admin"
                                onClick={(e) => { setValue({ ...getValue, userState: e.target.value }) }} />
                            <label className="form-check-label" htmlFor="admin">Admin</label>
                        </div>
                        {/**analyze */}
                        <div className=" col-md-4 form-check">
                            <input
                                name="state"
                                className="form-check-input"
                                type="radio"
                                value="analyze"
                                onClick={(e) => { setValue({ ...getValue, userState: e.target.value }) }} />
                            <label className="form-check-label" htmlFor="analyze">Analyze</label>
                        </div>
                        {/**user */}
                        <div className=" col-md-4 form-check">
                            <input
                                id='defaultChecked'
                                name="state"
                                className="form-check-input"
                                type="radio"
                                value="user"
                                onClick={(e) => { setValue({ ...getValue, userState: e.target.value }) }}
                                defaultChecked="checked" />

                            <label className="form-check-label" htmlFor="user">User</label>
                        </div>
                    </div>
                    {/**staff userCode */}
                    <div className="col-md-2">
                        <label htmlFor="staffCode" className="form-label">Staff staffCode</label>
                        <input
                            type='number'
                            className="form-control"
                            id="staffCode"
                            placeholder={getPlaceholder}
                            value={getValue.userCode}
                            onChange={(e) => { setValue({ ...getValue, userCode: e.target.value }) }}
                        />
                    </div>
                    {/**first name */}
                    <div className="col-md-5">
                        <label htmlFor="firstname" className="form-label">First name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstname"
                            placeholder={getPlaceholder}
                            value={getValue.firstName}
                            onChange={(e) => { setValue({ ...getValue, firstName: e.target.value }) }}
                        />
                    </div>
                    {/**last name */}
                    <div className="col-md-5">
                        <label htmlFor="lastnamed" className="form-label">Last name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastnamed"
                            placeholder={getPlaceholder}
                            value={getValue.lastName}
                            onChange={(e) => { setValue({ ...getValue, lastName: e.target.value }) }}
                        />
                    </div>
                    {/**submit */}
                    <div className="col-md-3">
                        <button type="submit" className="btn btn-primary" onClick={newAccount}>Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewPerson
