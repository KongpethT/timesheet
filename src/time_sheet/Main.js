import SignIn from './SignIn'
import Timeline from './Timeline'
import './main.css'
//import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './Navbar'
import Dashboard from './Dashboard'
import NewTimeline from './NewTimeline'
import Copyright from './Copyright'
import { useState } from 'react'
import UpdateTimeline from "./UpdateTimeline"

function Main() {
  const [timeline, setTimeline] = useState(null)
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

  return (
    <div className='container'>
      <Navbar
        clickDashboard={clickDashboard}
        clickCreateTimeline={clickCreateTimeline}
      />
      {timelineElement}
      {dashboardElement}
      {newTimelineElement}
      {updateTimelineElement}
      <Copyright />
      {/*
      <BrowserRouter>
        <Switch>
          <Route exact path="/"><Profile /></Route>
          <Route exact path="/profile"> <Profile /></Route>
          <Route exact path="/dashboard"><Dashboard /></Route>
          <Route exact path="/create-timeline"> <CreateTimeline /></Route>
        </Switch>
        <Copyright />
      </BrowserRouter>
      */}

    </div>)
}
export default Main
