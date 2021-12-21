import "./newTimeline.css"
import Input from "./components/Input"
import Select from "./components/Select"
import { api, account, keys } from "./variable/config"
import { useEffect, useState } from "react"
import axios from "axios"

export default function UpdateTimeline() {

  const brickRow = JSON.parse(localStorage.getItem('dr'))
  const [company, setCompany] = useState([])
  const [clientType, setClientType] = useState([])
  const [getColorMessage, setColorMessage] = useState('alert-B')
  const [getAlert, setAlert] = useState('')
  const [value, setValue] = useState({
    row_id: brickRow.id,
    code: account.userCode,
    date: brickRow.timeline,
    client_name: brickRow.clientName,
    company: brickRow.company,
    client_type: brickRow.clientType,
    visit_call: brickRow.visitCall,
    visit_am: brickRow.visitAM,
    visit_pm: brickRow.visitPM,
    site_tour_am: brickRow.siteTourAM,
    site_tour_pm: brickRow.siteTourPM,
    lunch: brickRow.lunch,
    dinner: brickRow.dinner,
    others: brickRow.others,
  })

  const isChecked = () => {
    axios.get(api.message).then((brick) => {
      if (brick.data === 'updated successfully:') { window.location.href = "/timeline/view" }
    })
  }

  const update_timeline = () => {
    if (
      !!value.date &
      !!value.client_name &
      !!value.company &
      !!value.client_type
    ) {
      axios.post(api.update_timeline, { value })
    }
  }

  useEffect(() => {
    axios.get(api.company + "?id=" + account.userCode).then((brick) => { setCompany(brick.data) })
  }, [])

  useEffect(() => {
    axios.get(api.client_type).then((brick) => { setClientType(brick.data) })
  }, [])

  if (keys.get_token === null) { window.location.href = "/signin" }
  else {
    return (
      <div className="container page">
        <h1>Edit timeline</h1>
        <hr />
        <div className="form">
          <Input
            type="date"
            value={value.date}
            onChange={(e) => { setValue({ ...value, date: e.target.value }) }}
          />

          <Input
            type="text"
            placeholder="Client-name"
            value={value.client_name}
            onChange={(e) => { setValue({ ...value, client_name: e.target.value }) }}
          />

          <Select
            firstNameOption="select companay name"
            data={company}
            value={value.company}
            onChange={(e) => { setValue({ ...value, company: e.target.value }) }}
          />

          <Select
            firstNameOption="select Client type"
            data={clientType}
            value={value.client_type}
            onChange={(e) => { setValue({ ...value, client_type: e.target.value }) }}
          />

          <div className="group">
            <p> Activity select </p>
            <div className="checkbox">
              <Input
                type="checkbox"
                title="Visit Call"
                labelFontSize="12px"
                defaultChecked={(brickRow.visitCall === 1) ? "checked" : ""}
                onClick={(e) => { setValue({ ...value, visit_call: e.target.checked }) }}
              />
              <Input
                defaultChecked={(brickRow.visitAM === 1) ? "checked" : ""}
                type="checkbox"
                title="Visit AM"
                labelFontSize="12px" onClick={(e) => { setValue({ ...value, visit_am: e.target.checked }) }}
              />
              <Input
                defaultChecked={(brickRow.visitPM === 1) ? "checked" : ""}
                type="checkbox"
                title="Visit PM"
                labelFontSize="12px"
                onClick={(e) => { setValue({ ...value, visit_pm: e.target.checked }) }} />
            </div>

            <div className="checkbox">
              <Input
                defaultChecked={(brickRow.siteTourAM === 1) ? "checked" : ""}
                type="checkbox"
                title="Site Tour AM"
                labelFontSize="12px"
                onClick={(e) => { setValue({ ...value, site_tour_am: e.target.checked }) }} />
              <Input
                defaultChecked={(brickRow.siteTourPM === 1) ? "checked" : ""}
                type="checkbox"
                title="Site Tour PM"
                labelFontSize="12px"
                onClick={(e) => { setValue({ ...value, site_tour_pm: e.target.checked }) }} />
              <Input
                defaultChecked={(brickRow.lunch === 1) ? "checked" : ""}
                type="checkbox"
                title="Lunch"
                labelFontSize="12px"
                onClick={(e) => { setValue({ ...value, lunch: e.target.checked }) }} />
              <Input
                defaultChecked={(brickRow.dinner === 1) ? "checked" : ""}
                type="checkbox"
                title="Dinner"
                labelFontSize="12px" onClick={(e) => { setValue({ ...value, dinner: e.target.checked }) }} />
            </div>
          </div>

          <Input
            type="text"
            placeholder="Other"
            cols="40"
            rows="5"
            inputHeight="50px"
            value={value.others}
            onChange={(e) => { setValue({ ...value, others: e.target.value }) }}
          />

          <Input
            type="button"
            value="Update"
            width="120px"
            inputHeight="40px"
            id="button"
            onMouseDown={update_timeline}
            onMouseUp={isChecked}
          />
          <h5 className={getColorMessage}>{getAlert}</h5>
          <br />
        </div>
      </div>
    )
  }
}