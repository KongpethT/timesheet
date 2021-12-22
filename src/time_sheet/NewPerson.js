import axios from 'axios'
import { useState } from 'react'
import { api, account, keys } from './variable/config'


const NewPerson = () => {
    const [getValue, setValue] = useState({ code: '', firstName: '', lastName: '', password: keys.get_default_password, state: 'user' })

    const new_account = async () => {
        if (!getValue.code & !getValue.firstName & !getValue.lastName) { } else {
            const key = JSON.stringify({ code: account.userCode, state: 'create' })
            await axios.post(`${api.ae}?key=${key}`, { getValue })
            window.location.href = '/person/view'
        }
    }
    if (keys.get_token === null) { window.location.href = "/signin" }
    else {
        return (
            <div className='container'>
                <h1>Edit persons</h1>
                <hr />
                <div className="mb-3">
                    <label className="form-check-label">Authorization</label>
                </div>

                <div className="mb-3">
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="state"
                            defaultValue="admin"
                            onClick={(e) => { setValue({ ...getValue, state: e.target.value }) }} />
                        <label className="form-check-label" for="admin">Admin</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="state"
                            defaultValue="analyze"
                            onClick={(e) => { setValue({ ...getValue, state: e.target.value }) }} />
                        <label class="form-check-label" for="analyze">Analyze</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="state"
                            defaultValue="user"
                            onClick={(e) => { setValue({ ...getValue, state: e.target.value }) }}
                            defaultChecked="checked" />

                        <label class="form-check-label" for="user">User</label>
                    </div>
                </div>

                <div className="mb-3">
                    <label for="code" className="form-label">Staff code</label>
                    <input
                        type="text"
                        className="form-control"
                        id="code"
                        aria-describedby="codeHelp"
                        value={getValue.code}
                        onChange={(e) => { setValue({ ...getValue, code: e.target.value }) }}
                    />
                </div>
                <div className="mb-3">
                    <label for="firstname" className="form-label">First name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstname"
                        value={getValue.firstName}
                        onChange={(e) => { setValue({ ...getValue, firstName: e.target.value }) }}
                    />
                </div>
                <div className="mb-3">
                    <label for="lastnamed" className="form-label">Last name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastnamed"
                        value={getValue.lastName}
                        onChange={(e) => { setValue({ ...getValue, lastName: e.target.value }) }}
                    />
                </div>
                <button type="submit" className="btn btn-primary" onClick={new_account}>OK</button>
            </div>
        )
    }
}

export default NewPerson
