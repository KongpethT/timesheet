import "./newTimeline.css"
import Input from "./components/Input"
import Select from "./components/Select"
import { api, account } from "./variable/config"
import { useEffect, useState } from "react"
import axios from "axios"


export default function NewTimeline() {
  const [alerted, setAlerted] = useState(null)
  const [company, setCompany] = useState([])
  const [clientType, setClientType] = useState([])
  const [value, setValue] = useState({
    userCode: account.userCode,
    date: "",
    client_name: "",
    company: "",
    client_type: "",
    visit_call: false,
    visit_am: false,
    visit_pm: false,
    site_tour_am: false,
    site_tour_pm: false,
    lunch: false,
    dinner: false,
    other: null,
  })

  const isChecked = () => {
    axios.get(api.message).then((brick) => { setAlerted(brick.data) })
  }

  const add_timeline = () => {
    if (
      !!value.date &
      !!value.client_name &
      !!value.company &
      !!value.client_type
    ) {
      axios.post(api.timeline, { value })
    }
  }
  if (alerted === 'successfully') {
    setAlerted('')
    window.location.href = "/"
  } else {
    setTimeout(() => {
      setAlerted('')
    }, 5000)
  }

  useEffect(() => {
    axios.get(api.company + "?id=" + account.userCode).then((brick) => { setCompany(brick.data) })
  }, [])

  useEffect(() => {
    axios.get(api.client_type).then((brick) => { setClientType(brick.data) })
  }, [])

  return (
    <div className="container">
      <div className="page">
        <h1>New timeline</h1>
        <hr />
        <div className="form">
          <Input type="date" onChange={(e) => { setValue({ ...value, date: e.target.value }) }} />
          <Input type="text" placeholder="Client-name" onChange={(e) => { setValue({ ...value, client_name: e.target.value }) }} />
          <Select firstNameOption="select companay name" data={company} onChange={(e) => { setValue({ ...value, company: e.target.value }) }} />
          <Select firstNameOption="select Client type" data={clientType} onChange={(e) => { setValue({ ...value, client_type: e.target.value }) }} />

          <div className="group">
            <p> Activity select </p>
            <div className="checkbox">
              <Input type="checkbox" title="Visit Call" value="call" labelFontSize="12px" onClick={(e) => { setValue({ ...value, visit_call: e.target.checked }) }} />
              <Input type="checkbox" title="Visit AM" value="visit-am" labelFontSize="12px" onClick={(e) => { setValue({ ...value, visit_am: e.target.checked }) }} />
              <Input type="checkbox" title="Visit PM" value="visit-pm" labelFontSize="12px" onClick={(e) => { setValue({ ...value, visit_pm: e.target.checked }) }} />
            </div>

            <div className="checkbox">
              <Input type="checkbox" title="Site Tour AM" value="Site-tour-am" labelFontSize="12px" onClick={(e) => { setValue({ ...value, site_tour_am: e.target.checked }) }} />
              <Input type="checkbox" title="Site Tour PM" value="Site-tour-am" labelFontSize="12px" onClick={(e) => { setValue({ ...value, site_tour_pm: e.target.checked }) }} />
              <Input type="checkbox" title="Lunch" value="lunch" labelFontSize="12px" onClick={(e) => { setValue({ ...value, lunch: e.target.checked }) }} />
              <Input type="checkbox" title="Dinner" value="dinner" labelFontSize="12px" onClick={(e) => { setValue({ ...value, dinner: e.target.checked }) }} />
            </div>
          </div>
          <Input ype="text" placeholder="Other" cols="40" rows="5" inputHeight="50px" onChange={(e) => { setValue({ ...value, other: e.target.value }) }} />
          <Input type="button" value="Create" width="120px" inputHeight="40px" id="button" onMouseDown={add_timeline} onMouseUp={isChecked} />
          <br />
          <h6 className="alert-B">{alerted}</h6>
        </div>
      </div>
    </div >
  )

}