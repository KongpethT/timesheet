import axios from 'axios'
import { useEffect, useState } from 'react'
import { api, account as acc } from './variable/config'

const Person = () => {
    const [account, setAccount] = useState([])
    const [count, setCount] = useState(0)
    const [getRow, setRow] = useState({})

    useEffect(() => {
        //const value = { state: 'state' }
        const key = JSON.stringify({ code: acc.userCode, state: 'read' })
        axios.get(`${api.ae}?key=${key}`).then((brick) => {
            setAccount(brick.data)
        })
    }, [count])


    const reset_password = async (id) => {
        var answer = window.confirm("Confirm reset a password");
        if (answer) {
            const key = JSON.stringify({ code: acc.userCode, state: 'update_password' })
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
                                    <button onClick={() => { reset_password(row.id) }} className='btn btn-warning btn-sm'>reset</button>
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
                                                    firstname:row.firstName,
                                                    lastname:row.lastName,
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
        </div>
    )
}

export default Person
