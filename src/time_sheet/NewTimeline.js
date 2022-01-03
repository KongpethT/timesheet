import { api, memory, forms } from './configure/env'
import { useState, useCallback, useEffect } from 'react'
import axios from 'axios'
import { useRowState } from 'react-table'

const NewTimeline = () => {
    const [getBrick, setBrick] = useState({
        date: null, nameOfClient: null, nameOfAgency: null,
        nameOfClientType: null, call: false, visitAM: false, vistPM: false,
        siteTourAM: false, siteTourPM: false, lunch: false, dinner: false, other: null
    })
    const [getPlaceholder, setPlaceholder] = useState(null)
    const [getAgency, setAgency] = useState([])
    const [getClient, setClient] = useState([])
    const pushBrick = () => {
        if (!!getBrick.date & !!getBrick.nameOfAgency & !!getBrick.nameOfClient & !!getBrick.nameOfClientType) {
            axios.post(api.timeline, getBrick)
        } else {
            setPlaceholder(forms.get_placeholder_warning)
        }
    }

    const pullCustomer = useCallback(() => {
        axios.get(`${api.customer}/${memory.get_account_id}`).then((brick) => {
            const rows = [brick.data]
            const agency = []
            const client = []
            rows[0].map((row) => {
                agency.push(row.agencyOfId, row.nameOfAgency)
                client.push(row.clientOfId, row.nameOfClient)
            })



            setAgency(agency.filter((v, i, a) => a.indexOf(v) === i))
            // setAgency(agency)
            // setClient(client)
        })
    }, [])


    useEffect(() => {
        pullCustomer()
    }, [pullCustomer])

    if (memory.get_token === null) { window.location.href = "/signin" }
    else {
        return (
            <div className="row g-3">
                <h1>New timeline</h1>
                <hr />
                <div className="col-md-4">
                    <label htmlFor="inputDate" className="form-label">Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="inputDate"
                        onChange={(e) => { setBrick({ ...getBrick, date: e.target.value }) }} />
                </div>

                <div className="col-md-8">
                    <label htmlFor="inputNameOfAgency" className="form-label">Name of agency</label>
                    <input
                        type="text"
                        list="NameOfAgency"
                        className="form-control"
                        aria-describedby="NameOfMonthHelp"
                        id="inputNameOfAgency"
                        placeholder={getPlaceholder}
                        onChange={(e) => { setBrick({ ...getBrick, nameOfAgency: e.target.value }) }} />
                    <datalist id="NameOfAgency">
                       {getAgency.map((row,index)=>{return(<option defaultValue={row.agencyOfId} key={index}>{row}</option>)})}
                    </datalist>
                </div>

                <div className="col-md-8">
                    <label htmlFor="inputNameOfClient" className="form-label">Name of client</label>
                    <input
                        type="text"
                        list="nameOfClient"
                        className="form-control"
                        aria-describedby="NameOfMonthHelp"
                        id="inputNameOfClient"
                        placeholder={getPlaceholder}
                        onChange={(e) => { setBrick({ ...getBrick, nameOfClient: e.target.value }) }} />
                    <datalist id="nameOfClient">
                        <option>...Name Of Client</option>
                    </datalist>

                </div>

                <div className="col-md-4">
                    <label htmlFor="inputNameOfClientType" className="form-label">Name of client type</label>
                    <input
                        type="text"
                        list="nameOfClientType"
                        className="form-control"
                        aria-describedby="NameOfMonthHelp"
                        id="inputNameOfClientType"
                        placeholder={getPlaceholder}
                        onChange={(e) => { setBrick({ ...getBrick, nameOfClientType: e.target.value }) }} />
                    <datalist id="nameOfClientType">
                        <option>...Name Of Client Type</option>
                    </datalist>
                </div>

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

                    <div className=" col-md-4 form-check">
                        <input type="checkbox" className="form-check-input" id="visitAM" />
                        <label className="form-check-label" htmlFor="visitAM">visit AM</label>
                    </div>

                    <div className=" col-md-4 form-check">
                        <input type="checkbox" className="form-check-input" id="visitPM" />
                        <label className="form-check-label" htmlFor="visitPM">visit PM</label>
                    </div>
                    <div className=" col-md-4 form-check">
                        <input type="checkbox" className="form-check-input" id="siteTourAM" />
                        <label className="form-check-label" htmlFor="siteTourAM">site tour AM</label>
                    </div>

                    <div className=" col-md-4 form-check">
                        <input type="checkbox" className="form-check-input" id="siteTourPM" />
                        <label className="form-check-label" htmlFor="siteTourPM">site tour PM</label>
                    </div>

                    <div className=" col-md-4 form-check">
                        <input type="checkbox" className="form-check-input" id="lunch" />
                        <label className="form-check-label" htmlFor="lunch">lunch</label>
                    </div>
                    <div className=" col-md-4 form-check">
                        <input type="checkbox" className="form-check-input" id="dinner" />
                        <label className="form-check-label" htmlFor="dinner">dinner</label>
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor={'other'} className="form-label">Other</label>
                    <textarea className="form-control" id="other" placeholder="note example textarea" ></textarea>
                    <div className="invalid-feedback">
                        Please enter a message in the textarea.
                    </div>
                </div>

                <div className="col-mb-3">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={pushBrick}>Submit</button>
                </div>
            </div>
        )
    }
}

export default NewTimeline