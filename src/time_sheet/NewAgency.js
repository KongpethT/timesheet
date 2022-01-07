import axios from 'axios'
import { useState } from 'react'
import { forms, memory, api } from './configure/env'
const NewAgency = () => {
    if (memory.get_token === null) { window.location.href = '/' }
    const [getAlert, setAlert] = useState('')
    const [getAddress, setAddress] = useState(
        {
            accountId: JSON.parse(memory.get_account_id).value,
            agency: '', contact: '', email: '', address: '', address2: '',
            city: '', state: 'Thailand', zip: ''
        })
    /**Create customer */
    const pushCustomer = () => {
        const agency = document.querySelector('#inputAgency')
        if (agency.value === '') {
            agency.setAttribute('placeholder', forms.get_placeholder_warning)
        } else {
            axios.post(`${api.customer}/agency`, { getAddress }).then((brick) => {
                if (brick.status === 200) {
                    setAddress({ agency: '', email: '', contact: '', address: '', address2: '', city: '', zip: '' })
                    setAlert(forms.get_massage_success)
                    setTimeout(() => {
                        setAlert('')
                    }, 3000)
                }
            })
        }
    }
    /**view */
    if (memory.get_token === null) { window.location.href = "/" }
    else {
        return (
            <div>
                <h1>New agency <span className='fs-5'>{getAlert}</span></h1>
                <hr />
                <div className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="inputAgency" className="form-label">Agency name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputAgency"
                            value={getAddress.agency}
                            onChange={(e) => { setAddress({ ...getAddress, agency: e.target.value }) }}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputEmail4" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="inputEmail4"
                            value={getAddress.email}
                            onChange={(e) => { setAddress({ ...getAddress, email: e.target.value }) }}
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="contactCity" className="form-label">Contact name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputContact"
                            value={getAddress.contact}
                            onChange={(e) => { setAddress({ ...getAddress, contact: e.target.value }) }}
                        />
                    </div>
                    <div className="col-8">
                        <label htmlFor="inputAddress" className="form-label">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputAddress"
                            placeholder="1234 Main St"
                            value={getAddress.address}
                            onChange={(e) => { setAddress({ ...getAddress, address: e.target.value }) }}
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputAddress2" className="form-label">Address 2</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputAddress2"
                            placeholder="Apartment, studio, or floor"
                            value={getAddress.address2}
                            onChange={(e) => { setAddress({ ...getAddress, address2: e.target.value }) }}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputCity" className="form-label">City</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputCity"
                            value={getAddress.city}
                            onChange={(e) => { setAddress({ ...getAddress, city: e.target.value }) }}
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="inputState" className="form-label">State</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputState"
                            value={getAddress.state}
                            onChange={(e) => { setAddress({ ...getAddress, state: e.target.value }) }}
                        />
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="inputZip" className="form-label">Zip</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputZip"
                            value={getAddress.zip}
                            onChange={(e) => { setAddress({ ...getAddress, zip: e.target.value }) }}
                        />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary" onClick={pushCustomer}>Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default NewAgency