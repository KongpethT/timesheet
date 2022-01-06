import { api, memory, forms } from './configure/env'
import { useState, useCallback, useEffect } from 'react'
import axios from 'axios'

const NewClient = () => {
    const [getAlert, setAlert] = useState('')
    const [getPlaceholder, setPlaceholder] = useState('')
    const [getAgency, setAgency] = useState([])
    const [getBrick, setBrick] = useState({ agencyId: '', client: '' })
    //pull table agency
    const pullAgency = useCallback(() => {
        axios.get(`${api.customer}/agency/${memory.get_account_id}`).then((brick) => {
            setAgency(brick.data)
        })
    }, [])
    useEffect(() => {
        pullAgency()
    }, [pullAgency])
    //push new client
    const pushClient = () => {
        if (!!getBrick.agencyId & !!getBrick.client) {
            axios.post(`${api.customer}/client`, { getBrick }).then((brick) => {
                if (brick.status === 200) {
                    document.getElementById('defaultSelect').setAttribute('selected', 'selected')
                    setPlaceholder('')
                    setBrick({ agencyId: '', client: '' })
                    setAlert(forms.get_massage_success)
                    setTimeout(() => {
                        setAlert('')
                    }, 3000)
                }
            })
        } else {
            setPlaceholder(forms.get_placeholder_warning)
        }
    }
    //view
    if (memory.get_token === null) { window.location.href = '/' } else {
        return (
            <div>
                <h1>New client <span className='fs-5'>{getAlert}</span></h1>
                <hr />
                <div className="row g-3">
                    {/**Agency*/}
                    <div className="col-md-8">
                        <label htmlFor="input agency_id" className="form-label">Name of agency</label>
                        <select
                            id='agency'
                            className="form-select"
                            aria-describedby=" agency_idHelp"
                            onChange={(e) => { setBrick({ ...getBrick, agencyId: e.target.value }) }} >
                            <option id='defaultSelect'>...</option>
                            {getAgency.map((row, index) => {
                                return (
                                    <option
                                        key={index}
                                        value={row.id}>
                                        {row.name}
                                    </option>)
                            })}
                        </select>
                    </div>
                    {/**Client */}
                    <div className="col-md-4">
                        <label htmlFor="inputClient" className="form-label">Name of client</label>
                        <input
                            id="inputClient"
                            type="text"
                            className="form-control"
                            placeholder={getPlaceholder}
                            value={getBrick.client}
                            onChange={(e) => { setBrick({ ...getBrick, client: e.target.value }) }}
                        />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary" onClick={pushClient}>Submit</button>
                    </div>
                </div>
            </div>
        )
    }

}

export default NewClient