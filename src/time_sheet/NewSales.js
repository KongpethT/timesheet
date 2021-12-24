import axios from 'axios'
import { useState } from 'react'
import { account, api } from './variable/config'

const NewSales = () => {
    const isYear = new Date().getFullYear()
    const isMonth = new Date().getMonth()
    const name_month = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December']

    const [getOpenSales, setOpenSales] = useState({
        year: isYear,
        NameOfAgency: '', NameOfClient: '',
        PTT: '', StaffCode: account.get_staff_code, Month: name_month[isMonth]
    })


    const new_opent_sales = () => {
        axios.post(api.sales, { getOpenSales })
    }

    return (
        <div className="container">
            <h1>Open sales</h1>
            <hr />
            <div class="mb-3">
                <label for="NameOfAgency" class="form-label">Sales year</label>
                <input
                    type="text"
                    class="form-control"
                    aria-describedby="NameOfAgencyHelp"
                    defaultValue={isYear}
                    onChange={(e) => { setOpenSales({ ...getOpenSales, year: e.target.value }) }}
                />
            </div>
            <div class="mb-3">
                <label for="NameOfMonth" class="form-label">Month</label>
                <input
                    type="text"
                    list="NameOfMonth"
                    class="form-control"
                    aria-describedby="NameOfAagencyHelp"
                    defaultValue={name_month[isMonth]}
                    onChange={(e) => { setOpenSales({ ...getOpenSales, Month: e.target.value }) }}
                />
                <datalist id="NameOfMonth">
                    {name_month.map((name, index) => {
                        return (<option key={index}>{name}</option>)
                    })}

                </datalist>
            </div>
            <div class="mb-3">
                <label for="NameOfAgency" class="form-label">Name of agency</label>
                <input
                    type="text"
                    list="NameOfAgency"
                    class="form-control"
                    aria-describedby="NameOfAagencyHelp"
                    defaultValue={getOpenSales.NameOfAgency}
                    onChange={(e) => { setOpenSales({ ...getOpenSales, NameOfAgency: e.target.value }) }}
                />
                <datalist id="NameOfAgency">
                    <option>Volvo</option>
                    <option>Saab</option>
                    <option>Mercedes</option>
                    <option>Audi</option>
                </datalist>
            </div>

            <div class="mb-3">
                <label for="NameOfclient" class="form-label">Name of client</label>
                <input
                    type="text"
                    list="NameOfclient"
                    class="form-control"
                    aria-describedby="NameOfclientHelp"
                    defaultValue={getOpenSales.NameOfClient}
                    onChange={(e) => { setOpenSales({ ...getOpenSales, NameOfClient: e.target.value }) }}
                />
                <datalist id="NameOfclient">
                    <option>Volvox</option>
                    <option>Saab</option>
                    <option>Mercedes</option>
                    <option>Audi</option>
                </datalist>

            </div>
            <div class="mb-3">
                <label for="ptt" class="form-label">Potential (PTT)</label>
                <input
                    type="text"
                    class="form-control"
                    id="ptt"
                    aria-describedby="pttHelp"
                    defaultValue={getOpenSales.PTT}
                    onChange={(e) => { setOpenSales({ ...getOpenSales, PTT: e.target.value }) }}
                />
            </div>
            <button type="submit" class="btn btn-primary" onClick={new_opent_sales}>Submit</button>
            <button
                style={{ marginLeft: '10px' }}
                type="submit" class="btn btn-primary"
                onClick={() => { window.location.href = "/sales/view" }}>Close</button>
        </div>
    )
}

export default NewSales 