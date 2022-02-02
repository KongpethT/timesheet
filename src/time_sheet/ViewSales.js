import axios from "axios"
import { useState, useEffect, useCallback } from "react"
import { memory, api, colors } from './configure/env'
const ViewSales = () => {
    if (memory.get_token === null) { window.location.href = '/' }
    const columnSizeA = '250px'
    const [getCount, setCount] = useState(0)
    const [getRowId, setRowId] = useState(null)
    const [getClient, setClient] = useState('')
    const [getDataSales, setDataSales] = useState([])
    const [getProcess, setProcess] = useState([])
    const [getClientType, setClientType] = useState([])
    const [getCountPTT, setCountPTT] = useState({
        ptt1: 0, ptt2: 0, ptt3: 0, ptt4: 0, ptt5: 0, ptt6: 0,
        ptt7: 0, ptt8: 0, ptt9: 0, ptt10: 0, ptt11: 0, ptt12: 0, total: 0
    })
    /**pull table v_forecast_ptt */
    const pullSales = useCallback(() => {
        const value = { id: JSON.parse(memory.get_account_id), agency: getClient }
        axios.get(`${api.sales}/${JSON.stringify(value)}`).then((brick) => {
            setDataSales([])
            setDataSales(brick.data)
        })
        return () => {
            getClient()
        }
    }, [getClient])
    useEffect(() => {
        pullSales()
    }, [pullSales])
    /**reload table sales */
    const reloadSales = useCallback(() => {
        const value = { id: JSON.parse(memory.get_account_id), agency: getClient }
        axios.get(`${api.sales}/${JSON.stringify(value)}`).then((brick) => {
            setDataSales([])
            setDataSales(brick.data)
            return () => {
                //getCount()
            }
        })
    }, [getCount])
    useEffect(() => {
        reloadSales()
    }, [reloadSales])
    /**pull table forcecast (count PTT1-12) */
    const pullCountPTT = useCallback(() => {
        const value = { id: JSON.parse(memory.get_account_id), agency: getClient }
        axios.get(`${api.sales}/count/${JSON.stringify(value)}`).then((brick) => {
            setCountPTT(brick.data[0])
        })
        return () => { getClient() }
    }, [getClient])
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
        const column = document.getElementById(e.currentTarget.id)
        document.getElementById('agencyColumn').setAttribute('contenteditable', 'false')
        document.getElementById('clientColumn').setAttribute('contenteditable', 'false')
        column.style.backgroundColor = colors.get_column_edit
        if (column.hasAttribute('readOnly')) { column.removeAttribute('readOnly') }
        column.addEventListener("keyup", (e) => {
            if (e.key === 'Enter') {
                column.setAttribute('readOnly', '')
                axios.put(api.sales, { id: getRowId, row: e.target.name, value: e.target.value })
                    .then((brick) => {
                        const data = brick.data
                        if (data.affectedRows === 1) {
                            pullCountPTT()
                            setCount((getCount + 1) % 2)
                        }
                    })
            }
            if (e.key === 'Escape') {
                column.setAttribute('readOnly', 'readOnly')
            }
        })
    }

    /**put column clinet_type, process, PTT_weekly_update */
    const putColumnSelect = (e, rowId) => {
        axios.put(api.sales, { id: rowId, row: e.target.name, value: e.target.value })
            .then((brick) => {
                setRowId(null)
            })

    }
    /**resize window screen */
    //const [getWidthScreen, setWidthScreen] = useState(window.innerWidth)
    const [getHightScreen, setHeightScreen] = useState(window.innerHeight)
    window.addEventListener('resize', () => {
        //setWidthScreen(window.innerWidth)
        setHeightScreen(window.innerHeight)
    })
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
                        onChange={(e) => { setClient(e.target.value) }}
                        placeholder="Search a name of client" />
                </div>
                <div className="table-responsive"
                    style={{ height: getHightScreen - 190 }}>
                    <table className="table bg-light table-hover text-center table-bordered"
                        style={{
                            tableLayout: 'fixed',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}>
                        <thead style={{
                            position: 'sticky',
                            top: '0'

                        }}
                            className="bg-warning">
                            <tr style={{ backgroundColor: 'white' }}>
                                <td colSpan={7} style={{ width: '1400px', backgroundColor: 'transparent' }}></td>
                                <td colSpan={2} style={{ width: columnSizeA, backgroundColor: colors.get_bg_default, color: 'white' }}>January</td>
                                <td colSpan={2} style={{ width: columnSizeA }}>February</td>
                                <td colSpan={2} style={{ width: columnSizeA, backgroundColor: colors.get_bg_default, color: 'white' }}>March</td>
                                <td colSpan={2} style={{ width: columnSizeA }}>April</td>
                                <td colSpan={2} style={{ width: columnSizeA, backgroundColor: colors.get_bg_default, color: 'white' }}>May</td>
                                <td colSpan={2} style={{ width: columnSizeA }}>June</td>
                                <td colSpan={2} style={{ width: columnSizeA, backgroundColor: colors.get_bg_default, color: 'white' }}>July</td>
                                <td colSpan={2} style={{ width: columnSizeA }}>August</td>
                                <td colSpan={2} style={{ width: columnSizeA, backgroundColor: colors.get_bg_default, color: 'white' }}>September</td>
                                <td colSpan={2} style={{ width: columnSizeA }}>October</td>
                                <td colSpan={2} style={{ width: columnSizeA, backgroundColor: colors.get_bg_default, color: 'white' }}>November</td>
                                <td colSpan={2} style={{ width: columnSizeA }}>December</td>
                                <td colSpan={2} style={{ width: '300px', backgroundColor: 'gainsboro' }}>summary of activity</td>
                            </tr>
                            <tr style={{ backgroundColor: 'white' }}>
                                <td colSpan={7} style={{ width: '1395px', backgroundColor: 'transparent' }}></td>
                                <td>{getCountPTT.ptt1}</td>
                                <td>{getCountPTT.PRO1}</td>
                                <td>{getCountPTT.ptt2}</td>
                                <td>{getCountPTT.PRO2}</td>
                                <td>{getCountPTT.ptt3}</td>
                                <td>{getCountPTT.PRO3}</td>
                                <td>{getCountPTT.ptt4}</td>
                                <td>{getCountPTT.PRO4}</td>
                                <td>{getCountPTT.ptt5}</td>
                                <td>{getCountPTT.PRO5}</td>
                                <td>{getCountPTT.ptt6}</td>
                                <td>{getCountPTT.PRO6}</td>
                                <td>{getCountPTT.ptt7}</td>
                                <td>{getCountPTT.PRO7}</td>
                                <td>{getCountPTT.ptt8}</td>
                                <td>{getCountPTT.PRO8}</td>
                                <td>{getCountPTT.ptt9}</td>
                                <td>{getCountPTT.PRO9}</td>
                                <td>{getCountPTT.ptt10}</td>
                                <td>{getCountPTT.PRO10}</td>
                                <td>{getCountPTT.ptt11}</td>
                                <td>{getCountPTT.PRO11}</td>
                                <td>{getCountPTT.ptt12}</td>
                                <td>{getCountPTT.PRO12}</td>
                                <td style={{ backgroundColor: colors.get_bg_default, color: 'white' }}>{getCountPTT.total_PTT}</td>
                                <td style={{ backgroundColor: colors.get_bg_default, color: 'white' }}>{getCountPTT.total_PRO}</td>
                            </tr>
                            <tr style={{ backgroundColor: colors.get_bg_default, color: 'white' }}>
                                {/**agency */}
                                <th>name of agency</th>
                                {/**client */}
                                <th className="bg-secondary" style={{ position: 'sticky', left: '0', color: 'black' }}>name of client</th>
                                {/**client type */}
                                <th>client type</th>
                                {/**process */}
                                <th>process</th>
                                {/**PTT Weekly Update */}
                                <th>PTT weekly update</th>
                                {/**remark */}
                                <th>remark</th>
                                {/**potential */}
                                <th>potential %</th>
                                {/**januaty */}
                                <th style={{ backgroundColor: colors.get_bg_PTT, color: 'black' }}>PTT</th>
                                <th style={{ backgroundColor: colors.get_bg_PRO, color: 'black' }}>PRO</th>
                                {/**february */}
                                <th style={{ backgroundColor: colors.get_bg_PTT, color: 'black' }}>PTT</th>
                                <th style={{ backgroundColor: colors.get_bg_PRO, color: 'black' }}>PRO</th>
                                {/**March */}
                                <th style={{ backgroundColor: colors.get_bg_PTT, color: 'black' }}>PTT</th>
                                <th style={{ backgroundColor: colors.get_bg_PRO, color: 'black' }}>PRO</th>
                                {/**april */}
                                <th style={{ backgroundColor: colors.get_bg_PTT, color: 'black' }}>PTT</th>
                                <th style={{ backgroundColor: colors.get_bg_PRO, color: 'black' }}>PRO</th>
                                {/**may */}
                                <th style={{ backgroundColor: colors.get_bg_PTT, color: 'black' }}>PTT</th>
                                <th style={{ backgroundColor: colors.get_bg_PRO, color: 'black' }}>PRO</th>
                                {/**june */}
                                <th style={{ backgroundColor: colors.get_bg_PTT, color: 'black' }}>PTT</th>
                                <th style={{ backgroundColor: colors.get_bg_PRO, color: 'black' }}>PRO</th>
                                {/**july */}
                                <th style={{ backgroundColor: colors.get_bg_PTT, color: 'black' }}>PTT</th>
                                <th style={{ backgroundColor: colors.get_bg_PRO, color: 'black' }}>PRO</th>
                                {/**august */}
                                <th style={{ backgroundColor: colors.get_bg_PTT, color: 'black' }}>PTT</th>
                                <th style={{ backgroundColor: colors.get_bg_PRO, color: 'black' }}>PRO</th>
                                {/**september */}
                                <th style={{ backgroundColor: colors.get_bg_PTT, color: 'black' }}>PTT</th>
                                <th style={{ backgroundColor: colors.get_bg_PRO, color: 'black' }}>PRO</th>
                                {/**october */}
                                <th style={{ backgroundColor: colors.get_bg_PTT, color: 'black' }}>PTT</th>
                                <th style={{ backgroundColor: colors.get_bg_PRO, color: 'black' }}>PRO</th>
                                {/**november */}
                                <th style={{ backgroundColor: colors.get_bg_PTT, color: 'black' }}>PTT</th>
                                <th style={{ backgroundColor: colors.get_bg_PRO, color: 'black' }}>PRO</th>
                                {/**december */}
                                <th style={{ backgroundColor: colors.get_bg_PTT, color: 'black' }}>PTT</th>
                                <th style={{ backgroundColor: colors.get_bg_PRO, color: 'black' }}>PRO</th>
                                {/**total PTT */}
                                <th style={{ backgroundColor: 'gray', color: 'white' }}>TPTT</th>
                                <th style={{ backgroundColor: 'gray', color: 'white' }}>TPRO</th>
                            </tr>
                        </thead>
                        <tbody>

                            {getDataSales.map((row, index) => {

                                return (
                                    <tr key={index} onClick={() => { setRowId(row.id) }}>
                                        {/**agency contenteditable='false'*/}
                                        <td id='agencyColumn'>{row.name_of_agency}</td>
                                        {/**client */}
                                        <td id='clientColumn' className="bg-success" style={{ position: 'sticky', top: 120, left: '0' }}>{row.name_of_client}</td>
                                        {/**client type */}
                                        <td id='clientTypeColumn'>
                                            <select
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`client_type_id`}
                                                className="form-control form-control-sm form-select form-select-sm mb-3"
                                                readOnly
                                                onClick={(e) => { putColumnSelect(e, row.id) }}>
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
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`process_id`}
                                                className="form-control form-control-sm form-select form-select-sm mb-3"
                                                readOnly
                                                onClick={(e) => { putColumnSelect(e, row.id) }}>
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
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`ptt_weekly_update`}
                                                className="form-control form-control-sm form-select form-select-sm mb-3"
                                                readOnly
                                                onClick={(e) => { putColumnSelect(e, row.id) }}>
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
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`remark`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.remark} />
                                        </td>
                                        {/**potential */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`potential`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={row.potential} />
                                        </td>
                                        {/**january */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`PTT1`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={(row.PTT1 === '0') ? '' : row.PTT1} />
                                        </td>
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`PRO1`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={(row.PRO1 === '0') ? '' : row.PRO1} />
                                        </td>
                                        {/**february */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`PTT2`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={(row.PTT2 === '0') ? '' : row.PTT2} />
                                        </td>
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`PRO2`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={(row.PRO2 === '0') ? '' : row.PRO2} />
                                        </td>
                                        {/**January */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`PTT3`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={(row.PTT3 === '0') ? '' : row.PTT3} />
                                        </td>
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`PRO3`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={(row.PRO3 === '0') ? '' : row.PRO3} />
                                        </td>
                                        {/**April */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`PTT4`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={(row.PTT4 === '0') ? '' : row.PTT4} />
                                        </td>
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`PRO4`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={(row.PRO4 === '0') ? '' : row.PRO4} />
                                        </td>
                                        {/**May */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`PTT5`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={(row.PTT5 === '0') ? '' : row.PTT5} />
                                        </td>
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`PRO5`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={(row.PRO5 === '0') ? '' : row.PRO5} />
                                        </td>
                                        {/**june */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`PTT6`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={(row.PTT6 === '0') ? '' : row.PTT6} />
                                        </td>
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`PRO6`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={(row.PRO6 === '0') ? '' : row.PRO6} />
                                        </td>
                                        {/**july */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`PTT7`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={(row.PTT7 === '0') ? '' : row.PTT7} />
                                        </td>
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`PRO7`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={(row.PRO7 === '0') ? '' : row.PRO7} />
                                        </td>
                                        {/**august */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`PTT8`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={(row.PTT8 === '0') ? '' : row.PTT8} />
                                        </td>
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`PRO8`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={(row.PRO8 === '0') ? '' : row.PRO8} />
                                        </td>
                                        {/**september */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`PTT9`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={(row.PTT9 === '0') ? '' : row.PTT9} />
                                        </td>
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`PRO9`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={(row.PRO9 === '0') ? '' : row.PRO9} />
                                        </td>
                                        {/**october */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`PTT10`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={(row.PTT10 === '0') ? '' : row.PTT10} />
                                        </td>
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`PRO10`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={(row.PRO10 === '0') ? '' : row.PRO10} />
                                        </td>
                                        {/**november */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`PTT11`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={(row.PTT11 === '0') ? '' : row.PTT11} />
                                        </td>
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`PRO11`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={(row.PRO11 === '0') ? '' : row.PRO11} />
                                        </td>
                                        {/**december */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`PTT12`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={(row.PTT12 === '0') ? '' : row.PTT12} /></td>
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`PRO12`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={(row.PRO12 === '0') ? '' : row.PRO12} />
                                        </td>
                                        {/**TPTT */}
                                        <td style={{ backgroundColor: 'gainsboro' }}>{(row.total_PTT === '0') ? '' : row.total_PTT}</td>
                                        <td style={{ backgroundColor: 'white' }}>{(row.total_PRO === '0') ? '' : row.total_PRO}</td>
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