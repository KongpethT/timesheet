import { useEffect, useState } from 'react'
import Input from './components/Input'
import './dashboard.css'
import Admin from './Admin'
import Profile from './Profile'
import Customer from './Customer'
import axios from 'axios'
import { account, api } from './variable/config'


export default function Dashboard(props) {
    const [className, setClassName] = useState('box-left active')
    const [count, setCount] = useState(0)
    const [arrow, setArrow] = useState('>')
    const [header, setHeader] = useState('Home')
    const [admin, setAdmin] = useState(null)
    const [home, setHome] = useState(null)
    const [profile, setProfile] = useState(null)
    const [customer, setCustomer] = useState(null)
    const [boxRight, setBoxRight] = useState('')
    const [getactivityCount, setActivityCount] = useState({})
    const [getRefHome, setRefHome] = useState(0)

    // count activity 
    useEffect(() => {
        axios.get(api.count_activity + `/${account.userCode}`).then((brick) => {
            const obj = Object.assign(brick.data)
            setActivityCount(Object.assign(obj[0]))
            //console.log(getRefHome);
        })
    }, [getRefHome])

    const refreshHome = () => {
        setRefHome(getRefHome + 1)
    }

    //component home
    const clickHome = () => {
        setHeader('Home')
        setAdmin(null)
        setHome('dashboard-content')
        setProfile(null)
        setCustomer(null)
        refreshHome()
    }

    //component admin
    let adminElement = null
    if (!!admin) {
        adminElement = <Admin />
    }

    const clickAdmin = () => {
        setHeader('Admin')
        setAdmin(true)
        setHome('active')
        setProfile(null)
        setCustomer(null)
    }

    //component profile
    let profileElement = null
    if (!!profile) {
        profileElement = <Profile />
    }

    const clickProfile = () => {
        setHeader('Profile')
        setAdmin(null)
        setHome('active')
        setProfile(true)
        setCustomer(null)
    }

    //component customer
    let customerElement = null
    if (!!customer) {
        customerElement = <Customer />
    }

    const clickCustomer = () => {
        setHeader('Customer')
        setAdmin(null)
        setHome('active')
        setProfile(null)
        setCustomer(true)
    }

    // menu switch on|off
    useEffect(() => { // effect hide | show menu
        (count % 2 === 0) ? setClassName('active') : setClassName('box-left')
    }, [count])

    useEffect(() => { // effect show icon < | >
        (count % 2 === 0) ? setArrow('>') : setArrow('<')
    }, [count])

    useEffect(() => { // effect box right slide 2vw 
        (count % 2 === 0) ? setBoxRight('') : setBoxRight('box-content box-slide')
    }, [count])

    const switch_menu = () => {
        setCount(count + 1)
    }
    //end menu switch on|off

    return (

        <div className='container'>
            <div className='page'>
                <h1 className='header-text'>{header}</h1>
                <hr />
                <div className="dashboard">
                    <div className={className}>
                        <br />
                        <nav id="navbar">
                            <ul>
                                <li onClick={clickHome}>Home</li>
                                <li onClick={clickAdmin}>Admin</li>
                                <li onClick={clickProfile}>Profile</li>
                                <li onClick={clickCustomer}>Customer</li>
                            </ul>
                        </nav>
                    </div>

                    <div className='box-right'>
                        <div>
                            <Input
                                id="show_menu"
                                type="button"
                                margin='0 0 0 6px'
                                value={arrow}
                                padding="0 8px"
                                onClick={switch_menu} />
                        </div>
                        <div className={boxRight}>
                            <div id="dashboard-content" className={home}>
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
                            {adminElement}
                            {profileElement}
                            {customerElement}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}