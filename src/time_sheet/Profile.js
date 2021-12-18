//import Input from "./components/Input"
import { account } from "./variable/config"
export default function Profile() {
    return (
        <div id="profile">
            <div className="form">
                <div className="items">
                    <p>{"<"}Change password</p>
                </div>
                <div className="items">
                    <p>User code: {account.userCode}</p>
                    <p>Full name: {account.fullUser}</p>
                </div>
                
            </div>

            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Email address</label>
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
            </div>
            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
        </div>
    )
}

