exports.ae = (req, res) => {
    conn.query('select userCode, fullName, state from ae where userCode !="GM"', (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    })
}

exports.ae_ = (req, res) => {
    const data = Object.values(req.body.getValue);
    conn.query('insert into ae (userCode,firstName,lastName,password,state) value (?)', [data], (error, result) => {
        if (error) throw error
        res.send(result)
    })
}
////////