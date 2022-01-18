import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { memory, api, dates } from './configure/env'
import { Tooltip, XAxis, YAxis, BarChart, Legend, CartesianGrid, Bar, Label, LabelList } from 'recharts'
import { HiChevronDoubleLeft } from "react-icons/hi";

const Dashboard = () => {
    if (memory.get_token === null) { window.location.href = '/' }
    /**charts demo */

    const [getBrick, setBrick] = useState([])
    const [getYear, setYear] = useState(dates.get_year)
    const [getMonth, setMonth] = useState([])
    const [getItem, setItem] = useState([])

    const data = ([
        { name: 'call', Activity: getBrick.count_call },
        { name: 'visit AM', Activity: getBrick.count_visit_am },
        { name: 'visit PM', Activity: getBrick.count_visit_pm },
        { name: 'site tour AM', Activity: getBrick.count_site_tour_am },
        { name: 'site tour PM', Activity: getBrick.count_site_tour_pm },
        { name: 'lunch', Activity: getBrick.count_lunch },
        { name: 'dinner', Activity: getBrick.count_dinner },
        { name: 'other', Activity: getBrick.count_other },
    ])

    /**pull table timeline count activity per year*/
    const pullDataAnalyticsPerYear = useCallback(() => {
        axios.get(`${api.dashboard}/timeline/count/activity/year/${getYear}`).then((brick) => {
            setBrick(brick.data)
        })
    }, [getYear])
    useEffect(() => {
        pullDataAnalyticsPerYear()
        return () => { }
    }, [pullDataAnalyticsPerYear])
    /**pull table timeline count activity per month*/
    const pullDataAnalyticsPerMonth = useCallback(() => {
        /*
        axios.get(`${api.dashboard}//timeline/count/activity/month/${getMonth}`).then((brick) => {
            console.log(brick.data)
        })
        */
    }, [getMonth])
    useEffect(() => {
        pullDataAnalyticsPerMonth()
        return () => { }
    }, [pullDataAnalyticsPerMonth])
    /**event click selected month*/

    const eventSelectMount = (e) => {
        const checked = document.querySelectorAll('input.form-check-input')
        const id = parseInt(e.target.name)
        const isCheck = e.target.checked
        if (id === 0 & isCheck) {
            for (let i = 1; i < checked.length; i++) {
                checked[i].className = 'form-check-input bg-danger me-md-4'
                checked[i].disabled = true
                checked[i].checked = true
            }
            setMonth([
                {
                    1: dates.get_year + '-01', 2: dates.get_year + '-02', 3: dates.get_year + '-03', 4: dates.get_year + '-04',
                    5: dates.get_year + '-05', 6: dates.get_year + '-06', 7: dates.get_year + '-07', 8: dates.get_year + '-08',
                    9: dates.get_year + '-09', 10: dates.get_year + '-10', 11: dates.get_year + '-11', 12: dates.get_year + '-12'
                }])
        } else if (id === 0) {
            for (let i = 1; i < checked.length; i++) {
                checked[i].className = 'form-check-input bg-info'
                checked[i].disabled = false
                checked[i].checked = false
            }
            setMonth([])
        }

        if (id !== 0 & isCheck) {
            checked[id].className = 'form-check-input bg-danger me-md-4'
            checked[id].checked = true
            setMonth({ ...getMonth, [id]: dates.get_year + '-' + e.target.value })

        } else if (id !== 0) {
            checked[id].className = 'form-check-input bg-info'
            setMonth({ ...getMonth, [id]: null })

        }


    }
    console.log(getMonth);
    /**view */
    if (memory.get_token === null) { window.location.href = '/' }
    else {
        return (
            <div>
                <h1>Dashboard</h1>
                <hr />
                {/**option */}
                <div>
                    <button className="btn btn-success" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                        <HiChevronDoubleLeft />
                    </button>
                    <div class="offcanvas offcanvas-start bg-dark"
                        tabindex="-1" id="offcanvasExample"
                        aria-labelledby="offcanvasExampleLabel"
                        style={{ width: '200px', margin: '60px 10px 10px 10px' }}>
                        <div class="offcanvas-header">
                            <div className='row g-3'>
                                <div className="row-md-6">
                                    <label className="form-label">Year</label>
                                    <select
                                        className="form-select form-select-sm mb-3"
                                        onChange={(e) => { setYear(e.target.value) }} >
                                        <option value={dates.get_year}>{dates.get_year}</option>
                                        <option value={dates.get_year - 1}>{dates.get_year - 1}</option>
                                        <option value={dates.get_year - 2}> {dates.get_year - 2}</option>
                                        <option value={dates.get_year - 3}>{dates.get_year - 3}</option>
                                        <option value={dates.get_year - 4}>{dates.get_year - 4}</option>
                                    </select>
                                </div>
                                <div className="row-md-6">
                                    <div className="form-check row-md-12 ">
                                        <input
                                            name='0'
                                            className="form-check-input bg-info"
                                            type="checkbox"
                                            value='all'
                                            id="0"
                                            onClick={(e) => { eventSelectMount(e) }} />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            ALL
                                        </label>
                                    </div>
                                    {/**month item */}
                                    {dates.get_name_month.map((name, index) => {
                                        return (
                                            <div className="form-check row-md-12 " key={index}>
                                                <input
                                                    name={index + 1}
                                                    className="form-check-input bg-info"
                                                    type="checkbox"
                                                    value={(index + 1 < 9) ? '0' + (index + 1) : index + 1}
                                                    id="flexCheckDefault"
                                                    onChange={(e) => { eventSelectMount(e) }} />
                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                    {name}
                                                </label>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/**graph timeline Activity this year */}
                <br />
                <div className='row justify-content-center fs-3'>Total Activities of timeline {getYear}</div>
                <div className='row justify-content-center text-dark'>
                    <BarChart
                        width={800}
                        height={320}
                        data={data}
                        margin={{
                            top: 0,
                            right: 10,
                            left: 0,
                            bottom: 0,
                        }}
                        barSize={50}
                        style={{ cursor: 'pointer' }}
                    >
                        <XAxis dataKey="name" stroke="#8884d8" scale="point" padding={{ left: 50, right: 50 }} />
                        <YAxis />
                        <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
                        <Legend width={100} wrapperStyle={{
                            top: 40, right: 20,
                            backgroundColor: '#f5f5f5',
                            border: '1px solid #d5d5d5',
                            borderRadius: 3, lineHeight: '40px'
                        }} />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <Bar dataKey="Activity" fill='green' />
                    </BarChart>
                </div>
                <div className='row justify-content-center fs-3'>Total Activities of timeline per month </div>
                <div className='row justify-content-center text-dark'>
                    <BarChart
                        style={{ cursor: 'pointer' }}
                        width={800}
                        height={320}
                        data={data}
                        margin={{ top: 18, right: 30, left: 20, bottom: 5 }}
                        barSize={30}>
                        <CartesianGrid strokeDasharray="3 5" />
                        <XAxis dataKey="Activity">
                            <Label value="" offset={0} position="insideBottom" fill='white' />
                        </XAxis>
                        <YAxis label={{ value: 'pv of page', angle: -90, position: 'insideLeft' }} />
                        <Bar dataKey="Activity" fill="green">
                            <LabelList dataKey="name" position="top" fill="white" />
                        </Bar>

                        {/*<Tooltip />*/}
                        <Legend
                            width={100}
                            height={0}
                            wrapperStyle={{
                                top: 40, right: 20,
                                backgroundColor: '#f5f5f5',
                                border: '1px solid #d5d5d5',
                                borderRadius: 3, lineHeight: '40px'
                            }} />
                    </BarChart>
                </div>
            </div >

        )
    }

}

export default Dashboard