import axios from 'axios'
import { useState, useCallback, useEffect } from 'react'
import { memory, api, colors } from './configure/env'
import { FcServices, FcDeleteRow, FcViewDetails } from "react-icons/fc"
import { Label } from 'recharts'

const ViewCustomer = () => {
    if (memory.get_token === null) { window.location.href = '/' }
    const [getAgencyDb, setAgencyDb] = useState([])
    const [getAgincyName, setAgencyName] = useState(null)
    const [getClient, setClient] = useState([])
    const [getAlert, setAlert] = useState(null)

    /**pull table agency */
    const pullAgency = useCallback(() => {
        axios.get(`${api.customer}/agency/${memory.get_account_id}`).then((brick) => {
            setAgencyDb(brick.data)
        })
    }, [])
    useEffect(() => {
        pullAgency()
    }, [pullAgency])
    /**pull table client */
    const pullClient = useCallback((id) => {
        axios.get(`${api.customer}/client/${id}`).then((brick) => {
            setClient(brick.data)
        })
    }, [getClient])
    useEffect(() => {

    }, [pullClient])
    /**show client when click button agincy */
    const showClient = useCallback((id, name) => {
        setClient([])
        pullClient(id)
        setAlert(name)
        setAgencyName(name)
        const tr = document.querySelectorAll('tr')
        for (let i = 0; i < tr.length; i++) {
            tr[i].hidden = false
        }
    }, [])
    /**put table agency */
    const putAgency = (e, rowId) => {
        const id = e.target.id
        const item = document.getElementById(id)
        item.removeAttribute('readOnly')
        item.style.backgroundColor = colors.get_column_edit
        item.addEventListener('keyup', (e) => {
            if (e.key === "Enter") {
                const brick = { rowId: rowId, name: e.target.name, value: e.target.value }
                axios.put(`${api.customer}/agency/update`, { brick }).then((brick) => {
                    if (brick.status === 200) {
                        setAlert('successfully')
                        setTimeout(() => { setAlert(null) }, 3000)
                    }
                })
                item.setAttribute('readOnly', 'readOnly')
                item.style.backgroundColor = ''
                console.log('value', e.target.value)
            }
        })
    }
    /**put table client */
    const putClient = (e, rowId) => {
        const id = e.target.id
        const item = document.getElementById(id)
        item.removeAttribute('readOnly')
        item.style.backgroundColor = colors.get_column_edit
        item.addEventListener('keyup', (e) => {
            if (e.key === "Enter") {
                const brick = { rowId: rowId, name: e.target.name, value: e.target.value }
                axios.put(`${api.customer}/client/update`, { brick }).then((brick) => {
                    if (brick.status === 200) {
                        setAlert('successfully')
                        setTimeout(() => { setAlert(null) }, 3000)
                    }
                })
                item.setAttribute('readOnly', 'readOnly')
                item.style.backgroundColor = ''
            }
        })
    }
    /**setup screen */
    const [getHightScreen, setHeightScreen] = useState(window.innerHeight)
    window.addEventListener('resize', () => {
        //setWidthScreen(window.innerWidth)
        setHeightScreen(window.innerHeight)
    })
    /** delete agency */
    const deletedAgency = useCallback((rowId) => {
        let txt = prompt(`Please Enter word " confirm " in field to delete Agency`);
        if (txt === 'confirm') {
            setAlert('Unsuccessfully, Agency neet to do not client')
            const id = rowId
            axios.delete(`${api.customer}/agency/deleted/${id}`).then((brick) => {
                if (brick.status === 200) {
                    pullAgency()
                    setAlert('successfully')
                }
            })
        }
        setTimeout(() => { setAlert(null) }, 3000)
    }, [])

    /**delete client */
    const deletedClient = (id, index) => {
        const tr = document.getElementById(index)
        let txt = prompt(`Please Enter word " confirm " in field  to delete Client \n\nImpact: Data rows in "Open Sales Activity Pages" that use this " Client Name " will be deleted.`)

        if (txt === 'confirm') {
            axios.delete(`${api.customer}/client/deleted/${id}`).then((brick) => {
                if (brick.status === 200) {
                    setAlert('successfully')
                    tr.hidden = true
                }
            })
        }
        setTimeout(() => { setAlert(getAgincyName) }, 3000)
    }
    /**view */
    if (memory.get_token === null) { window.location.href = "/" }
    else {
        return (
            <div>
                <h1>View customer <span className='fs-5 text-success'>{' | ' + getAlert}</span></h1>
                <hr />
                {/**agency table */}
                <div className="table-responsive mb-1"
                    style={{ height: '256px' }}>
                    <table className="table bg-light table-hover text-center table-bordered"
                        style={{
                            tableLayout: 'fixed',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}>
                        <thead className='bg-light' style={{ position: 'sticky', top: '0', zIndex: '1' }}>
                            <tr>
                                <th colSpan={1} className='bg-dark' style={{ width: '80px' }}><FcServices /></th>
                                <th style={{ width: '250px', backgroundColor: 'gray', position: 'sticky', left: '0' }}>agency</th>
                                <th style={{ width: '180px' }}>contact</th>
                                <th style={{ width: '180px' }}>email</th>
                                <th colSpan={2} style={{ width: '340px' }}>address</th>
                                <th style={{ width: '100px' }}>city</th>
                                <th style={{ width: '100px' }}>state</th>
                                <th style={{ width: '100px' }}>zip</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getAgencyDb.map((row, index) => {
                                return (
                                    <tr key={index}>
                                        <td
                                            onClick={() => { deletedAgency(row.id) }}
                                            className='bg-light'
                                            data-toggle="tooltip"
                                            data-placement="right"
                                            title="delete row"
                                            style={{ cursor: 'pointer' }}>
                                            <FcDeleteRow style={{ fontSize: '21px' }} /></td>
                                        <td
                                            onClick={() => { showClient(row.id, row.name) }}
                                            className='bg-dark' style={{ position: 'sticky', left: '0', cursor: 'pointer' }}>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`name`}
                                                readOnly
                                                onDoubleClick={(e) => { putAgency(e, row.id) }}
                                                className="btn btn-outline-secondary"
                                                defaultValue={row.name} />
                                        </td>
                                        {/**contact */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`contact_name`}
                                                readOnly
                                                onDoubleClick={(e) => { putAgency(e, row.id) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.contact_name} />
                                        </td>
                                        {/**email */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`email`}
                                                readOnly
                                                onDoubleClick={(e) => { putAgency(e, row.id) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.email} />
                                        </td>
                                        {/**address */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`address`}
                                                readOnly
                                                onDoubleClick={(e) => { putAgency(e, row.id) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.address} />
                                        </td>
                                        {/**address2 */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`address2`}
                                                readOnly
                                                onDoubleClick={(e) => { putAgency(e, row.id) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.address2} />
                                        </td>
                                        {/**city */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`city`}
                                                readOnly
                                                onDoubleClick={(e) => { putAgency(e, row.id) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.city} />

                                        </td>
                                        {/**state */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`state`}
                                                readOnly
                                                onDoubleClick={(e) => { putAgency(e, row.id) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.state} />
                                        </td>
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`zip`}
                                                readOnly
                                                onDoubleClick={(e) => { putAgency(e, row.id) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.zip} />
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </div>
                {/**client table */}
                <div className="table-responsive mb-1"
                    style={{ height: getHightScreen - 400 }}>
                    <table className="table bg-light table-hover text-center table-bordered"
                        style={{
                            tableLayout: 'fixed',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }}>
                        <thead className='bg-light' style={{ position: 'sticky', top: '0', zIndex: '1' }}>
                            <tr>
                                <th className='bg-dark' style={{ width: '40px' }}><FcServices /></th>
                                <th style={{ width: '250px', backgroundColor: 'gray', position: 'sticky', left: '0' }}>client</th>
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
                                    <tr
                                        id={index}
                                        key={index}
                                    >
                                        {/**delete button */}
                                        <td
                                            onClick={() => { deletedClient(row.id, index) }}
                                            className='bg-light'
                                            style={{ cursor: 'pointer' }}
                                            data-toggle="tooltip"
                                            data-placement="right"
                                            title="delete row">
                                            <FcDeleteRow style={{ fontSize: '21px' }} />
                                        </td>
                                        {/**client name */}
                                        <td style={{ position: 'sticky', left: '0' }} className='bg-dark'>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`name`}
                                                readOnly
                                                onDoubleClick={(e) => { putClient(e, row.id) }}
                                                className="btn btn-outline-secondary"
                                                defaultValue={row.name} />
                                        </td>
                                        {/**contact */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`contact_name`}
                                                readOnly
                                                onDoubleClick={(e) => { putClient(e, row.id) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.contact_name} />
                                        </td>
                                        {/**email */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`email`}
                                                readOnly
                                                onDoubleClick={(e) => { putClient(e, row.id) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.email} />
                                        </td>
                                        {/**address */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`address`}
                                                readOnly
                                                onDoubleClick={(e) => { putClient(e, row.id) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.address} />
                                        </td>
                                        {/**address2 */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`address2`}
                                                readOnly
                                                onDoubleClick={(e) => { putClient(e, row.id) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.address2} />
                                        </td>
                                        {/**city */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`city`}
                                                readOnly
                                                onDoubleClick={(e) => { putClient(e, row.id) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.city} />

                                        </td>
                                        {/**state */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`state`}
                                                readOnly
                                                onDoubleClick={(e) => { putClient(e, row.id) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.state} />
                                        </td>
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`zip`}
                                                readOnly
                                                onDoubleClick={(e) => { putClient(e, row.id) }}
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