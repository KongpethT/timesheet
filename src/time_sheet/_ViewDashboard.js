import { useEffect, useState } from 'react'
import axios from 'axios'
import { account, api, keys } from './variable/config'

export default function Dashboard(props) {
    const [getactivityCount, setActivityCount] = useState({})

    useEffect(() => {
        axios.get(api.count_activity + `/${account.userCode}`).then((brick) => {
            const obj = Object.assign(brick.data)
            setActivityCount(Object.assign(obj[0]))
        })
    }, [])

    if (keys.get_token === null) { window.location.href = "/signin" }
    else {
        return (
            <div className='container'>
                <h1>Dashboard</h1>
                <hr />
                <div className='items-1'>
                    <div className='item'>
                        <h4>summary </h4>
                        <h3>visit call</h3>
                        <h1>{getactivityCount.visitCall}</h1>
                    </div>
                    <div className='item'>
                        <h4>summary </h4>
                        <h3>visit AM</h3>
                        <h1>{getactivityCount.visitAM}</h1>
                    </div>
                    <div className='item'>
                        <h4>summary </h4>
                        <h3>visit PM</h3>
                        <h1>{getactivityCount.visitPM}</h1>
                    </div>
                    <div className='item'>
                        <h4>summary </h4>
                        <h3>site tour AM</h3>
                        <h1>{getactivityCount.siteTourAM}</h1>
                    </div>
                    <div className='item'>
                        <h4>summary </h4>
                        <h3>site tour PM</h3>
                        <h1>{getactivityCount.siteTourPM}</h1>
                    </div>
                    <div className='item'>
                        <h4>summary </h4>
                        <h3>lunch</h3>
                        <h1>{getactivityCount.lunch}</h1>
                    </div>
                    <div className='item'>
                        <h4>summary </h4>
                        <h3>dinner</h3>
                        <h1>{getactivityCount.dinner}</h1>
                    </div>
                    <div className='item'>
                        <h4>summary </h4>
                        <h3>other</h3>
                        <h1>{getactivityCount.other}</h1>
                    </div>
                </div>
            </div>
        )
    }
}