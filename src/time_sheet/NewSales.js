import { api, memory, dates, forms } from './configure/env'
import { useState, useCallback, useEffect } from 'react'
import axios from 'axios'


const NewSales = () => {
    if (memory.get_token === null) { window.location.href = '/' }
    const account_id = JSON.parse(memory.get_account_id).value
    const [getPlaceholder, setPlaceholder] = useState('...')
    const [getAlert, setAlert] = useState('')
    const [getBrick, setBrick] = useState({
        account_id: account_id, agency_id: null, client_id: null,
        client_type_id: null, year: dates.get_year
    })
    const [getAgency, setAgency] = useState([])
    const [getClient, setClient] = useState([])
    const [getClientType, setClientType] = useState([])
    /**push table forecase */
    const pushBrick = () => {
        if (!!getBrick.year & !!getBrick.agency_id & !!getBrick.client_id & !!getBrick.client_type_id) {
            axios.post(api.sales, getBrick).then((brick) => {
                const result = brick.data
                if (result.affectedRows === 1) {
                    document.getElementById('default1').setAttribute('selected', 'selected')
                    document.getElementById('default2').setAttribute('selected', 'selected')
                    document.getElementById('default3').setAttribute('selected', 'selected')
                    setAlert(' | ' + forms.get_massage_success)
                    setTimeout(() => { setAlert('') }, 3000)
                }
            })
        } else {
            setPlaceholder(forms.get_placeholder_warning)
            setTimeout(() => { (setPlaceholder('...')) }, 3000)
        }
    }
    /**pull table agency */
    const pullAgency = useCallback(() => {
        axios.get(`${api.customer}/agency/${memory.get_account_id}`).then((brick) => {
            setAgency(brick.data)
        })
    }, [])
    useEffect(() => {
        pullAgency()
    }, [pullAgency])
    /**pull table client */
    const pullClient = useCallback(() => {
        axios.get(`${api.customer}/client/${getBrick.agency_id}`).then((brick) => {
            setClient(brick.data)
        })

    }, [getBrick.agency_id])
    useEffect(() => {
        pullClient()
    }, [pullClient])
    /**pull table client type */
    const pullClientType = useCallback(() => {
        axios.get(`${api.customer}/clientType`).then((brick) => {
            setClientType(brick.data)
        })
    }, [])
    useEffect(() => {
        pullClientType()
    }, [pullClientType])
    /**view */
    if (memory.get_token === null) { window.location.href = "/" }
    else {
        return (
            <div>
                <h1>Open sales <span className='text-success fs-5'>{getAlert}</span></h1>
                <hr />
                <div className="row g-3">
                    {/**Year */}
                    <div className="col-md-4">
                        <label htmlFor="inputDate" className="form-label">Year</label>
                        <select
                            id='year'
                            className="form-select"
                            aria-describedby=" agency_idHelp"
                            onChange={(e) => { setBrick({ ...getBrick, year: e.target.value }) }} >
                            <option value={dates.get_year}>{dates.get_year}</option>
                            <option value={dates.get_year - 1}>{dates.get_year - 1}</option>
                            <option value={dates.get_year}>{dates.get_year}</option>
                            <option value={parseInt(dates.get_year) + 1}>{parseInt(dates.get_year) + 1}</option>
                        </select>
                    </div>
                    {/**Agency*/}
                    <div className="col-md-8">
                        <label htmlFor="input agency_id" className="form-label">Name of agency</label>
                        <select
                            id='agency'
                            className="form-select"
                            aria-describedby=" agency_idHelp"
                            onChange={(e) => { setBrick({ ...getBrick, agency_id: e.target.value }) }} >
                            <option id='default1'>{getPlaceholder}</option>
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
                    <div className="col-md-8">
                        <label htmlFor="inputclient_id" className="form-label">Name of client</label>
                        <select
                            id='client'
                            className="form-select"
                            aria-describedby="client_idHelp"
                            onChange={(e) => { setBrick({ ...getBrick, client_id: e.target.value }) }} >
                            <option id='default2'>{getPlaceholder}</option>
                            {getClient.map((row, index) => {
                                return (
                                    <option key={index} value={row.id}>{row.name}</option>
                                )
                            })}

                        </select>
                    </div>
                    {/**ClientType */}
                    <div className="col-md-4">
                        <label htmlFor="inputclient_type_id" className="form-label">Name of client type</label>
                        <select
                            id='clientType'
                            className="form-select"
                            aria-describedby="clientTypeHelp"
                            onChange={(e) => { setBrick({ ...getBrick, client_type_id: e.target.value }) }} >
                            <option id='default3'>{getPlaceholder}</option>
                            {getClientType.map((row, index) => {
                                return (
                                    <option key={index} value={row.id}>{row.name}</option>
                                )
                            })}

                        </select>
                    </div>
                    {/**Submit */}
                    <div className="col-mb-12">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={pushBrick}>Submit</button>
                    </div>
                    <div className="col-mb-12"></div>
                </div>
            </div>
        )
    }
}

export default NewSales