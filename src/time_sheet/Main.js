import SignIn from './SignIn'
import Navbar from './Navbar'
import NewTimeline from './NewTimeline'
import Timeline from './ViewTimeline'
import UpdateTimeline from "./UpdateTimeline"
import NewPerson from "./NewPerson"
import Person from './ViewPerson'
import ChangePassword from './ChangePassword'
import UpdatePerson from './UpdatePerson'
import Dashboard from './ViewDashboard'
import NewSales from './NewSales'
import ViewSales from './ViewSales'
import NewCustomer from './NewCustomer'
import ViewCustomer from './ViewCustomer'

//import Copyright from './Copyright'

import { BrowserRouter, Switch, Route } from "react-router-dom";

function Main() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ marginTop: '54px', }}></div>

      <Switch>
        <Route exact path="/"><SignIn /></Route>
        <Route exact path="/signin"><SignIn /></Route>
        <Route exact path="/timeline/new"><NewTimeline /></Route>
        <Route exact path="/timeline/view"><Timeline /></Route>
        <Route exact path="/timeline/edit"><UpdateTimeline /></Route>
        <Route exact path="/person/new"><NewPerson /></Route>
        <Route exact path="/person/view"><Person /></Route>
        <Route exact path="/person/edit"><UpdatePerson /></Route>
        <Route exact path="/person/change_password"><ChangePassword /></Route>
        <Route exact path="/tools/dashboard"><Dashboard /></Route>
        <Route exact path="/sales/new"><NewSales /></Route>
        <Route exact path="/sales/view"><ViewSales /></Route>
        <Route exact path="/customer/new"><NewCustomer /></Route>
        <Route exact path="/customer/view"><ViewCustomer /></Route>
      </Switch>
    </BrowserRouter>
  )
}
export default Main
