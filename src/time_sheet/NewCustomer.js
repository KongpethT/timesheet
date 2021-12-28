import axios from 'axios'
import { useState } from 'react'
import { keys, forms, account, api } from './variable/config'
const NewCustomer = () => {
    const [getAlert, setAlert] = useState('')
    const [getAddress, setAddress] = useState({
        agency: '', email: '', contact: '', address: '', address2: '', city: '', state: 'Thailand', zip: '', user_code: account.get_staff_code
    })

    const new_customer = () => {
        const agency = document.querySelector('#inputAgency')
        if (agency.value === '') {
            agency.setAttribute('placeholder', forms.placeholder_warning)
        } else {
            axios.post(api.customer, { getAddress }).then((brick) => {
                const data = brick.data
                if (data === 1) {
                    setAddress({ agency: '', email: '', contact: '', address: '', address2: '', city: '' })
                    setAlert(forms.massage_success)
                    setTimeout(() => {
                        setAlert('')
                    }, 3000)
                }
            })
        }
    }

    if (keys.get_token === null) { window.location.href = "/signin" }
    else {
        return (
            <div>
                <h1>New customer <span className='fs-5'>{getAlert}</span></h1>
                <hr />
                <div className="row g-3">
                    <div className="col-md-6">
                        <label for="inputAgency" className="form-label">Agency name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputAgency"
                            defaultValue={getAddress.agency}
                            onChange={(e) => { setAddress({ ...getAddress, agency: e.target.value }) }}
                        />
                    </div>
                    <div className="col-md-6">
                        <label for="inputEmail4" class="form-label">Email</label>
                        <input
                            type="email"
                            class="form-control"
                            id="inputEmail4"
                            defaultValue={getAddress.email}
                            onChange={(e) => { setAddress({ ...getAddress, email: e.target.value }) }}
                        />
                    </div>
                    <div className="col-md-4">
                        <label for="contactCity" className="form-label">Contact name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputContact"
                            defaultValue={getAddress.contact}
                            onChange={(e) => { setAddress({ ...getAddress, contact: e.target.value }) }}
                        />
                    </div>
                    <div className="col-8">
                        <label for="inputAddress" className="form-label">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputAddress"
                            placeholder="1234 Main St"
                            defaultValue={getAddress.address}
                            onChange={(e) => { setAddress({ ...getAddress, address: e.target.value }) }}
                        />
                    </div>
                    <div className="col-12">
                        <label for="inputAddress2" className="form-label">Address 2</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputAddress2"
                            placeholder="Apartment, studio, or floor"
                            defaultValue={getAddress.address2}
                            onChange={(e) => { setAddress({ ...getAddress, address2: e.target.value }) }}
                        />
                    </div>
                    <div className="col-md-6">
                        <label for="inputCity" className="form-label">City</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputCity"
                            defaultValue={getAddress.city}
                            onChange={(e) => { setAddress({ ...getAddress, city: e.target.value }) }}
                        />
                    </div>
                    <div className="col-md-4">
                        <label for="inputState" className="form-label">State</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputState"
                            defaultValue={getAddress.state}
                            onChange={(e) => { setAddress({ ...getAddress, state: e.target.value }) }}
                        />
                    </div>
                    <div className="col-md-2">
                        <label for="inputZip" className="form-label">Zip</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputZip"
                            defaultValue={getAddress.zip}
                            onChange={(e) => { setAddress({ ...getAddress, zip: e.target.value }) }}
                        />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary" onClick={new_customer}>Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default NewCustomer