exports.company = (req, res) => {
    const id = req.query.id
    conn.query(`select * from businessprofile where userCode='${id}' order by name`, (error, result) => {
        if (error) {
            res.send({ error: error })
        } else {
            res.send(result)
        }
    })
}
exports.setCompany = (req, res) => {
    res.send('ok')
}


