import SignIn from './SignIn'
import Navbar from './Navbar'
//import NewTimeline from './NewTimeline'
import ViewTimeline from './ViewTimeline'
import { storege_exp } from './configure/env'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NewTimeline from './NewTimeline';

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
      </Switch>
    </BrowserRouter>
  )
}
export default Main
