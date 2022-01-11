import SignIn from './SignIn'
import Navbar from './Navbar'
import NewTimeline from './NewTimeline'
import ViewTimeline from './ViewTimeline'
import NewAgency from './NewAgency'
import NewClient from './NewClient'
import ViewCustomer from './ViewCustomer'
import NewPerson from './NewPerson'
import ViewPerson from './ViewPerson'
import ChangePassword from './ChangePassword'
import ViewSales from './ViewSales'
import NewSales from './NewSales'
import ViewAdminSales from './ViewAdminSales'
import Dashboard from './Dashboard'
import { storege_exp } from './configure/env'
import { BrowserRouter, Switch, Route } from "react-router-dom";

function Main() {
  storege_exp('token')
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ marginTop: '54px', }}></div>
      <Switch>
        <Route exact path="/"><SignIn /></Route>
        <Route exact path="/signin"><SignIn /></Route>
        <Route exact path="/timeline/view"><ViewTimeline /></Route>
        <Route exact path="/timeline/new"><NewTimeline /></Route>
        <Route exact path="/customer/newAgency"><NewAgency /></Route>
        <Route exact path="/customer/newClient"><NewClient /></Route>
        <Route exact path="/customer/view"><ViewCustomer /></Route>
        <Route exact path="/person/new"><NewPerson /></Route>
        <Route exact path="/person/view"><ViewPerson /></Route>
        <Route exact path="/person/changePassword"><ChangePassword /></Route>
        <Route exact path="/sales/view"><ViewSales /></Route>
        <Route exact path="/sales/new"><NewSales /></Route>
        <Route exact path="/sales/admin/view"><ViewAdminSales /></Route>
        <Route exact path="/tools/dashboard"><Dashboard /></Route>
      </Switch>
    </BrowserRouter>
  )
}
export default Main
