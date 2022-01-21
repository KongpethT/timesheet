import axios from 'axios'
import { useState, useCallback, useEffect } from 'react'
import { memory, api, colors } from './configure/env'
const ViewCustomer = () => {
    if (memory.get_token === null) { window.location.href = '/' }
    const [getAgency, setAgency] = useState([])
    const [getAgencyId, setAgencId] = useState(0)
    const [getClient, setClient] = useState([])
    const [getAlert, setAlert] = useState(null)
    const [getRowId, setRowId] = useState(null)
    console.log(getRowId);
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
    /**put table client */
    const putClient = (e) => {
        console.log(e.target.value)
        console.log(e.target.name)
        console.log(e.target.id)
        const id = e.target.id
        const item = document.getElementById(id)
        item.removeAttribute('readOnly')
        item.style.backgroundColor = colors.get_column_edit
        item.addEventListener('keyup', (e) => {
            if (e.key === "Enter") {
                item.setAttribute('readOnly', 'readOnly')
                item.style.backgroundColor = ''
            }
        })
    }
    /**view */
    if (memory.get_token === null) { window.location.href = "/" }
    else {
        return (
            <div>
                <h1>View customer <span className='fs-5 text-success'>{' | ' + getAlert}</span></h1>
                <hr />
                {/**agency table */}
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
                                <th style={{ width: '250px' }}>agency</th>
                                <th style={{ width: '180px' }}>contact</th>
                                <th style={{ width: '180px' }}>email</th>
                                <th colSpan={2} style={{ width: '340px' }}>address</th>
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
                                        <td>{row.address}</td>
                                        <td>{row.address2}</td>
                                        <td>{row.city}</td>
                                        <td>{row.state}</td>
                                        <td>{row.zip}</td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </div>
                {/**client table */}
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
                                <th style={{ width: '250px' }}>client</th>
                                <th style={{ width: '180px' }}>contact</th>
                                <th style={{ width: '180px' }}>email</th>
                                <th colSpan={2} style={{ width: '340px' }}>address</th>
                                <th style={{ width: '100px' }}>city</th>
                                <th style={{ width: '100px' }}>state</th>
                                <th style={{ width: '100px' }}>zip</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getClient.map((row, index) => {
                                return (
                                    <tr key={index} onDoubleClick={() => { setRowId(row.id) }}>
                                        <td>
                                            {index + 1}
                                        </td>
                                        {/**client name */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`name`}
                                                readOnly
                                                onDoubleClick={(e) => { putClient(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.name} />
                                        </td>
                                        {/**contact */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`contact_name`}
                                                readOnly
                                                onDoubleClick={(e) => { putClient(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.contact_name} />
                                        </td>
                                        {/**email */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`email`}
                                                readOnly
                                                onDoubleClick={(e) => { putClient(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.email} />
                                        </td>
                                        {/**address */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`address`}
                                                readOnly
                                                onDoubleClick={(e) => { putClient(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.address} />
                                        </td>
                                        {/**address2 */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`address2`}
                                                readOnly
                                                onDoubleClick={(e) => { putClient(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.address2} />
                                        </td>
                                        {/**city */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`city`}
                                                readOnly
                                                onDoubleClick={(e) => { putClient(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.city} />

                                        </td>
                                        {/**state */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`state`}
                                                readOnly
                                                className="form-control form-control-sm"
                                                defaultValue={row.state} />
                                        </td>
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`zip`}
                                                readOnly
                                                className="form-control form-control-sm"
                                                defaultValue={row.zip} />
                                        </td>
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