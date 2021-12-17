import Input from "./components/Input"
import { account } from "./variable/config"
export default function Profile() {
    return (
        <div id="profile">
            <div className="items">
                <p>{"<"}Change password</p>
            </div>
            <div className="items">
                <p>User code: {account.userCode}</p>
                <p>Full name: {account.fullUser}</p>
            </div>
            <div className="items">
                <Input type="text" placeholder="Old password"/>
                <Input type="text" placeholder="New password"/>
                <Input type="text" placeholder="Confirm password"/>
            </div>
            <div className="items">
                <Input type="button" value="OK" />
            </div>
        </div>
    )
}

