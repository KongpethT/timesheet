import axios from 'axios'
import { useState, useEffect } from 'react'
import { account, api, forms, dates } from './variable/config'

const NewSales = () => {
    const [getOpenSales, setOpenSales] = useState({
        year: dates.get_year,
        NameOfAgency: '', NameOfClient: '',
        PTT: '', userCode: account.get_staff_code,
        Month: dates.get_month
    })
    const [getValidate, setValidate] = useState(null)
    const [getAgency, setAgency] = useState([])
    const [getClient, setClient] = useState([])
    const [getSubmit, setSubmit] = useState('')

    useEffect(() => {
        axios.get(`${api.sales}/${account.get_staff_code}/${account.get_state_code}?option=group by name_of_agency`)
            .then((brick) => {
                setAgency(brick.data)
            })
    }, [])

    const new_opent_sales = () => {
        if (
            !getOpenSales.NameOfAgency |
            !getOpenSales.NameOfClient |
            !getOpenSales.PTT
        ) {
            setValidate(forms.placeholder_warning)

        } else {
            axios.post(api.sales, { getOpenSales }).then((brick) => {
                const data = brick.data.affectedRows
                if (data === 1) {
                    window.location.href = "/sales/view"
                } else {
                    setSubmit('unsuccessfully')
                }
            })
        }
    }

    return (
        <div className="container">
            <h1>Open sales <span className='fs-6 primary'>{getSubmit}</span></h1>
            <hr />
            <div className="mb-3">
                <label for="year" class="form-label">Sales year</label>
                <input
                    type="text"
                    className="form-control"
                    aria-describedby="yearHelp"
                    defaultValue={dates.get_year}
                    onChange={(e) => { setOpenSales({ ...getOpenSales, year: e.target.value }) }}
                />
            </div>

            <div className="mb-3">
                <label for="NameOfMonth" class="form-label">Month</label>
                <input
                    type="text"
                    list="NameOfMonth"
                    className="form-control"
                    aria-describedby="NameOfMonthHelp"
                    defaultValue={dates.get_month}
                    onChange={(e) => { setOpenSales({ ...getOpenSales, Month: e.target.value }) }}
                />
                <datalist id="NameOfMonth">
                    {dates.name_month.map((name, index) => {
                        return (<option key={index}>{name}</option>)
                    })}
                </datalist>
            </div>


            <div className="mb-3">
                <label for="NameOfAgency" class="form-label">Name of agency</label>
                <input
                    id='placeholder-warning'
                    type="text"
                    list="NameOfAgency"
                    className="form-control"
                    aria-describedby="NameOfAagencyHelp"
                    placeholder={getValidate}
                    onChange={(e) => { setOpenSales({ ...getOpenSales, NameOfAgency: e.target.value }) }}
                />
                <datalist id="NameOfAgency">
                    {getAgency.map((row, index) => {
                        return (
                            <option key={index}>{row.name_of_agency}</option>
                        )
                    })}
                </datalist>
            </div>

            <div className="mb-3">
                <label for="NameOfclient" class="form-label">Name of client</label>
                <input
                    id='placeholder-warning'
                    type="text"
                    className="form-control"
                    aria-describedby="NameOfclientHelp"
                    placeholder={getValidate}
                    onChange={(e) => { setOpenSales({ ...getOpenSales, NameOfClient: e.target.value }) }}
                />

            </div>
            <div className="mb-3">
                <label for="PTT" class="form-label">Potential (PTT)</label>
                <input
                    id='placeholder-warning'
                    type="text"
                    className="form-control"
                    aria-describedby="PTTHelp"
                    placeholder={getValidate}
                    onChange={(e) => { setOpenSales({ ...getOpenSales, PTT: e.target.value }) }}
                />
            </div>

            <button
                type="submit"
                className="btn btn-primary"
                onClick={new_opent_sales}>Submit</button>

            <button
                style={{ marginLeft: '10px' }}
                type="submit" className="btn btn-primary"
                onClick={() => { window.location.href = "/sales/view" }}>Close</button>

        </div >

    )
}

export default NewSales 