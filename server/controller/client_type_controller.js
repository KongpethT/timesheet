exports.client_type = (req, res) => {
    conn.query('select * from client order by name', (error, result) => {
        if (error) {
            res.send({
                error: error
            })
        } else {
            res.send(result)
        }
    })
}

exports.setClient_type = (req, res) => {
    res.send('OK')
}