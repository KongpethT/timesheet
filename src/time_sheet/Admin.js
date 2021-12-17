import './admin.css'
import Input from './components/Input'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { api } from './variable/config'

const Admin = () => {
    const [account, setAccount] = useState([])
    const [count, setCount] = useState(0)
    const [getValue, setValue] = useState({ code: '', firstName: '', lastName: '', password: '1234', state: 'user' })



    useEffect(() => {
        axios.get(api.ae).then((brick) => {
            setAccount(brick.data)

        })
    }, [count])

    const new_account = async () => {
        await axios.post(api.ae, { getValue })
        await setValue({ code: '', firstName: '', lastName: '', password: '1234', state: getValue.state })
        setCount(count + 1)
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
                            <th>code</th>
                            <th>name</th>
                            <th>status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {account.map((row, index) => {
                            return (
                                <tr key={index}>
                                    <td>{row.userCode}</td>
                                    <td>{row.fullName}</td>
                                    <td>{row.state}</td>
                                    <td><button>reset password</button> | <button>delete</button></td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
        </div >)
}

export default Admin