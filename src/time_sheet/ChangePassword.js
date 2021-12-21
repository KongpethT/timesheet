import { keys } from './variable/config'

const ChangePassword = () => {
    if (keys.get_token === null) { window.location.href = "/signin" }
    else {
        return (
            <div lassName='container'>
                <div className="page">
                    <h1>Change password</h1>
                </div>
            </div>)

    }
}
export default ChangePassword
