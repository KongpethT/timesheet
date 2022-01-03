import { api, memory, forms } from './configure/env'
import { useState, useCallback, useEffect } from 'react'
import axios from 'axios'

const NewTimeline = () => {
    const [getBrick, setBrick] = useState({
        date: null, clientOfId: 0, agencyOfId: 0,
        clientOfType: null, call: false, visitAM: false, vistPM: false,
        siteTourAM: false, siteTourPM: false, lunch: false, dinner: false, other: null
    })
    const [getPlaceholder, setPlaceholder] = useState(null)
    const [getAgency, setAgency] = useState([])
    const [getClient, setClient] = useState([])

    const pushBrick = () => {
        if (!!getBrick.date & !!getBrick.agencyOfId & !!getBrick.clientOfId & !!getBrick.clientOfIdType) {
            axios.post(api.timeline, getBrick)
        } else {
            setPlaceholder(forms.get_placeholder_warning)
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
        axios.get(`${api.customer}/client/${getBrick.agencyOfId}`).then((brick) => {
            setClient(brick.data)
            console.log(brick.data);
        })

    }, [getBrick.agencyOfId])

    useEffect(() => {
        pullClient()
    }, [pullClient])

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
                    <label htmlFor="inputagencyOfId" className="form-label">Name of agency</label>
                    <select
                        id='agency'
                        className="form-select"
                        aria-describedby="agencyOfIdHelp"
                        onChange={(e) => { setBrick({ ...getBrick, agencyOfId: e.target.value }) }} >
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
                    <label htmlFor="inputclientOfId" className="form-label">Name of client</label>
                    <select
                        id='client'
                        className="form-select"
                        aria-describedby="clientOfIdHelp"
                        onChange={(e) => { setBrick({ ...getBrick, clientOfId: e.target.value }) }} >
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
                    <label htmlFor="inputclientOfType" className="form-label">Name of client type</label>
                    <input
                        type="text"
                        list="clientOfType"
                        className="form-control"
                        aria-describedby="NameOfMonthHelp"
                        id="inputclientOfIdType"
                        placeholder={getPlaceholder}
                        onChange={(e) => { setBrick({ ...getBrick, clientOfIdType: e.target.value }) }} />
                    <datalist id="clientOfIdType">
                        <option>...Name Of Client Type</option>
                    </datalist>
                </div>
                {/**Call */}
                <div></div><div></div>
                <div className="row mb-3 offset-sm-1" >
                    <div className=" col-md-4 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="call"
                            onClick={(e) => { setBrick({ ...getBrick, call: e.target.checked }) }} />
                        <label className="form-check-label" htmlFor="call">call</label>
                    </div>
                    {/**Visit AM */}
                    <div className=" col-md-4 form-check">
                        <input type="checkbox" className="form-check-input" id="visitAM" />
                        <label className="form-check-label" htmlFor="visitAM">visit AM</label>
                    </div>
                    {/**Visit PM */}
                    <div className=" col-md-4 form-check">
                        <input type="checkbox" className="form-check-input" id="visitPM" />
                        <label className="form-check-label" htmlFor="visitPM">visit PM</label>
                    </div>
                    {/**Site tour AM */}
                    <div className=" col-md-4 form-check">
                        <input type="checkbox" className="form-check-input" id="siteTourAM" />
                        <label className="form-check-label" htmlFor="siteTourAM">site tour AM</label>
                    </div>
                    {/**Site tour PM*/}
                    <div className=" col-md-4 form-check">
                        <input type="checkbox" className="form-check-input" id="siteTourPM" />
                        <label className="form-check-label" htmlFor="siteTourPM">site tour PM</label>
                    </div>
                    {/**Lunch */}
                    <div className=" col-md-4 form-check">
                        <input type="checkbox" className="form-check-input" id="lunch" />
                        <label className="form-check-label" htmlFor="lunch">lunch</label>
                    </div>
                    {/**Dinner */}
                    <div className=" col-md-4 form-check">
                        <input type="checkbox" className="form-check-input" id="dinner" />
                        <label className="form-check-label" htmlFor="dinner">dinner</label>
                    </div>
                </div>
                {/**Other */}
                <div className="mb-3">
                    <label htmlFor={'other'} className="form-label">Other</label>
                    <textarea className="form-control" id="other" placeholder="note example textarea" ></textarea>
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
            </div >
        )
    }
}

export default NewTimeline