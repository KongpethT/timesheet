const Customer = () => {
    if (keys.get_token === null) { window.location.href = "/signin" }
    else {
        return (
            <div>
                <p>Customer</p>
            </div>
        )
    }
}
export default Customer