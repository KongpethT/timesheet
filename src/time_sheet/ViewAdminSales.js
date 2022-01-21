import axios from "axios"
import { useState, useEffect, useCallback } from "react"
import { memory, api, colors } from './configure/env'
const ViewAdminSales = () => {
    if (memory.get_token === null) { window.location.href = '/' }
    const columnSizeA = '150px'
    const columnSizeB = '150px'
    const columnSizeC = '450px'  
    const [getCount, setCount] = useState(0)
    const [getID, setID] = useState(null)
    const [getClient, setClinet] = useState('')
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
        const value = { id: JSON.parse(memory.get_account_id), agency: getClient }
        axios.get(`${api.sales}/all/${JSON.stringify(value)}`).then((brick) => {
            setDataSales([])
            setDataSales(brick.data)
        })
    }, [getClient])
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
        const value = { id: JSON.parse(memory.get_account_id), agency: getClient }
        axios.get(`${api.sales}/countAll/${JSON.stringify(value)}`).then((brick) => {
            setCountPSR(brick.data[0])
        })
    }, [getClient])
    useEffect(() => {
        pullCountPTT()
    }, [pullCountPTT])
    /**update table forecast*/
    const putForecast = (e) => {
        const columeName = e.target.name
        const column = document.getElementById(e.currentTarget.id)
        document.getElementById('agencyColumn').setAttribute('contenteditable', 'false')
        document.getElementById('clientColumn').setAttribute('contenteditable', 'false')
        if (column.hasAttribute('readOnly')) { column.removeAttribute('readOnly') }
        column.style.backgroundColor = colors.get_column_edit
        column.addEventListener("keyup", (e) => {
            if (e.key === 'Enter') {
                column.setAttribute('readOnly', '')
                axios.put(api.sales, { id: getID, row: e.target.name, value: e.target.value })
                    .then((brick) => {
                        const data = brick.data
                        if (data.affectedRows === 1) {
                            column.style.backgroundColor = ''
                            pullCountPTT()
                            //console.log(columnName);
                            //setCount((getCount + 1) % 2)
                        }
                    })
            }
            if (e.key === 'Escape') {
                column.setAttribute('readOnly', 'readOnly')
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
                        onChange={(e) => { setClinet(e.target.value) }}
                        placeholder="Search a name of client" />
                </div>
                <div className="table-responsive"
                    style={{ height: '480px' }}>
                    <table className="table bg-light table-hover text-center table-bordered"
                        style={{
                            tableLayout: 'fixed',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}>
                        <thead style={{
                            position: 'sticky',
                            top: '0',
                            left: '0',
                        }}
                            className="bg-warning">
                            <tr style={{ backgroundColor: 'white' }}>
                                <td colSpan={8} style={{ width: '1395px', backgroundColor: 'transparent' }}></td>
                                <td colSpan={3} style={{ width: columnSizeC, backgroundColor: colors.get_bg_default, color: 'white' }}>January</td>
                                <td colSpan={3} style={{ width: columnSizeC }}>February</td>
                                <td colSpan={3} style={{ width: columnSizeC, backgroundColor: colors.get_bg_default, color: 'white' }}>March</td>
                                <td colSpan={3} style={{ width: columnSizeC }}>April</td>
                                <td colSpan={3} style={{ width: columnSizeC, backgroundColor: colors.get_bg_default, color: 'white' }}>May</td>
                                <td colSpan={3} style={{ width: columnSizeC }}>June</td>
                                <td colSpan={3} style={{ width: columnSizeC, backgroundColor: colors.get_bg_default, color: 'white' }}>July</td>
                                <td colSpan={3} style={{ width: columnSizeC }}>August</td>
                                <td colSpan={3} style={{ width: columnSizeC, backgroundColor: colors.get_bg_default, color: 'white' }}>September</td>
                                <td colSpan={3} style={{ width: columnSizeC }}>October</td>
                                <td colSpan={3} style={{ width: columnSizeC, backgroundColor: colors.get_bg_default, color: 'white' }}>November</td>
                                <td colSpan={3} style={{ width: columnSizeC }}>December</td>
                            </tr>
                            <tr style={{ backgroundColor: 'white' }}>
                                <td colSpan={8} style={{ width: '1395px', backgroundColor: 'transparent' }}></td>
                                <td>{getCountPSR.SGD1}</td>
                                <td>{getCountPSR.RCC1}</td>
                                <td>{getCountPSR.ptt1}</td>
                                <td>{getCountPSR.SGD2}</td>
                                <td>{getCountPSR.RCC2}</td>
                                <td>{getCountPSR.ptt2}</td>
                                <td>{getCountPSR.SGD3}</td>
                                <td>{getCountPSR.RCC3}</td>
                                <td>{getCountPSR.ptt3}</td>
                                <td>{getCountPSR.SGD4}</td>
                                <td>{getCountPSR.RCC4}</td>
                                <td>{getCountPSR.ptt4}</td>
                                <td>{getCountPSR.SGD5}</td>
                                <td>{getCountPSR.RCC5}</td>
                                <td>{getCountPSR.ptt5}</td>
                                <td>{getCountPSR.SGD6}</td>
                                <td>{getCountPSR.RCC6}</td>
                                <td>{getCountPSR.ptt6}</td>
                                <td>{getCountPSR.SGD7}</td>
                                <td>{getCountPSR.RCC7}</td>
                                <td>{getCountPSR.ptt7}</td>
                                <td>{getCountPSR.SGD8}</td>
                                <td>{getCountPSR.RCC8}</td>
                                <td>{getCountPSR.ptt8}</td>
                                <td>{getCountPSR.SGD9}</td>
                                <td>{getCountPSR.RCC9}</td>
                                <td>{getCountPSR.ptt9}</td>
                                <td>{getCountPSR.SGD10}</td>
                                <td>{getCountPSR.RCC10}</td>
                                <td>{getCountPSR.ptt10}</td>
                                <td>{getCountPSR.SGD11}</td>
                                <td>{getCountPSR.RCC11}</td>
                                <td>{getCountPSR.ptt11}</td>
                                <td>{getCountPSR.SGD12}</td>
                                <td>{getCountPSR.RCC2}</td>
                                <td>{getCountPSR.ptt12}</td>
                            </tr>
                            <tr>
                                {/**ae */}
                                <th style={{ width: '180px' }}>name of ae</th>
                                {/**agency */}
                                <th style={{ width: '250px' }}>name of agency</th>
                                {/**client */}
                                <th className="bg-secondary" style={{ width: '250px', position: 'sticky', left: '0' }}>name of client</th>
                                {/**client type */}
                                <th style={{ width: '100px' }}>client type</th>
                                {/**process */}
                                <th style={{ width: '180px' }}>process</th>
                                {/**PTT Weekly Update */}
                                <th style={{ width: '250px' }}>PTT weekly update</th>
                                {/**remark */}
                                <th style={{ width: '250px' }}>remark</th>
                                {/**potential */}
                                <th style={{ width: '250px' }}>potential %</th>
                                {/**januaty */}
                                <th className="text-light" style={{ width: columnSizeB, backgroundColor: '#70AD47' }}>SGD</th>
                                <th className="text-light" style={{ width: columnSizeB, backgroundColor: '#4472C4' }}>RCC</th>
                                <th className="text-light" style={{ width: columnSizeA, backgroundColor: '#FFC000' }}>PTT</th>


                                {/**february */}
                                <th className="text-light" style={{ width: columnSizeB, backgroundColor: '#70AD47' }}>SGD</th>
                                <th className="text-light" style={{ width: columnSizeB, backgroundColor: '#4472C4' }}>RCC</th>
                                <th className="text-light" style={{ width: columnSizeA, backgroundColor: '#FFC000' }}>PTT</th>
                                {/**march */}
                                <th className="text-light" style={{ width: columnSizeB, backgroundColor: '#70AD47' }}>SGD</th>
                                <th className="text-light" style={{ width: columnSizeB, backgroundColor: '#4472C4' }}>RCC</th>
                                <th className="text-light" style={{ width: columnSizeA, backgroundColor: '#FFC000' }}>PTT</th>
                                {/**april */}
                                <th className=" text-light" style={{ width: columnSizeB, backgroundColor: '#70AD47' }}>SGD</th>
                                <th className="text-light" style={{ width: columnSizeB, backgroundColor: '#4472C4' }}>RCC</th>
                                <th className="text-light" style={{ width: columnSizeA, backgroundColor: '#FFC000' }}>PTT</th>
                                {/**may */}
                                <th className=" text-light" style={{ width: columnSizeB, backgroundColor: '#70AD47' }}>SGD</th>
                                <th className="text-light" style={{ width: columnSizeB, backgroundColor: '#4472C4' }}>RCC</th>
                                <th className="text-light" style={{ width: columnSizeA, backgroundColor: '#FFC000' }}>PTT</th>
                                {/**june */}
                                <th className=" text-light" style={{ width: columnSizeB, backgroundColor: '#70AD47' }}>SGD</th>
                                <th className="text-light" style={{ width: columnSizeB, backgroundColor: '#4472C4' }}>RCC</th>
                                <th className="text-light" style={{ width: columnSizeA, backgroundColor: '#FFC000' }}>PTT</th>
                                {/**july */}
                                <th className=" text-light" style={{ width: columnSizeB, backgroundColor: '#70AD47' }}>SGD</th>
                                <th className="text-light" style={{ width: columnSizeB, backgroundColor: '#4472C4' }}>RCC</th>
                                <th className="text-light" style={{ width: columnSizeA, backgroundColor: '#FFC000' }}>PTT</th>
                                {/**august */}
                                <th className=" text-light" style={{ width: columnSizeB, backgroundColor: '#70AD47' }}>SGD</th>
                                <th className="text-light" style={{ width: columnSizeB, backgroundColor: '#4472C4' }}>RCC</th>
                                <th className="text-light" style={{ width: columnSizeA, backgroundColor: '#FFC000' }}>PTT</th>
                                {/**september */}
                                <th className=" text-light" style={{ width: columnSizeB, backgroundColor: '#70AD47' }}>SGD</th>
                                <th className="text-light" style={{ width: columnSizeB, backgroundColor: '#4472C4' }}>RCC</th>
                                <th className="text-light" style={{ width: columnSizeA, backgroundColor: '#FFC000' }}>PTT</th>
                                {/**october */}
                                <th className=" text-light" style={{ width: columnSizeB, backgroundColor: '#70AD47' }}>SGD</th>
                                <th className="text-light" style={{ width: columnSizeB, backgroundColor: '#4472C4' }}>RCC</th>
                                <th className="text-light" style={{ width: columnSizeA, backgroundColor: '#FFC000' }}>PTT</th>
                                {/**november */}
                                <th className=" text-light" style={{ width: columnSizeB, backgroundColor: '#70AD47' }}>SGD</th>
                                <th className="text-light" style={{ width: columnSizeB, backgroundColor: '#4472C4' }}>RCC</th>
                                <th className="text-light" style={{ width: columnSizeA, backgroundColor: '#FFC000' }}>PTT</th>
                                {/**december */}
                                <th className="text-light" style={{ width: columnSizeB, backgroundColor: '#70AD47' }}>SGD</th>
                                <th className="text-light" style={{ width: columnSizeB, backgroundColor: '#4472C4' }}>RCC</th>
                                <th className="text-light" style={{ width: columnSizeA, backgroundColor: '#FFC000' }}>PTT</th>
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
                                        <td id='clientColumn' className="bg-success" style={{ position: 'sticky', top: 121, left: '0' }}>{row.name_of_client}</td>
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
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`SGD1`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                //defaultValue={row.SGD1}
                                                defaultValue={(row.SGD1 === '0') ? '' : row.SGD1} />
                                        </td>
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`RCC1`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={(row.RCC1 === '0') ? '' : row.RCC1} />
                                        </td>
                                        <td>{row.PTT1}</td>
                                        {/**february */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`SGD2`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={(row.SGD2 === '0') ? '' : row.SGD2} />
                                        </td>
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`RCC2`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={(row.RCC2 === '0') ? '' : row.RCC2} />
                                        </td>
                                        <td>{row.PTT2}</td>
                                        {/**March */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`SGD3`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={(row.SGD3 === '0') ? '' : row.SGD3} />
                                        </td>
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`RCC3`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={(row.RCC3 === '0') ? '' : row.RCC3} />
                                        </td>
                                        <td>{row.PTT3}</td>
                                        {/**April */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`SGD4`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={(row.SGD4 === '0') ? '' : row.SGD4} />
                                        </td>
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`RCC4`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={(row.RCC4 === '0') ? '' : row.RCC4} />
                                        </td>
                                        <td>{row.PTT4}</td>
                                        {/**May */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`SGD5`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={(row.SGD5 === '0') ? '' : row.SGD5} />
                                        </td>
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`RCC5`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={(row.RCC5 === '0') ? '' : row.RCC5} />
                                        </td>
                                        <td>{row.PTT5}</td>
                                        {/**june */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`SGD6`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={(row.SGD6 === '0') ? '' : row.SGD6} />
                                        </td>
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`RCC6`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={(row.RCC6 === '0') ? '' : row.RCC6} />
                                        </td>
                                        <td>{row.PTT6}</td>
                                        {/**july */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`SGD7`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={(row.SGD7 === '0') ? '' : row.SGD7} />
                                        </td>
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`RCC7`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={(row.RCC7 === '0') ? '' : row.RCC7} />
                                        </td>
                                        <td>{row.PTT7}</td>
                                        {/**august */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`SGD8`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={(row.SGD8 === '') ? '' : row.SGD8} />
                                        </td>
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`RCC8`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={(row.RCC8 === '0') ? '' : row.RCC8} />
                                        </td>
                                        <td>{row.PTT8}</td>
                                        {/**september */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`SGD9`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={(row.SGD9 === '0') ? '' : row.SGD9} />
                                        </td>
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`RCC9`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={(row.RCC9 === '0') ? '' : row.RCC9} />
                                        </td>
                                        <td>{row.PTT9}</td>
                                        {/**october */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`SGD10`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={(row.SGD10 === '0') ? '' : row.SGD10} />
                                        </td>
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`RCC10`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={(row.RCC10 === '0') ? '' : row.RCC10} />
                                        </td>
                                        <td>{row.PTT10}</td>
                                        {/**november */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`SGD11`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={(row.SGD11 === '0') ? '' : row.SGD11} />
                                        </td>
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`RCC11`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={(row.RCC11 === '0') ? '' : row.RCC11} />
                                        </td>
                                        <td>{row.PTT11}</td>
                                        {/**december */}
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`SGD12`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={(row.SGD12 === '0') ? '' : row.SGD12} />
                                        </td>
                                        <td>
                                            <input
                                                id={`inputId${Math.floor(Math.random() * 1000000)}`}
                                                name={`RCC12`}
                                                readOnly
                                                onDoubleClick={(e) => { putForecast(e) }}
                                                className="form-control form-control-sm"
                                                defaultValue={(row.RCC12 === '0') ? '' : row.RCC12} />
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