import axios from 'axios'
import React, { useEffect, useState, useCallback } from 'react'
import { api, memory } from './configure/env'

const ViewTimeline = () => {

    const [getTimeline, setTimeline] = useState([])
    const get_timeline = useCallback(() => {
        axios.get(`${api.timeline}/${memory.get_account_id}`)
            .then((brick) => {
                const dr = brick.data
                setTimeline(dr)
            })
    }, [])

    useEffect(() => {
        get_timeline()
    }, [])

    if (memory.get_token === null) { window.location.href = "/signin" }
    else {
        return (
            <div >
                <h1>View Timeline</h1>
                <hr />
                <div class="mb-3">
                    <input
                        type="text"
                        class="form-control"
                        //onChange={(e) => { setAgencyName(e.target.value) }} /////
                        placeholder="Search a name of agency" />
                </div>
                <div className="table-responsive mb-3">
                    <table className="table bg-light table-hover text-center table-bordered"
                        style={{
                            tableLayout: 'fixed',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}>
                        <thead>
                            <tr>
                                <th style={{ width: '50px' }}>No.</th>
                                <th style={{ width: '100px' }}>Date</th>
                                <th style={{ width: '200px' }}>Name of client</th>
                                <th style={{ width: '250px' }}>Name of agency</th>
                                <th style={{ width: '250px' }}>Name of client Type</th>
                                <th style={{ width: '100px' }}>Call</th>
                                <th style={{ width: '100px' }}>Visit AM</th>
                                <th style={{ width: '100px' }}>Visit PM</th>
                                <th style={{ width: '150px' }}>Site Tour AM</th>
                                <th style={{ width: '150px' }}>Site Tour PM</th>
                                <th style={{ width: '100px' }}>Lunch</th>
                                <th style={{ width: '100px' }}>Dinner</th>
                                <th style={{ width: '250px' }}>Others</th>
                            </tr>
                        </thead>
                        <tbody>

                            {getTimeline.map((row, index) => {
                                return (
                                    <tr key={index}>
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
                                        <td>{row.others}</td>
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