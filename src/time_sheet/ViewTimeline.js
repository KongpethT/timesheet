import axios from 'axios'
import React, { useEffect, useState, useCallback } from 'react'
import { api, memory } from './configure/env'
import { AiOutlineDeleteRow } from "react-icons/ai"

const ViewTimeline = () => {
    if (memory.get_token === null) { window.location.href = '/' }
    const [getTimeline, setTimeline] = useState([])
    const [getRowId, setRowId] = useState(0)
    const [getClientTypeName, setClientTypeName] = useState('null')
    const [getActivity, setActivity] = useState({})
    /**Pull timeline table */
    const pullTimline = useCallback(() => {
        axios.get(`${api.timeline}/${memory.get_account_id}/${getClientTypeName}`)
            .then((brick) => {
                setTimeline(brick.data)
            })
        if (getClientTypeName === '') { setClientTypeName('null') }
    }, [getClientTypeName])

    useEffect(() => {
        pullTimline()
    }, [pullTimline])
    /**Pull count activity of timeline */
    const pullCountActivity = useCallback(() => {
        axios.get(`${api.timeline}/count/${memory.get_account_id}/${getClientTypeName}`)
            .then((brick) => {
                const result = brick.data
                setActivity(result[0])
            })
        if (getClientTypeName === '') { setClientTypeName('null') }
    }, [getClientTypeName])
    useEffect(() => {
        pullCountActivity()
    }, [pullCountActivity])
    /**Delete row */
    const deleteRow = () => {
        if (window.confirm("Do you really want to delete?")) {
            axios.delete(`${api.timeline}/${getRowId}`).then((brick) => {
                const result = brick.data
                if (result.affectedRows === 1) { pullTimline(); pullCountActivity() }
            })
        }
    }
    /**view */
    if (memory.get_token === null) { window.location.href = "/" }
    else {
        return (
            <div >
                <h1>View Timeline</h1>
                <hr />
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search a name of client type"
                        onChange={(e) => { setClientTypeName(e.target.value) }} />
                </div>
                <div className="table-responsive mb-3">
                    <table className="table bg-light table-hover text-center table-bordered"
                        style={{
                            tableLayout: 'fixed',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}>
                        <thead className='bg-light'>
                            <tr>
                                <th style={{ width: '50px' }}></th>
                                <th style={{ width: '50px' }}>#</th>
                                <th style={{ width: '100px' }}>date</th>
                                <th style={{ width: '100px' }}>client</th>
                                <th style={{ width: '240px' }}>agency</th>
                                <th style={{ width: '100px' }}>
                                    <button type="button" className="btn btn-outline-light position-relative">
                                        <span className="badge bg-success">{getActivity.ClientTypeId}</span>
                                    </button>
                                    <br />client type</th>
                                <th style={{ width: '100px' }}>
                                    <button type="button" className="btn btn-outline-light position-relative">
                                        <span className="badge bg-success">{getActivity.VisitCall}</span>
                                    </button>
                                    <br />
                                    call</th>
                                <th style={{ width: '100px' }}>
                                    <button type="button" className="btn btn-outline-light position-relative">
                                        <span className="badge bg-success">{getActivity.VisitAM}</span>
                                    </button>
                                    <br />
                                    visit AM</th>
                                <th style={{ width: '100px' }}>
                                    <button type="button" className="btn btn-outline-light position-relative">
                                        <span className="badge bg-success">{getActivity.VisitPM}</span>
                                    </button>
                                    <br />visit PM</th>
                                <th style={{ width: '110px' }}>
                                    <button type="button" className="btn btn-outline-light position-relative">
                                        <span className="badge bg-success">{getActivity.SiteTourAM}</span>
                                    </button>
                                    <br />
                                    site tour AM</th>
                                <th style={{ width: '110px' }}>
                                    <button type="button" className="btn btn-outline-light position-relative">
                                        <span className="badge bg-success">{getActivity.SiteTourPM}</span>
                                    </button>
                                    <br />
                                    site tour PM</th>
                                <th style={{ width: '100px' }}>
                                    <button type="button" className="btn btn-outline-light position-relative">
                                        <span className="badge bg-success">{getActivity.Lunch}</span>
                                    </button>
                                    <br />
                                    lunch</th>
                                <th style={{ width: '100px' }}>
                                    <button type="button" className="btn btn-outline-light position-relative">
                                        <span className="badge bg-success">{getActivity.Dinner}</span>
                                    </button>
                                    <br />
                                    dinner</th>
                                <th style={{ width: '350px', textAlign: 'left' }}>
                                    <button type="button" className="btn btn-outline-light position-relative">
                                        <span className="badge bg-success">{getActivity.Others}</span>
                                    </button>
                                    <br />
                                    others</th>
                            </tr>
                        </thead>
                        <tbody>

                            {getTimeline.map((row, index) => {

                                return (
                                    <tr key={index} onMouseEnter={() => { setRowId(row.id) }}>
                                        <td
                                            onClick={deleteRow}>
                                            <button
                                                data-bs-toggle="tooltip"
                                                data-bs-placement="right"
                                                title="Tooltip on right"
                                                className='btn btn-md' style={{ margin: '-8px 0 0 0' }}>
                                                <AiOutlineDeleteRow className='text-danger' /></button></td>
                                        <td>{index + 1}</td>
                                        <td>{row.date}</td>
                                        <td>{row.name_of_client}</td>
                                        <td>{row.name_of_agency}</td>
                                        <td>{row.client_type}</td>
                                        <td>{row.visit_call}</td>
                                        <td>{row.visit_AM}</td>
                                        <td>{row.visit_PM}</td>
                                        <td>{row.site_tour_AM}</td>
                                        <td>{row.site_tour_PM}</td>
                                        <td>{row.lunch}</td>
                                        <td>{row.dinner}</td>
                                        <td style={{ color: 'green' }}>{row.others}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div >
        )
    }
}

export default ViewTimeline