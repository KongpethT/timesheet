import axios from 'axios'
import { useState, useCallback, useEffect } from 'react'
import { memory, api } from './configure/env'

const ViewPerson = () => {
    if (memory.get_token === null) { window.location.href = '/' }
    const [getAlert, setAlert] = useState('')
    const [getPerson, setPerson] = useState([])
    /**pull table account */
    const pullAccount = useCallback(() => {
        axios.get(api.person).then((brick) => {
            setPerson(brick.data)
        })
    }, [])
    useEffect(() => { pullAccount() }, [pullAccount])
    /**reset a password to default */
    const resetPassword = (id) => {
        const value = { id, password: '1234' }
        if (window.confirm("Do you really want to a default password?")) {
            axios.put(`${api.person}/resetPassword`, { value }).then((brick) => {
                const data = brick.data
                if (data.affectedRows === 1) {
                    setAlert('Password reset successfully.')
                    setTimeout(() => {
                        setAlert('')
                    }, 3000)
                }
            })
        }

    }
     /**resize window screen */
     const [getWidthScreen, setWidthScreen] = useState(window.innerWidth)
     const [getHightScreen, setHeightScreen] = useState(window.innerHeight)
     window.addEventListener('resize', () => {
         setWidthScreen(window.innerWidth)
         setHeightScreen(window.innerHeight)
     })
    /**view */
    if (memory.get_token === null) { window.location.href = "/" }
    else {
        return (
            <div >
                <h1>View person <span className='fs-6 text-primary'>{getAlert}</span></h1>
                <hr />
                <div className="table-responsive mb-3"
                    style={{ height: getHightScreen - 145 }}>
                    <table className="table bg-light table-hover text-center table-bordered"
                        style={{
                            tableLayout: 'fixed',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}>
                        <thead className='bg-light'>
                            <tr>
                                <th style={{ width: '50px' }}>#</th>
                                <th style={{ width: '50px' }}>code</th>
                                <th style={{ width: '185px' }}>name</th>
                                <th style={{ width: '185px' }}>email</th>
                                <th style={{ width: '100px' }}>state</th>
                                <th style={{ width: '80px' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {getPerson.map((row, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{row.user_code}</td>
                                        <td>{row.fullName}</td>
                                        <td>{row.email}</td>
                                        <td>{row.user_state}</td>
                                        <td onClick={() => { resetPassword(row.id) }}><button className='btn btn-warning btn-sm'>reset</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default ViewPerson
