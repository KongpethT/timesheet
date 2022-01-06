import axios from 'axios'
import { useState, useCallback, useEffect } from 'react'
import { memory, api } from './configure/env'
const ViewCustomer = () => {
    const [getAgency, setAgency] = useState([])
    const [getAgencyId, setAgencId] = useState(0)
    const [getClient, setClient] = useState([])
    const [getAlert, setAlert] = useState(null)
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
        axios.get(`${api.customer}/client/${getAgencyId}`).then((brick) => {
            setClient(brick.data)
        })

    }, [getAgencyId])
    useEffect(() => {
        pullClient()
    }, [pullClient])

    const showClient = (id, name) => {
        setAgencId(id)
        setAlert(name)
    }

    /**view */
    if (memory.get_token === null) { window.location.href = "/" }
    else {
        return (
            <div>
                <h1>View customer <span className='fs-5 text-success'>{' | ' + getAlert}</span></h1>
                <hr />
                <div className="table-responsive g-3" style={{ maxHeight: '320px' }}>
                    <table className="table bg-light table-hover text-center table-bordered"
                        style={{
                            tableLayout: 'fixed',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}>
                        <thead className='bg-light'>
                            <tr>
                                <th style={{ width: '50px' }}>#</th>
                                <th style={{ width: '240px' }}>name</th>
                                <th style={{ width: '100px' }}>contact</th>
                                <th style={{ width: '100px' }}>email</th>
                                <th style={{ width: '340px' }}>address</th>
                                <th style={{ width: '100px' }}>city</th>
                                <th style={{ width: '100px' }}>state</th>
                                <th style={{ width: '100px' }}>zip</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getAgency.map((row, index) => {
                                return (
                                    <tr key={index} onClick={() => { showClient(row.id, row.name) }}>
                                        <td>{index + 1}</td>
                                        <td>{row.name}</td>
                                        <td>{row.contact_name}</td>
                                        <td>{row.email}</td>
                                        <td>{row.address}{row.address2}</td>
                                        <td>{row.city}</td>
                                        <td>{row.state}</td>
                                        <td>{row.zip}</td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </div>
                <div className="table-responsive g-3">
                    <table className="table bg-light table-hover text-center table-bordered"
                        style={{
                            tableLayout: 'fixed',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }}>
                        <thead className='bg-light'>
                            <tr>
                                <th style={{ width: '50px' }}>#</th>
                                <th>client</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getClient.map((row, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{row.name}</td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ViewCustomer