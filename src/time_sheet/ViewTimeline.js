import axios from 'axios'
import React, { useEffect, useState, useCallback } from 'react'
import { api, memory } from './configure/env'
import { FcDeleteColumn } from "react-icons/fc";

const ViewTimeline = () => {
    const [getTimeline, setTimeline] = useState([])
    const [getRowId, setRowId] = useState(0)

    const get_timeline = useCallback(() => {
        axios.get(`${api.timeline}/${memory.get_account_id}`)
            .then((brick) => {
                setTimeline(brick.data)
            })
    }, [])

    useEffect(() => {
        get_timeline()
    }, [get_timeline])

    console.log(getRowId);

    const deleteColumn = () => {
        if (window.confirm("Do you really want to delete?")) {
            console.log('kkkkk');
          }else{
              console.log('bbbbb');
          }
    }

    if (memory.get_token === null) { window.location.href = "/signin" }
    else {
        return (
            <div >
                <h1>View Timeline</h1>
                <hr />
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search a name of agency" />
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
                                <th style={{ width: '50px' }}>No.</th>
                                <th style={{ width: '100px' }}>Date</th>
                                <th style={{ width: '200px' }}>Name of client</th>
                                <th style={{ width: '250px' }}>Name of agency</th>
                                <th style={{ width: '250px' }}>
                                    <button type="button" className="btn btn-outline-light position-relative">
                                        <span className="badge bg-success">10</span>
                                    </button>
                                    <br />Name of client Type</th>
                                <th style={{ width: '100px' }}>
                                    <button type="button" className="btn btn-outline-light position-relative">
                                        <span className="badge bg-success">10</span>
                                    </button>
                                    <br />
                                    Call</th>
                                <th style={{ width: '100px' }}>
                                    <button type="button" className="btn btn-outline-light position-relative">
                                        <span className="badge bg-success">10</span>
                                    </button>
                                    <br />
                                    Visit AM</th>
                                <th style={{ width: '100px' }}>
                                    <button type="button" className="btn btn-outline-light position-relative">
                                        <span className="badge bg-success">10</span>
                                    </button>
                                    <br />Visit PM</th>
                                <th style={{ width: '150px' }}>
                                    <button type="button" className="btn btn-outline-light position-relative">
                                        <span className="badge bg-success">10</span>
                                    </button>
                                    <br />
                                    Site Tour AM</th>
                                <th style={{ width: '150px' }}>
                                    <button type="button" className="btn btn-outline-light position-relative">
                                        <span className="badge bg-success">10</span>
                                    </button>
                                    <br />
                                    Site Tour PM</th>
                                <th style={{ width: '100px' }}>
                                    <button type="button" className="btn btn-outline-light position-relative">
                                        <span className="badge bg-success">10</span>
                                    </button>
                                    <br />
                                    Lunch</th>
                                <th style={{ width: '100px' }}>
                                    <button type="button" className="btn btn-outline-light position-relative">
                                        <span className="badge bg-success">10</span>
                                    </button>
                                    <br />
                                    Dinner</th>
                                <th style={{ width: '250px' }}>
                                    <button type="button" className="btn btn-outline-light position-relative">
                                        <span className="badge bg-success">10</span>
                                    </button>
                                    <br />
                                    Others</th>
                            </tr>
                        </thead>
                        <tbody>

                            {getTimeline.map((row, index) => {
                                return (
                                    <tr key={index} onMouseEnter={() => { setRowId(row.id) }}>
                                        <td onClick={deleteColumn}><button className='btn btn-md' style={{ margin: '-10px 0 0 0' }}><FcDeleteColumn /></button></td>
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