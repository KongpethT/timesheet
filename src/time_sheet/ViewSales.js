import axios from "axios"
import { useState, useEffect } from "react"
import { api, account } from "./variable/config"

const ViewSales = () => {

    const [getSales, setSales] = useState([])
    const where = ``
    useEffect(() => {
        axios.get(`${api.sales}/${account.get_staff_code}/${account.get_state_code}?option=${where} order by name_of_agency `).then((brick) => {
            setSales(brick.data)
        })
    }, [])

    return (
        <div className="container">
            <h1>View sales activity</h1>
            <hr />
            <table
                className="table table-responsive table-hover bg-light text-center table-bordered table-sm">
                <thead>
                    <tr className="bg-warning">
                        <th>User of Agency</th>
                        <th>User of Client</th>
                        <th>January<br />PTT<br /></th>
                        <th>February<br />PTT<br /></th>
                        <th>March<br />PTT<br /></th>
                        <th>April<br />PTT<br /></th>
                        <th>May<br />PTT<br /></th>
                        <th>June<br />PTT<br /></th>
                        <th>July<br />PTT<br /></th>
                        <th>August<br />PTT<br /></th>
                        <th>September<br />PTT<br /></th>
                        <th>October<br />PTT<br /></th>
                        <th>November<br />PTT<br /></th>
                        <th>December<br />PTT<br /></th>
                    </tr>
                </thead>
                <tbody>

                    {getSales.map((row, index) => {
                        return (
                            <tr key={index}>
                                <td>{row.name_of_agency}</td>
                                <td>{row.name_of_client}</td>
                                <td>{row.PTT1}</td>
                                <td>{row.PTT2}</td>
                                <td>{row.PTT3}</td>
                                <td>{row.PTT4}</td>
                                <td>{row.PTT5}</td>
                                <td>{row.PTT6}</td>
                                <td>{row.PTT7}</td>
                                <td>{row.PTT8}</td>
                                <td>{row.PTT9}</td>
                                <td>{row.PTT10}</td>
                                <td>{row.PTT11}</td>
                                <td>{row.PTT12}</td>
                                <td><button className="btn btn-success btn-sm">save</button></td>

                            </tr>
                        )
                    })}





                </tbody>
            </table >
        </div >
    )
}

export default ViewSales 