import SignIn from './SignIn'
import Navbar from './Navbar'
import NewTimeline from './NewTimeline'
import Timeline from './Timeline'
import UpdateTimeline from "./UpdateTimeline"
import Dashboard from './Dashboard'
import Copyright from './Copyright'
//import { useState } from 'react'

import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useState } from 'react/cjs/react.development'


function Main() {
  /*  const [timeline, setTimeline] = useState(null)
    const [dashboard, setDashboard] = useState(null)
    const [newTimeline, setNewTimeline] = useState(null)
    const [updateTimeline, setUpdateTimeline] = useState(null)
    const [brickRow, setBrickRow] = useState(null)
  
    let timelineElement = true
    let dashboardElement = null
    let newTimelineElement = null
    let updateTimelineElement = null
  
    const clickUpdateTimeline = (row) => {
      setUpdateTimeline(true)
      setDashboard(null)
      setTimeline(true)
      setNewTimeline(null)
      setBrickRow(row)
    }
  
    const clickCreateTimeline = () => {
      setNewTimeline(true)
      setTimeline(true)
      setDashboard(null)
      setUpdateTimeline(null)
    }
  
    const clickDashboard = () => {
      setDashboard(true)
      setTimeline(true)
      setNewTimeline(null)
      setUpdateTimeline(null)
    }
  
  
    if (timeline === null) {
      timelineElement = <Timeline
        clickCreateTimeline={clickCreateTimeline}
        clickUpdateTimeline={clickUpdateTimeline} />
    }
  
    if (!!dashboard) {
      dashboardElement = <Dashboard isCheck='true' />
    }
  
    if (!!newTimeline) {
      newTimelineElement = <NewTimeline />
    }
  
    if (!!updateTimeline) {
      updateTimelineElement = <UpdateTimeline brickRow={brickRow} />
    }
  
    const token = localStorage.getItem('accessToken')
    if (!token) {
      return (
        <div className='container'>
          <SignIn />
        </div>
      )
    }
  */




  return (
    <div className='container'>
      <BrowserRouter>
        <Navbar isLogged={localStorage.getItem('accessToken')} />
        <div style={{ marginTop: '4%', }}></div>
        <Switch>
          <Route exact path="/signin"><SignIn /></Route>
          <Route exact path="/timeline/new"><NewTimeline /></Route>
          <Route exact path="/timeline/view"><Timeline /></Route>
          <Route exact path="/timeline/edit"><UpdateTimeline /></Route>
          { /*
          <Route exact path="/profile"> <Profile /></Route>
          <Route exact path="/dashboard"><Dashboard /></Route>
          <Route exact path="/create-timeline"> <CreateTimeline /></Route>
          */}
        </Switch>
      </BrowserRouter >


    </div >)
}
export default Main
