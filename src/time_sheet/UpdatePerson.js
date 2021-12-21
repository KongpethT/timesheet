//import './css_person.css'
//import Input from './components/Input'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { api, keys } from './variable/config'

const UpdatePerson = () => {
    const [getRow, setRow] = useState({})
    const admin = getRow.state === "admin"
    const analyze = getRow.state === "analyze"
    const user = getRow.state === "user"

    useEffect(() => {
        const row = localStorage.getItem('dr')
        setRow(JSON.parse(row))
    }, [])

    const update_row = async () => {
        const id = getRow.id
        const key = JSON.stringify({ getRow, state: 'update' })
        await axios.post(`${api.ae}?key=${key}`, { id })
        window.location.href = "/person/view"
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
                            defaultChecked={(admin) ? "checked" : null}
                            onClick={(e) => { setRow({ ...getRow, state: e.target.value }) }} />
                        <label className="form-check-label" for="admin">Admin</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="state"
                            defaultValue="analyze"
                            defaultChecked={(analyze) ? "checked" : null}
                            onClick={(e) => { setRow({ ...getRow, state: e.target.value }) }} />
                        <label class="form-check-label" for="analyze">Analyze</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="state"
                            defaultValue="user"
                            defaultChecked={(user) ? "checked" : null}
                            onClick={(e) => { setRow({ ...getRow, state: e.target.value }) }} />
                        <label class="form-check-label" for="user">User</label>
                    </div>
                </div>

                <form>
                    <div className="mb-3">
                        <label for="code" className="form-label">Staff code</label>
                        <input
                            type="text"
                            className="form-control"
                            id="code"
                            aria-describedby="codeHelp"
                            defaultValue={getRow.code}
                            onChange={(e) => { setRow({ ...getRow, code: e.target.value }) }} />
                    </div>
                    <div className="mb-3">
                        <label for="firstname" className="form-label">First name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstname"
                            defaultValue={getRow.firstname}
                            onChange={(e) => { setRow({ ...getRow, firstname: e.target.value }) }} />
                    </div>
                    <div className="mb-3">
                        <label for="lastnamed" className="form-label">Last name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastnamed"
                            defaultValue={getRow.lastname}
                            onChange={(e) => { setRow({ ...getRow, lastname: e.target.value }) }} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={update_row}>Update</button>
                </form>
            </div>
        )
    }
}

export default UpdatePerson
