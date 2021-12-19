import './css_person.css'
import Input from './components/Input'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { api, account as acc } from './variable/config'

const NewPerson = () => {
    //const [account, setAccount] = useState([])
    const [getValue, setValue] = useState({ code: '', firstName: '', lastName: '', password: '1234', state: 'user' })

    const new_account = async () => {
        const key = JSON.stringify({ code: acc.userCode, state: 'create' })
        await axios.post(`${api.ae}?key=${key}`, { getValue })
        await setValue({ code: '', firstName: '', lastName: '', password: '1234', state: getValue.state })
        window.location.href = '/person/view'
    }

    return (
        <div className='container'>
            <h1>New persons</h1>
            <hr />
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
            </div >
        </div>
    )
}

export default NewPerson
