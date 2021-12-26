import axios from "axios"
import { useState, useEffect } from "react"
import { api, account } from "./variable/config"
const ViewSales = () => {
    const [getID, setID] = useState(null)
    const [getActive, setActive] = useState('disable')
    const [getAgencyName, setAgencyName] = useState('')
    const [getDataSales, setDataSales] = useState([])
    const [getCountPTT, setCountPTT] = useState({
        ptt1: 0, ptt2: 0, ptt3: 0, ptt4: 0, ptt5: 0, ptt6: 0,
        ptt7: 0, ptt8: 0, ptt9: 0, ptt10: 0, ptt11: 0, ptt12: 0
    })
    const [getPTT, setPTT] = useState({
        ptt1: 0, ptt2: 0, ptt3: 0, ptt4: 0, ptt5: 0, ptt6: 0,
        ptt7: 0, ptt8: 0, ptt9: 0, ptt10: 0, ptt11: 0, ptt12: 0
    })

    useEffect(() => {
        axios.get(`${api.sales}/${account.get_staff_code}/${account.get_state_code}?sqlString=*&option=${getAgencyName}`).then((brick) => {
            setDataSales(brick.data)
        })
        const sqlCountTPP = `
        sum(PTT1) as ptt1, sum(PTT2) as ptt2, sum(PTT3) as ptt3, 
        sum(PTT4) as ptt4, sum(PTT5) as ptt5, sum(PTT6) as ptt6, 
        sum(PTT7) as ptt7, sum(PTT8) as ptt8, sum(PTT9) as ptt9, 
        sum(PTT10) as ptt10, sum(PTT11) as ptt11, sum(PTT12) as ptt12`
        axios.get(`${api.sales}/${account.get_staff_code}/${account.get_state_code}?sqlString=${sqlCountTPP}&option=${getAgencyName}`).then((brick) => {
            const data = brick.data[0]
            setCountPTT({
                ...getCountPTT,
                ptt1: data.ptt1, ptt2: data.ptt2, ptt3: data.ptt3, ptt4: data.ptt4,
                ptt5: data.ptt5, ptt6: data.ptt6, ptt7: data.ptt7, ptt8: data.ptt8,
                ptt9: data.ptt9, ptt10: data.ptt10, ptt11: data.ptt11, ptt12: data.ptt12,
            })

        })

    }, [getAgencyName])

    const unlock = (e) => {
        const lock = document.getElementById(e.currentTarget.id)
        if (lock.hasAttribute('readOnly')) { lock.removeAttribute('readOnly') }
        lock.addEventListener("keyup", (e) => {
            //console.log(e.target);
            //console.log(e.target.value);
            if (e.key === 'Enter') {
                lock.setAttribute('readOnly', '')
                axios.put(api.sales, { id: getID, row: e.target.name, value: e.target.value })
            }
        })

    }

    return (
        <div className="table-responsive">
            <h1>View sales activity</h1>
            <hr />
            <div class="mb-3">
                <input
                    type="text"
                    class="form-control"
                    onChange={(e) => { setAgencyName(e.target.value) }}
                    placeholder="Search a name of agency" />
            </div>

            <table className="table bg-light table-hover text-center table-bordered"
                style={{
                    tableLayout: 'fixed',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}
            >
                <thead>
                    <tr>
                        <th style={{ width: '250px' }}><p>User of Agency</p></th>
                        <th style={{ width: '200px' }}><p>User of Client</p></th>
                        <th style={{ width: '100px' }}>
                            <button type="button" className="btn btn-outline-primary position-relative">
                                January <span class="badge bg-warning">{getCountPTT.ptt1}</span>
                            </button>
                            <br />PTT<br /></th>
                        <th style={{ width: '120px' }}>
                            <button type="button" className="btn btn-outline-primary position-relative">
                                February <span class="badge bg-warning">{getCountPTT.ptt2}</span>
                            </button>
                            <br />PTT<br /></th>
                        <th style={{ width: '100px' }}>
                            <button type="button" className="btn btn-outline-primary position-relative">
                                January <span class="badge bg-warning">{getCountPTT.ptt3}</span>
                            </button>
                            <br />PTT<br /></th>
                        <th style={{ width: '100px' }}>
                            <button type="button" className="btn btn-outline-primary position-relative">
                                April <span class="badge bg-warning">{getCountPTT.ptt4}</span>
                            </button>
                            <br />PTT<br /></th>
                        <th style={{ width: '90px' }}>
                            <button type="button" className="btn btn-outline-primary position-relative">
                                May <span class="badge bg-warning">{getCountPTT.ptt5}</span>
                            </button>
                            <br />PTT<br /></th>
                        <th style={{ width: '100px' }}>
                            <button type="button" className="btn btn-outline-primary position-relative">
                                June <span class="badge bg-warning">{getCountPTT.ptt6}</span>
                            </button>
                            <br />PTT<br /></th>
                        <th style={{ width: '90px' }}>
                            <button type="button" className="btn btn-outline-primary position-relative">
                                July <span class="badge bg-warning">{getCountPTT.ptt7}</span>
                            </button>
                            <br />PTT<br /></th>
                        <th style={{ width: '100px' }}>
                            <button type="button" className="btn btn-outline-primary position-relative">
                                August <span class="badge bg-warning">{getCountPTT.ptt8}</span>
                            </button>
                            <br />PTT<br /></th>
                        <th style={{ width: '120px' }}>
                            <button type="button" className="btn btn-outline-primary position-relative">
                                September <span class="badge bg-warning">{getCountPTT.ptt9}</span>
                            </button>
                            <br />PTT<br /></th>
                        <th style={{ width: '100px' }}>
                            <button type="button" className="btn btn-outline-primary position-relative">
                                October <span class="badge bg-warning">{getCountPTT.ptt10}</span>
                            </button>
                            <br />PTT<br /></th>
                        <th style={{ width: '120px' }}>
                            <button type="button" className="btn btn-outline-primary position-relative">
                                November <span class="badge bg-warning">{getCountPTT.ptt11}</span>
                            </button>
                            <br />PTT<br /></th>
                        <th style={{ width: '120px' }}>
                            <button type="button" className="btn btn-outline-primary position-relative">
                                December <span class="badge bg-warning">{getCountPTT.ptt12}</span>
                            </button>
                            <br />PTT<br /></th>
                    </tr>
                </thead>
                <tbody>

                    {getDataSales.map((row, index) => {

                        return (
                            <tr
                                key={index}
                                onMouseEnter={() => { setID(row.id) }}
                            >
                                <td contenteditable='false'>{row.name_of_agency}</td>
                                <td contenteditable='false'>{row.name_of_client}</td>
                                <td>
                                    <input
                                        id={`inputId${Math.floor(Math.random() * 1000)}`}
                                        name={`PTT1`}
                                        readOnly
                                        onMouseUp={(e) => { unlock(e) }}
                                        className="form-control form-control-sm"
                                        defaultValue={row.PTT1} />
                                </td>

                                <td>
                                    <input
                                        id={`inputId${Math.floor(Math.random() * 1000)}`}
                                        name={`PTT2`}
                                        readOnly
                                        onMouseUp={(e) => { unlock(e) }}
                                        className="form-control form-control-sm"
                                        defaultValue={row.PTT2} /></td>
                                <td>
                                    <input
                                        id={`inputId${Math.floor(Math.random() * 1000)}`}
                                        name={`PTT3`}
                                        readOnly
                                        onMouseUp={(e) => { unlock(e) }}
                                        className="form-control form-control-sm"
                                        defaultValue={row.PTT3} /></td>
                                <td>
                                    <input
                                        id={`inputId${Math.floor(Math.random() * 1000)}`}
                                        name={`PTT4`}
                                        readOnly
                                        onMouseUp={(e) => { unlock(e) }}
                                        className="form-control form-control-sm"
                                        defaultValue={row.PTT4} /></td>
                                <td>
                                    <input
                                        id={`inputId${Math.floor(Math.random() * 1000)}`}
                                        name={`PTT5`}
                                        readOnly
                                        onMouseUp={(e) => { unlock(e) }}
                                        className="form-control form-control-sm"
                                        defaultValue={row.PTT5} /></td>
                                <td>
                                    <input
                                        id={`inputId${Math.floor(Math.random() * 1000)}`}
                                        name={`PTT6`}
                                        readOnly
                                        onMouseUp={(e) => { unlock(e) }}
                                        className="form-control form-control-sm"
                                        defaultValue={row.PTT6} /></td>
                                <td>
                                    <input
                                        id={`inputId${Math.floor(Math.random() * 1000)}`}
                                        name={`PTT7`}
                                        readOnly
                                        onMouseUp={(e) => { unlock(e) }}
                                        className="form-control form-control-sm"
                                        defaultValue={row.PTT7} /></td>
                                <td>
                                    <input
                                        id={`inputId${Math.floor(Math.random() * 1000)}`}
                                        name={`PTT8`}
                                        readOnly
                                        onMouseUp={(e) => { unlock(e) }}
                                        className="form-control form-control-sm"
                                        defaultValue={row.PTT8} /></td>
                                <td>
                                    <input
                                        id={`inputId${Math.floor(Math.random() * 1000)}`}
                                        name={`PTT9`}
                                        readOnly
                                        onMouseUp={(e) => { unlock(e) }}
                                        className="form-control form-control-sm"
                                        defaultValue={row.PTT9} /></td>
                                <td>
                                    <input
                                        id={`inputId${Math.floor(Math.random() * 1000)}`}
                                        name={`PTT10`}
                                        readOnly
                                        onMouseUp={(e) => { unlock(e) }}
                                        className="form-control form-control-sm"
                                        defaultValue={row.PTT10} /></td>
                                <td>
                                    <input
                                        id={`inputId${Math.floor(Math.random() * 1000)}`}
                                        name={`PTT11`}
                                        readOnly
                                        onMouseUp={(e) => { unlock(e) }}
                                        className="form-control form-control-sm"
                                        defaultValue={row.PTT11} /></td>
                                <td>
                                    <input
                                        id={`inputId${Math.floor(Math.random() * 1000)}`}
                                        name={`PTT12`}
                                        readOnly
                                        onMouseUp={(e) => { unlock(e) }}
                                        className="form-control form-control-sm"
                                        defaultValue={row.PTT12} /></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table >
        </div >
    )
}

export default ViewSales 