import axios from "axios"
import { useState, useEffect, useCallback } from "react"
import { memory, api } from './configure/env'
const ViewAdminSales = () => {
    if (memory.get_token === null) { window.location.href = '/' }
    const [getCount, setCount] = useState(0)
    const [getID, setID] = useState(null)
    const [getAgencyName, setAgencyName] = useState('')
    const [getDataSales, setDataSales] = useState([])
    const [getCountPSR, setCountPSR] = useState({
        ptt1: 0, ptt2: 0, ptt3: 0, ptt4: 0, ptt5: 0, ptt6: 0,
        ptt7: 0, ptt8: 0, ptt9: 0, ptt10: 0, ptt11: 0, ptt12: 0,
        SGD1: 0, SGD2: 0, SGD3: 0, SGD4: 0, SGD5: 0, SGD6: 0,
        SGD7: 0, SGD8: 0, SGD9: 0, SGD10: 0, SGD11: 0, SGD12: 0,
        RCC1: 0, RCC2: 0, RCC3: 0, RCC4: 0, RCC5: 0, RCC6: 0,
        RCC7: 0, RCC8: 0, RCC9: 0, RCC10: 0, RCC11: 0, RCC12: 0
    })
    /**pull table v_forecast_all */
    const pullSales = useCallback(() => {
        const value = { id: JSON.parse(memory.get_account_id), agency: getAgencyName }
        axios.get(`${api.sales}/all/${JSON.stringify(value)}`).then((brick) => {
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
        axios.get(`${api.sales}/all/${JSON.stringify(value)}`).then((brick) => {
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
    /**pull table forcecast (count all) */
    const pullCountPTT = useCallback(() => {
        const value = { id: JSON.parse(memory.get_account_id), agency: getAgencyName }
        axios.get(`${api.sales}/countAll/${JSON.stringify(value)}`).then((brick) => {
            setCountPSR(brick.data[0])
        })
    }, [getAgencyName])
    useEffect(() => {
        pullCountPTT()
    }, [pullCountPTT])
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
    /**view */
    if (memory.get_token === null) { window.location.href = '/' }
    else {
        return (
            <div>
                <h1>View sales activity (Admin)</h1>
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
                                {/**ae */}
                                <th style={{ width: '180px' }}><p>name of ae</p></th>
                                {/**agency */}
                                <th style={{ width: '250px' }}><p>name of agency</p></th>
                                {/**client */}
                                <th style={{ width: '250px' }}><p>name of client</p></th>
                                {/**client type */}
                                <th style={{ width: '100px' }}><p>client type</p></th>
                                {/**process */}
                                <th style={{ width: '180px' }}><p>process</p></th>
                                {/**PTT Weekly Update */}
                                <th style={{ width: '250px' }}><p>PTT weekly update</p></th>
                                {/**remark */}
                                <th style={{ width: '250px' }}><p>remark</p></th>
                                {/**potential */}
                                <th style={{ width: '250px' }}><p>potential %</p></th>
                                {/**januaty */}
                                <th className="bg-success text-light" style={{ width: '100px' }}>
                                    <span className="badge bg-light text-dark">{getCountPSR.SGD1}</span><br />SGD</th>
                                <th className="bg-primary text-light" style={{ width: '100px' }}>
                                    <span className="badge bg-light text-dark">{getCountPSR.RCC1}</span><br />RCC</th>
                                <th style={{ width: '100px' }}>
                                    <button type="button" className="btn btn-outline-warning position-relative text-primary">
                                        January <span className="badge bg-warning text-dark">{getCountPSR.ptt1}</span>
                                    </button>
                                    <br />PTT<br />
                                </th>
                                {/**february */}
                                <th className="bg-success text-light" style={{ width: '100px' }}>
                                    <span className="badge bg-light text-dark">{getCountPSR.SGD2}</span><br />SGD</th>
                                <th className="bg-primary text-light" style={{ width: '100px' }}>
                                    <span className="badge bg-light text-dark">{getCountPSR.RCC2}</span><br />RCC</th>
                                <th style={{ width: '100px' }}>
                                    <button type="button" className="btn btn-outline-primary position-relative">
                                        February <span className="badge bg-warning text-dark">{getCountPSR.ptt2}</span>
                                    </button>
                                    <br />PTT<br />
                                </th>
                                {/**january */}
                                <th className="bg-success text-light" style={{ width: '100px' }}>
                                    <span className="badge bg-light text-dark">{getCountPSR.SGD3}</span><br />SGD</th>
                                <th className="bg-primary text-light" style={{ width: '100px' }}>
                                    <span className="badge bg-light text-dark">{getCountPSR.RCC3}</span><br />RCC</th>
                                <th style={{ width: '100px' }}>
                                    <button type="button" className="btn btn-outline-primary position-relative">
                                        January <span className="badge bg-warning text-dark">{getCountPSR.ptt3}</span>
                                    </button>
                                    <br />PTT<br />
                                </th>
                                {/**april */}
                                <th className="bg-success text-light" style={{ width: '100px' }}>
                                    <span className="badge bg-light text-dark">{getCountPSR.SGD4}</span><br />SGD</th>
                                <th className="bg-primary text-light" style={{ width: '100px' }}>
                                    <span className="badge bg-light text-dark">{getCountPSR.RCC4}</span><br />RCC</th>
                                <th style={{ width: '80px' }}>
                                    <button type="button" className="btn btn-outline-primary position-relative">
                                        April <span className="badge bg-warning text-dark">{getCountPSR.ptt4}</span>
                                    </button>
                                    <br />PTT<br />
                                </th>
                                {/**may */}
                                <th className="bg-success text-light" style={{ width: '100px' }}>
                                    <span className="badge bg-light text-dark">{getCountPSR.SGD5}</span><br />SGD</th>
                                <th className="bg-primary text-light" style={{ width: '100px' }}>
                                    <span className="badge bg-light text-dark">{getCountPSR.RCC5}</span><br />RCC</th>
                                <th style={{ width: '80px' }}>
                                    <button type="button" className="btn btn-outline-primary position-relative">
                                        May <span className="badge bg-warning text-dark">{getCountPSR.ptt5}</span>
                                    </button>
                                    <br />PTT<br />
                                </th>
                                {/**june */}
                                <th className="bg-success text-light" style={{ width: '100px' }}>
                                    <span className="badge bg-light text-dark">{getCountPSR.SGD6}</span><br />SGD</th>
                                <th className="bg-primary text-light" style={{ width: '100px' }}>
                                    <span className="badge bg-light text-dark">{getCountPSR.RCC6}</span><br />RCC</th>
                                <th style={{ width: '80px' }}>
                                    <button type="button" className="btn btn-outline-primary position-relative">
                                        June <span className="badge bg-warning text-dark">{getCountPSR.ptt6}</span>
                                    </button>
                                    <br />PTT<br />
                                </th>
                                {/**july */}
                                <th className="bg-success text-light" style={{ width: '100px' }}>
                                    <span className="badge bg-light text-dark">{getCountPSR.SGD7}</span><br />SGD</th>
                                <th className="bg-primary text-light" style={{ width: '100px' }}>
                                    <span className="badge bg-light text-dark">{getCountPSR.RCC7}</span><br />RCC</th>
                                <th style={{ width: '80px' }}>
                                    <button type="button" className="btn btn-outline-primary position-relative">
                                        July <span className="badge bg-warning text-dark">{getCountPSR.ptt7}</span>
                                    </button>
                                    <br />PTT<br />
                                </th>
                                {/**august */}
                                <th className="bg-success text-light" style={{ width: '100px' }}>
                                    <span className="badge bg-light text-dark">{getCountPSR.SGD8}</span><br />SGD</th>
                                <th className="bg-primary text-light" style={{ width: '100px' }}>
                                    <span className="badge bg-light text-dark">{getCountPSR.RCC8}</span><br />RCC</th>
                                <th style={{ width: '100px' }}>
                                    <button type="button" className="btn btn-outline-primary position-relative">
                                        August <span className="badge bg-warning text-dark">{getCountPSR.ptt8}</span>
                                    </button>
                                    <br />PTT<br />
                                </th>
                                {/**september */}
                                <th className="bg-success text-light" style={{ width: '100px' }}>
                                    <span className="badge bg-light text-dark">{getCountPSR.SGD9}</span><br />SGD</th>
                                <th className="bg-primary text-light" style={{ width: '100px' }}>
                                    <span className="badge bg-light text-dark">{getCountPSR.RCC9}</span><br />RCC</th>
                                <th style={{ width: '120px' }}>
                                    <button type="button" className="btn btn-outline-primary position-relative">
                                        September <span className="badge bg-warning text-dark">{getCountPSR.ptt9}</span>
                                    </button>
                                    <br />PTT<br />
                                </th>
                                {/**october */}
                                <th className="bg-success text-light" style={{ width: '100px' }}>
                                    <span className="badge bg-light text-dark">{getCountPSR.SGD10}</span><br />SGD</th>
                                <th className="bg-primary text-light" style={{ width: '100px' }}>
                                    <span className="badge bg-light text-dark">{getCountPSR.RCC10}</span><br />RCC</th>
                                <th style={{ width: '100px' }}>
                                    <button type="button" className="btn btn-outline-primary position-relative">
                                        October <span className="badge bg-warning text-dark">{getCountPSR.ptt10}</span>
                                    </button>
                                    <br />PTT<br />
                                </th>
                                {/**november */}
                                <th className="bg-success text-light" style={{ width: '100px' }}>
                                    <span className="badge bg-light text-dark">{getCountPSR.SGD11}</span><br />SGD</th>
                                <th className="bg-primary text-light" style={{ width: '100px' }}>
                                    <span className="badge bg-light text-dark">{getCountPSR.RCC11}</span><br />RCC</th>
                                <th style={{ width: '120px' }}>
                                    <button type="button" className="btn btn-outline-primary position-relative">
                                        November <span className="badge bg-warning text-dark">{getCountPSR.ptt11}</span>
                                    </button>
                                    <br />PTT<br />
                                </th>
                                {/**december */}
                                <th className="bg-success text-light" style={{ width: '100px' }}>
                                    <span className="badge bg-light text-dark">{getCountPSR.SGD12}</span><br />SGD</th>
                                <th className="bg-primary text-light" style={{ width: '100px' }}>
                                    <span className="badge bg-light text-dark">{getCountPSR.RCC12}</span><br />RCC</th>
                                <th style={{ width: '120px' }}>
                                    <button type="button" className="btn btn-outline-primary position-relative">
                                        December <span className="badge bg-warning text-dark">{getCountPSR.ptt12}</span>
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
                                        <td id='agencyColumn'>{row.account_name}</td>
                                        {/**agency contenteditable='false'*/}
                                        <td id='agencyColumn'>{row.name_of_agency}</td>
                                        {/**client */}
                                        <td id='clientColumn'>{row.name_of_client}</td>
                                        {/**client type */}
                                        <td id='clientTypeColumn'>{row.name_of_client_type}</td>
                                        {/**process */}
                                        <td id='processColumn'>{row.process_name}</td>
                                        {/**PTT Weekly Update */}
                                        <td id='pttWeeklyUpdateColumn'>{row.ptt_weekly_update}</td>
                                        {/**PTT remark */}
                                        <td id='pttWeeklyUpdateColumn'>{row.remark}</td>
                                        {/**potential */}
                                        <td id='pttWeeklyUpdateColumn'>{row.potential}</td>
                                        {/**january */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`SGD1`}
                                                readOnly
                                                onMouseUp={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.SGD1} />
                                        </td>
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`RCC1`}
                                                readOnly
                                                onMouseUp={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.RCC1} />
                                        </td>
                                        <td>{row.PTT1}</td>
                                        {/**february */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`SGD2`}
                                                readOnly
                                                onMouseUp={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.SGD2} />
                                        </td>
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`RCC2`}
                                                readOnly
                                                onMouseUp={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.RCC2} />
                                        </td>
                                        <td>{row.PTT2}</td>
                                        {/**January */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`SGD3`}
                                                readOnly
                                                onMouseUp={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.SGD3} />
                                        </td>
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`RCC3`}
                                                readOnly
                                                onMouseUp={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.RCC3} />
                                        </td>
                                        <td>{row.PTT3}</td>
                                        {/**April */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`SGD1`}
                                                readOnly
                                                onMouseUp={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.SGD4} />
                                        </td>
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`RCC1`}
                                                readOnly
                                                onMouseUp={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.RCC4} />
                                        </td>
                                        <td>{row.PTT4}</td>
                                        {/**May */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`SGD5`}
                                                readOnly
                                                onMouseUp={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.SGD5} />
                                        </td>
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`RCC5`}
                                                readOnly
                                                onMouseUp={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.RCC5} />
                                        </td>
                                        <td>{row.PTT5}</td>
                                        {/**june */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`SGD6`}
                                                readOnly
                                                onMouseUp={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.SGD6} />
                                        </td>
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`RCC6`}
                                                readOnly
                                                onMouseUp={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.RCC6} />
                                        </td>
                                        <td>{row.PTT6}</td>
                                        {/**july */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`SGD7`}
                                                readOnly
                                                onMouseUp={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.SGD7} />
                                        </td>
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`RCC7`}
                                                readOnly
                                                onMouseUp={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.RCC7} />
                                        </td>
                                        <td>{row.PTT7}</td>
                                        {/**august */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`SGD8`}
                                                readOnly
                                                onMouseUp={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.SGD8} />
                                        </td>
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`RCC8`}
                                                readOnly
                                                onMouseUp={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.RCC8} />
                                        </td>
                                        <td>{row.PTT8}</td>
                                        {/**september */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`SGD9`}
                                                readOnly
                                                onMouseUp={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.SGD9} />
                                        </td>
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`RCC9`}
                                                readOnly
                                                onMouseUp={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.RCC9} />
                                        </td>
                                        <td>{row.PTT9}</td>
                                        {/**october */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`SGD10`}
                                                readOnly
                                                onMouseUp={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.SGD10} />
                                        </td>
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`RCC10`}
                                                readOnly
                                                onMouseUp={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.RCC10} />
                                        </td>
                                        <td>{row.PTT10}</td>
                                        {/**november */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`SGD11`}
                                                readOnly
                                                onMouseUp={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.SGD11} />
                                        </td>
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`RCC11`}
                                                readOnly
                                                onMouseUp={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.RCC11} />
                                        </td>
                                        <td>{row.PTT11}</td>
                                        {/**december */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`SGD12`}
                                                readOnly
                                                onMouseUp={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.SGD12} />
                                        </td>
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000)}`}
                                                name={`RCC12`}
                                                readOnly
                                                onMouseUp={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.RCC12} />
                                        </td>
                                        <td>{row.PTT12}</td>
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
export default ViewAdminSales 