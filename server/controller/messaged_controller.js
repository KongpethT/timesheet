exports.message = (req, res) => {
    res.send(alert_message)
    setTimeout(() => {
        alert_message = {
            info: null
        }
    }, 3000)
}