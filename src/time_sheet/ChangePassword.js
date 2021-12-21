import { keys } from './variable/config'
import { IoPeople, IoCheckmark, IoCheckmarkDone } from "react-icons/io5";

const ChangePassword = () => {
    if (keys.get_token === null) { window.location.href = "/signin" }
    else {
        return (
            <div lassName='container'>
                <h1>Change password</h1>
                <hr />
                <form className='from-control'>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label"><IoPeople /> Current Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label"><IoCheckmark /> New Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label"><IoCheckmarkDone /> Confirm Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>)
    }
}
export default ChangePassword
