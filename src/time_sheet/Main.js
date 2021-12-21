import SignIn from './SignIn'
import Navbar from './Navbar'
import NewTimeline from './NewTimeline'
import Timeline from './ViewTimeline'
import UpdateTimeline from "./UpdateTimeline"
import NewPerson from "./NewPerson"
import Person from './ViewPerson'
import UpdatePerson from './UpdatePerson'
import Dashboard from './ViewDashboard'
//import Copyright from './Copyright'

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { keys } from './variable/config'
import { useEffect, useState } from 'react'

function Main() {


  return (
    <div className='container'>
      <BrowserRouter>
        <Navbar isLogged={localStorage.getItem('accessToken')} />
        <div style={{ marginTop: '54px', }}></div>
        <Switch>
          <Route exact path="/signin"><SignIn /></Route>
          <Route exact path="/timeline/new"><NewTimeline /></Route>
          <Route exact path="/timeline/view"><Timeline /></Route>
          <Route exact path="/timeline/edit"><UpdateTimeline /></Route>
          <Route exact path="/person/new"><NewPerson /></Route>
          <Route exact path="/person/view"><Person /></Route>
          <Route exact path="/person/edit"><UpdatePerson /></Route>
          <Route exact path="/tools/dashboard"><Dashboard /></Route>
        </Switch>
      </BrowserRouter >


    </div >
  )
}
export default Main
