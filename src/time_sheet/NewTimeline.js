import { api, memory } from './configure/env'
import { useState, useCallback, useEffect } from 'react'
import axios from 'axios'


const NewTimeline = () => {
    const account_id = JSON.parse(memory.get_account_id).value
    const [getBrick, setBrick] = useState({
        account_id: account_id, date: null, client_id: null, agency_id: null,
        client_type_id: null, visit_call: false, visit_AM: false, visit_PM: false,
        site_tour_AM: false, site_tour_PM: false, lunch: false, dinner: false, others: null
    })
    const [getAgency, setAgency] = useState([])
    const [getClient, setClient] = useState([])
    const [getClientType, setClientType] = useState([])

    const pushBrick = () => {
        if (!!getBrick.date & !!getBrick.agency_id & !!getBrick.client_id & !!getBrick.client_type_id) {
            axios.post(api.timeline, getBrick).then((brick) => {
                const result = brick.data
                if (result.affectedRows === 1) { window.location.href = '/timeline/view' }
            })
        }
    }

    const pullAgency = useCallback(() => {
        axios.get(`${api.customer}/agency/${memory.get_account_id}`).then((brick) => {
            setAgency(brick.data)
        })
    }, [])

    useEffect(() => {
        pullAgency()
    }, [pullAgency])

    const pullClient = useCallback(() => {
        axios.get(`${api.customer}/client/${getBrick.agency_id}`).then((brick) => {
            setClient(brick.data)
        })

    }, [getBrick.agency_id])

    useEffect(() => {
        pullClient()
    }, [pullClient])

    const pullClientType = useCallback(() => {
        axios.get(`${api.customer}/clientType`).then((brick) => {
            setClientType(brick.data)
        })
    }, [])

    useEffect(() => {
        pullClientType()
    }, [pullClientType])

    if (memory.get_token === null) { window.location.href = "/signin" }
    else {
        return (
            <div className="row g-3">
                <h1>New timeline</h1>
                <hr />
                {/**Date */}
                <div className="col-md-4">
                    <label htmlFor="inputDate" className="form-label">Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="inputDate"
                        onChange={(e) => { setBrick({ ...getBrick, date: e.target.value }) }} />
                </div>
                {/**Agency*/}
                <div className="col-md-8">
                    <label htmlFor="input agency_id" className="form-label">Name of agency</label>
                    <select
                        id='agency'
                        className="form-select"
                        aria-describedby=" agency_idHelp"
                        onChange={(e) => { setBrick({ ...getBrick, agency_id: e.target.value }) }} >
                        <option>...</option>
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
                        <option>...</option>
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
                        <option>...</option>
                        {getClientType.map((row, index) => {
                            return (
                                <option key={index} value={row.id}>{row.name}</option>
                            )
                        })}

                    </select>
                </div>
                {/**Call */}
                <div></div><div></div>
                <div className="row mb-3 offset-sm-1" >
                    <div className=" col-md-4 form-check">
                        <input type="checkbox" className="form-check-input"
                            onClick={(e) => { setBrick({ ...getBrick, visit_call: e.target.checked }) }} />
                        <label className="form-check-label" htmlFor="call">call</label>
                    </div>
                    {/**Visit AM */}
                    <div className=" col-md-4 form-check">
                        <input type="checkbox" className="form-check-input" id="visitAM"
                            onClick={(e) => { setBrick({ ...getBrick, visit_AM: e.target.checked }) }} />
                        <label className="form-check-label" htmlFor="visitAM">visit AM</label>
                    </div>
                    {/**Visit PM */}
                    <div className=" col-md-4 form-check">
                        <input type="checkbox" className="form-check-input" id="visitPM"
                            onClick={(e) => { setBrick({ ...getBrick, visit_PM: e.target.checked }) }} />
                        <label className="form-check-label" htmlFor="visitPM">visit PM</label>
                    </div>
                    {/**Site tour AM */}
                    <div className=" col-md-4 form-check">
                        <input type="checkbox" className="form-check-input" id="siteTourAM"
                            onClick={(e) => { setBrick({ ...getBrick, site_tour_AM: e.target.checked }) }} />
                        <label className="form-check-label" htmlFor="siteTourAM">site tour AM</label>
                    </div>
                    {/**Site tour PM*/}
                    <div className=" col-md-4 form-check">
                        <input type="checkbox" className="form-check-input" id="siteTourPM"
                            onClick={(e) => { setBrick({ ...getBrick, site_tour_PM: e.target.checked }) }} />
                        <label className="form-check-label" htmlFor="siteTourPM">site tour PM</label>
                    </div>
                    {/**Lunch */}
                    <div className=" col-md-4 form-check">
                        <input type="checkbox" className="form-check-input" id="lunch"
                            onClick={(e) => { setBrick({ ...getBrick, lunch: e.target.checked }) }} />
                        <label className="form-check-label" htmlFor="lunch">lunch</label>
                    </div>
                    {/**Dinner */}
                    <div className=" col-md-4 form-check">
                        <input type="checkbox" className="form-check-input" id="dinner"
                            onClick={(e) => { setBrick({ ...getBrick, dinner: e.target.checked }) }} />
                        <label className="form-check-label" htmlFor="dinner">dinner</label>
                    </div>
                </div>
                {/**Other */}
                <div className="mb-3">
                    <label htmlFor={'other'} className="form-label">Other</label>
                    <textarea className="form-control" id="other" placeholder="note example textarea"
                        onChange={(e) => { setBrick({ ...getBrick, others: e.target.value }) }}></textarea>
                    <div className="invalid-feedback">
                        Please enter a message in the textarea.
                    </div>
                </div>
                {/**Submit */}
                <div className="col-mb-3">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={pushBrick}>Submit</button>
                </div>
                <div></div>
            </div >
        )
    }
}

export default NewTimeline