//const config = require("../configure/env")
const { connect } = require("../server")

exports.signin = (req, res) => {
    const { userCode, password } = req.body
    conn.query(`select * from ae where userCode ='${userCode}' and password='${password}'`, (error, result) => {
        if (error) {
            res.send({
                message: error
            })
        } else {
            const length = [result]
            const token = jwt.sign({
                id: userCode
            }, config.secretKey, { expiresIn: config.expires_in }) //{ expiresIn: 3600 })
            const data = {
                result,
                token,
                count: length[0].length
            }
            res.send(data)
        }
    })
}