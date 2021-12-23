import axios from 'axios'
import { useEffect, useState } from 'react'
import { api, account as acc, keys } from './variable/config'
import "bootstrap/dist/css/bootstrap.min.css";

const Person = () => {
    const [account, setAccount] = useState([])
    const [count, setCount] = useState(0)
    const [getRow, setRow] = useState({})

    useEffect(() => {
        const key = JSON.stringify({ code: acc.userCode, state: 'read' })
        axios.get(`${api.ae}?key=${key}`).then((brick) => {
            setAccount(brick.data)
        })
    }, [count])


    const reset_password = async (id) => {
        var answer = window.confirm("Confirm reset a password");
        if (answer) {
            const key = JSON.stringify({ code: acc.userCode, state: 'reset_password' })
            await axios.post(`${api.ae}?key=${key}`, { id })
        }
        else {
            //some code
        }
    }

    const set_null_state = async (ID) => {
        var answer = window.confirm(`Confirm delete " ${ID.fullName} " account`);
        if (answer) {
            const id = ID.id
            const key = JSON.stringify({ code: acc.userCode, state: 'disable_state' })
            await axios.post(`${api.ae}?key=${key}`, { id })
            setCount(count + 1)
        }
        else {
            //some code
        }
    }

    const row_edit = (e) => {
        localStorage.setItem('dr', JSON.stringify(getRow))
        window.location.href = '/person/edit'
    }

    if (keys.get_token === null) { window.location.href = "/signin" }
    else {
        return (
            <div className='container'>
                
                <h1>View persons</h1>
                <hr />
                <table className='table table-striped table-hover bg-light'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>name</th>
                            <th>status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {account.map((row, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{row.fullName}</td>
                                    <td>{row.state}</td>
                                    <td style={{ width: "30px" }}>
                                        <button
                                            //onClick={() => { reset_password(row.id) }}
                                            className='btn btn-warning btn-sm'
                                            data-bs-toggle="modal"
                                            data-bs-target="#staticBackdrop"
                                        >
                                            reset</button>
                                    </td>
                                    <td style={{ width: "30px" }}>
                                        <button onClick={() => { set_null_state({ id: row.id, fullName: row.fullName }) }} className='btn btn-danger btn-sm'>disable</button>
                                    </td>
                                    <td style={{ width: "30px" }}>
                                        <button
                                            className='btn btn-primary btn-sm'
                                            onMouseDown={() => {
                                                setRow(
                                                    {
                                                        id: row.id,
                                                        code: row.userCode,
                                                        firstname: row.firstName,
                                                        lastname: row.lastName,
                                                        state: row.state
                                                    }
                                                )
                                            }}
                                            onMouseUp={row_edit}
                                        >
                                            edit</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    Launch static backdrop modal
                </button>
                {/**Popup model */}
                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                ...
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Person
