import axios from "axios"
import { useState, useEffect, useCallback } from "react"
import { memory, api } from './configure/env'
const ViewSales = () => {
    if (memory.get_token === null) { window.location.href = '/' }
    const [getCount, setCount] = useState(0)
    const [getID, setID] = useState(null)
    const [getAgencyName, setAgencyName] = useState('')
    const [getDataSales, setDataSales] = useState([])
    const [getProcess, setProcess] = useState([])
    const [getClientType, setClientType] = useState([])
    const [getCountPTT, setCountPTT] = useState({
        ptt1: 0, ptt2: 0, ptt3: 0, ptt4: 0, ptt5: 0, ptt6: 0,
        ptt7: 0, ptt8: 0, ptt9: 0, ptt10: 0, ptt11: 0, ptt12: 0
    })

    /**pull table v_forecast_ptt */
    const pullSales = useCallback(() => {
        const value = { id: JSON.parse(memory.get_account_id), agency: getAgencyName }
        axios.get(`${api.sales}/${JSON.stringify(value)}`).then((brick) => {
            setDataSales([])
            setDataSales(brick.data)
        })
    }, [getAgencyName])
    useEffect(() => {
        pullSales()
    }, [pullSales])
    /**reload table sales */
    const reloadSales = useCallback(() => {
        const value = { id: JSON.parse(memory.get_account_id), agency: '' }
        axios.get(`${api.sales}/${JSON.stringify(value)}`).then((brick) => {
            setDataSales([])
            setDataSales(brick.data)
            return () => {
                getCount()
            }
        })
    }, [getCount])
    useEffect(() => {
        reloadSales()
    }, [reloadSales])
    /**pull table forcecast (count PTT1-12) */
    const pullCountPTT = useCallback(() => {
        const value = { id: JSON.parse(memory.get_account_id), agency: getAgencyName }
        axios.get(`${api.sales}/count/${JSON.stringify(value)}`).then((brick) => {
            setCountPTT(brick.data[0])
        })
    }, [getAgencyName])
    useEffect(() => {
        pullCountPTT()
    }, [pullCountPTT])
    /**pull table process */
    const pullProcess = useCallback(() => {
        axios.get(`${api.customer}/process`).then((brick) => {
            setProcess(brick.data)
        })
    }, [])
    useEffect(() => {
        pullProcess()
        return () => { }
    }, [pullProcess])
    /**pull table client_type */
    const pullClientType = useCallback(() => {
        axios.get(`${api.customer}/clientType`).then((brick) => {
            setClientType(brick.data)
        })
    }, [])
    useEffect(() => {
        pullClientType()
        return () => { }
    }, [pullClientType])
    /**update table forecast*/
    const putForecast = (e) => {
        const lock = document.getElementById(e.currentTarget.id)
        document.getElementById('agencyColumn').setAttribute('contenteditable', 'false')
        document.getElementById('clientColumn').setAttribute('contenteditable', 'false')
        if (lock.hasAttribute('readOnly')) { lock.removeAttribute('readOnly') }
        lock.addEventListener("keyup", (e) => {
            if (e.key === 'Enter') {
                lock.setAttribute('readOnly', '')
                axios.put(api.sales, { id: getID, row: e.target.name, value: e.target.value })
                    .then((brick) => {
                        const data = brick.data
                        if (data.affectedRows === 1) {
                            pullCountPTT()
                            setCount((getCount + 1) % 2)
                        }
                    })
            }
            if (e.key === 'Escape') {
                lock.setAttribute('readOnly', 'readOnly')
            }
        })
    }
    /**put column clinet_type, process, PTT_weekly_update */
    const putProcess = (e) => {
        const lock = document.getElementById(e.currentTarget.id)
        if (lock.hasAttribute('readOnly')) { lock.removeAttribute('readOnly') }
        lock.setAttribute('readOnly', '')
        axios.put(api.sales, { id: getID, row: e.target.name, value: e.target.value })
            .then((brick) => {
                //const data = brick.data
            })

        if (e.key === 'Escape') {
            lock.setAttribute('readOnly', 'readOnly')
        }
    }
    if (memory.get_token === null) { window.location.href = '/' }
    else {
        return (
            <div>
                <h1>View sales activity</h1>
                <hr />
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        onChange={(e) => { setAgencyName(e.target.value) }}
                        placeholder="Search a name of agency" />
                </div>
                <div className="table-responsive"
                    style={{ height: '480px' }}>
                    <table className="table bg-light table-hover text-center table-bordered"
                        style={{
                            tableLayout: 'fixed',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}>
                        <thead>
                            <tr>
                                {/**agency */}
                                <th style={{ width: '250px' }}><p>name of agency</p></th>
                                {/**client */}
                                <th style={{ width: '250px' }}><p>name of client</p></th>
                                {/**client type */}
                                <th style={{ width: '120px' }}><p>client type</p></th>
                                {/**process */}
                                <th style={{ width: '180px' }}><p>process</p></th>
                                {/**PTT Weekly Update */}
                                <th style={{ width: '150px' }}><p>PTT weekly update</p></th>
                                {/**remark */}
                                <th style={{ width: '250px' }}><p>remark</p></th>
                                {/**potential */}
                                <th style={{ width: '250px' }}><p>potential %</p></th>
                                {/**januaty */}
                                <th style={{ width: '100px' }}>
                                    <button type="button" className="btn btn-outline-primary position-relative">
                                        January <span className="badge bg-warning text-dark">{getCountPTT.ptt1}</span>
                                    </button>
                                    <br />PTT<br />
                                </th>
                                {/**february */}
                                <th style={{ width: '100px' }}>
                                    <button type="button" className="btn btn-outline-primary position-relative">
                                        February <span className="badge bg-warning text-dark">{getCountPTT.ptt2}</span>
                                    </button>
                                    <br />PTT<br />
                                </th>
                                {/**january */}
                                <th style={{ width: '100px' }}>
                                    <button type="button" className="btn btn-outline-primary position-relative">
                                        January <span className="badge bg-warning text-dark">{getCountPTT.ptt3}</span>
                                    </button>
                                    <br />PTT<br />
                                </th>
                                {/**april */}
                                <th style={{ width: '80px' }}>
                                    <button type="button" className="btn btn-outline-primary position-relative">
                                        April <span className="badge bg-warning text-dark">{getCountPTT.ptt4}</span>
                                    </button>
                                    <br />PTT<br />
                                </th>
                                {/**may */}
                                <th style={{ width: '80px' }}>
                                    <button type="button" className="btn btn-outline-primary position-relative">
                                        May <span className="badge bg-warning text-dark">{getCountPTT.ptt5}</span>
                                    </button>
                                    <br />PTT<br />
                                </th>
                                {/**june */}
                                <th style={{ width: '80px' }}>
                                    <button type="button" className="btn btn-outline-primary position-relative">
                                        June <span className="badge bg-warning text-dark">{getCountPTT.ptt6}</span>
                                    </button>
                                    <br />PTT<br />
                                </th>
                                {/**july */}
                                <th style={{ width: '80px' }}>
                                    <button type="button" className="btn btn-outline-primary position-relative">
                                        July <span className="badge bg-warning text-dark">{getCountPTT.ptt7}</span>
                                    </button>
                                    <br />PTT<br />
                                </th>
                                {/**august */}
                                <th style={{ width: '100px' }}>
                                    <button type="button" className="btn btn-outline-primary position-relative">
                                        August <span className="badge bg-warning text-dark">{getCountPTT.ptt8}</span>
                                    </button>
                                    <br />PTT<br />
                                </th>
                                {/**september */}
                                <th style={{ width: '120px' }}>
                                    <button type="button" className="btn btn-outline-primary position-relative">
                                        September <span className="badge bg-warning text-dark">{getCountPTT.ptt9}</span>
                                    </button>
                                    <br />PTT<br />
                                </th>
                                {/**october */}
                                <th style={{ width: '100px' }}>
                                    <button type="button" className="btn btn-outline-primary position-relative">
                                        October <span className="badge bg-warning text-dark">{getCountPTT.ptt10}</span>
                                    </button>
                                    <br />PTT<br />
                                </th>
                                {/**november */}
                                <th style={{ width: '120px' }}>
                                    <button type="button" className="btn btn-outline-primary position-relative">
                                        November <span className="badge bg-warning text-dark">{getCountPTT.ptt11}</span>
                                    </button>
                                    <br />PTT<br />
                                </th>
                                {/**december */}
                                <th style={{ width: '120px' }}>
                                    <button type="button" className="btn btn-outline-primary position-relative">
                                        December <span className="badge bg-warning text-dark">{getCountPTT.ptt12}</span>
                                    </button>
                                    <br />PTT<br />
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {getDataSales.map((row, index) => {

                                return (
                                    <tr key={index} onMouseEnter={() => { setID(row.id) }}>
                                        {/**agency contenteditable='false'*/}
                                        <td id='agencyColumn'>{row.name_of_agency}</td>
                                        {/**client */}
                                        <td id='clientColumn'>{row.name_of_client}</td>
                                        {/**client type */}
                                        <td id='clientTypeColumn'>
                                            <select
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`client_type_id`}
                                                className="form-control form-control-sm form-select form-select-sm mb-3"
                                                readOnly
                                                onMouseUp={(e) => { putProcess(e) }}>
                                                <option value={row.id}>{row.name_of_client_type}</option>
                                                {getClientType.map((row, index) => {
                                                    return (
                                                        <option key={index} value={row.id}>{row.name}</option>
                                                    )
                                                })}
                                            </select>
                                        </td>
                                        {/**process */}
                                        <td>
                                            <select
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`process_id`}
                                                className="form-control form-control-sm form-select form-select-sm mb-3"
                                                readOnly
                                                onMouseUp={(e) => { putProcess(e) }}>
                                                <option value={row.process_id}>{row.process_name}</option>
                                                {getProcess.map((row, index) => {
                                                    return (
                                                        <option key={index} value={row.id}>{row.name}</option>
                                                    )
                                                })}
                                            </select>
                                        </td>
                                        {/**PTT Weekly Update */}
                                        <td>
                                            <select
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`ptt_weekly_update`}
                                                className="form-control form-control-sm form-select form-select-sm mb-3"
                                                readOnly
                                                onMouseUp={(e) => { putProcess(e) }}>
                                                <option value={row.process_id}>{row.ptt_weekly_update}</option>
                                                <option value='W1'>W1</option>
                                                <option value='W2'>W2</option>
                                                <option value='W3'>W3</option>
                                                <option value='W4'>W4</option>
                                                <option value='W5'>W5</option>
                                            </select>
                                        </td>
                                        {/**remark */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`remark`}
                                                readOnly
                                                onMouseUp={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.remark} />
                                        </td>
                                        {/**potential */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`potential`}
                                                readOnly
                                                onMouseUp={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.potential} />
                                        </td>
                                        {/**january */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`PTT1`}
                                                readOnly
                                                onMouseUp={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.PTT1} />
                                        </td>
                                        {/**february */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`PTT2`}
                                                readOnly
                                                onMouseUp={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.PTT2} />
                                        </td>
                                        {/**January */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`PTT3`}
                                                readOnly
                                                onMouseUp={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.PTT3} />
                                        </td>
                                        {/**April */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`PTT4`}
                                                readOnly
                                                onMouseUp={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.PTT4} />
                                        </td>
                                        {/**May */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`PTT5`}
                                                readOnly
                                                onMouseUp={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.PTT5} />
                                        </td>
                                        {/**june */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`PTT6`}
                                                readOnly
                                                onMouseUp={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.PTT6} />
                                        </td>
                                        {/**july */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`PTT7`}
                                                readOnly
                                                onMouseUp={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.PTT7} />
                                        </td>
                                        {/**august */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`PTT8`}
                                                readOnly
                                                onMouseUp={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.PTT8} />
                                        </td>
                                        {/**september */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`PTT9`}
                                                readOnly
                                                onMouseUp={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.PTT9} />
                                        </td>
                                        {/**october */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`PTT10`}
                                                readOnly
                                                onMouseUp={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.PTT10} />
                                        </td>
                                        {/**november */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`PTT11`}
                                                readOnly
                                                onMouseUp={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.PTT11} />
                                        </td>
                                        {/**december */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`PTT12`}
                                                readOnly
                                                onMouseUp={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.PTT12} /></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table >
                </div>
            </div >
        )
    }
}
export default ViewSales 