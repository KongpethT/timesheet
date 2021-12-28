import { keys, forms } from './variable/config'
const ViewCustomer = () => {

    if (keys.get_token === null) { window.location.href = "/signin" }
    else {
        return (
            <div>
                <h1>View customer {forms.massage_success}</h1>
                <hr />
            </div>
        )
    }
}

export default ViewCustomer