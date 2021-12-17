import './admin.css'
import Input from './components/Input'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { api, account as acc } from './variable/config'

const Admin = () => {
    const [account, setAccount] = useState([])
    const [count, setCount] = useState(0)
    const [getValue, setValue] = useState({ code: '', firstName: '', lastName: '', password: '1234', state: 'user' })


    useEffect(() => {
        const value = { state: 'state' }
        const key = JSON.stringify({ code: acc.userCode, state: 'read' })
        axios.get(`${api.ae}?key=${key}`).then((brick) => {
            setAccount(brick.data)

        })
    }, [count])

    const new_account = async () => {
        const key = JSON.stringify({ code: acc.userCode, state: 'create' })
        await axios.post(`${api.ae}?key=${key}`, { getValue })
        await setValue({ code: '', firstName: '', lastName: '', password: '1234', state: getValue.state })
        setCount(count + 1)
    }

    const reset_password = async (id) => {
        var answer = window.confirm("Confirm reset a password");
        if (answer) {
            const key = JSON.stringify({ code: acc.userCode, state: 'update' })
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
            const key = JSON.stringify({ code: acc.userCode, state: 'disable' })
            await axios.post(`${api.ae}?key=${key}`, { id })
            setCount(count + 1)
        }
        else {
            //some code
        }
    }


    return (
        <div id='admin-page'>
            <div className="create ">
                <div className='item-1'>
                    <Input
                        name="state"
                        value="admin"
                        type="radio"
                        title="Admin"
                        onClick={(e) => { setValue({ ...getValue, state: e.target.value }) }}
                    />
                    <Input
                        name="state"
                        value="analyze"
                        type="radio"
                        title="Analyze"
                        onClick={(e) => { setValue({ ...getValue, state: e.target.value }) }}
                    />

                    <Input
                        name="state"
                        value="user"
                        type="radio"
                        title="User"
                        onClick={(e) => { setValue({ ...getValue, state: e.target.value }) }}
                        defaultChecked="checked"

                    />
                </div>

                <div className='item-2'>
                    <div className='item'>
                        <Input
                            type="text"
                            placeholder="code"
                            value={getValue.code}
                            onChange={(e) => { setValue({ ...getValue, code: e.target.value }) }}
                        />
                    </div>
                    <div className='item'>
                        <Input
                            type="text"
                            placeholder="firstname"
                            value={getValue.firstName}
                            onChange={(e) => { setValue({ ...getValue, firstName: e.target.value }) }}
                        />
                    </div>
                    <div className='item'>
                        <Input t
                            ype="text"
                            placeholder="lastname"
                            value={getValue.lastName}
                            onChange={(e) => { setValue({ ...getValue, lastName: e.target.value }) }}
                        />
                    </div>

                </div>
                <div className='item-3'>
                    <div className='item'>
                        <Input type="button" value="ADD" onClick={new_account} />
                    </div>
                </div>
            </div>


            <div className='item-table'>
                <table>
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
                                    <td>
                                        <button onClick={() => { reset_password(row.id) }}>reset password</button>
                                        |
                                        <button onClick={() => { set_null_state({ id: row.id, fullName: row.fullName }) }}>delete</button></td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
        </div >)
}

export default Admin