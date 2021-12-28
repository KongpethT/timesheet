import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { api, memory } from './config/env'

export default function Timeline() {
    const [timeline, setTimeline] = useState([])
    const [getRow, setRow] = useState(null)
    useEffect(() => {
        Axios.get(api.timeline + '?id=' + memory.get_user_code).then((brick) => {
            setTimeline(brick.data)
        })
    }, [])

    const row_edit = () => {
        localStorage.setItem('dr', JSON.stringify(getRow))
        window.location.href = "/timeline/edit"
    }
    if (memory.get_token === null) { window.location.href = "/signin" }
    else {
        return (
            <div>
                <h1>View timeline</h1>
                <hr />
                <table className="table table-striped table-hover bg-light">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Date</th>
                            <th>Client Name</th>
                            <th>Company</th>
                            <th>Client Type</th>
                            <th>Call</th>
                            <th>Visit AM</th>
                            <th>Visit PM</th>
                            <th>Site Tour AM</th>
                            <th>Site Tour PM</th>
                            <th>Lunch</th>
                            <th>Dinner</th>
                            <th>Others</th>
                        </tr>
                    </thead>
                    <tbody>
                        {timeline.map((row, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{row.timeline}</td>
                                    <td>{row.clientName}</td>
                                    <td>{row.company}</td>
                                    <td>{row.clientType}</td>
                                    <td>{row.visitCall}</td>
                                    <td>{row.visitAM}</td>
                                    <td>{row.visitPM}</td>
                                    <td>{row.siteTourAM}</td>
                                    <td>{row.siteTourPM}</td>
                                    <td>{row.lunch}</td>
                                    <td>{row.dinner}</td>
                                    <td>{row.others}</td>
                                    <td><button type="button" className="btn btn-warning btn-sm"
                                        onMouseDown={() => {
                                            setRow({
                                                id: row.id,
                                                timeline: row.timeline,
                                                clientName: row.clientName,
                                                company: row.company,
                                                clientType: row.clientType,
                                                visitCall: row.visitCall,
                                                visitAM: row.visitAM,
                                                visitPM: row.visitPM,
                                                siteTourAM: row.siteTourAM,
                                                siteTourPM: row.siteTourPM,
                                                lunch: row.lunch,
                                                dinner: row.dinner,
                                                others: row.others
                                            })
                                        }}
                                        onMouseUp={row_edit}
                                    >Edit</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div >
        )
    }
}