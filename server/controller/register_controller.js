
exports.register = function (req, res) {
    const code = req.body.code
    const { aeId, firstName, lastname, password } = req.body
    try {

        if (!(aeId, firstName, lastname, password)) {
            res.status(400).send('All input is required')
        }

        console.log('AEID: ', aeId);
        console.log('Password: ', password);

        conn.query(`SELECT COUNT(*) AS num from ae where aeId ='${aeId}'`, (error, result) => {
            if (error) {
                res.send({
                    message: error
                })
            } else {
                if (parseInt(result[0].num) === 0) {
                    //create token
                    const token = jwt.sign({
                        id: aeId
                    }, config.secretKey, { expiresIn: 3600 })

                    console.log(token);
                    res.send('create user is complete')
                } else {
                    res.send('User already exist to login')
                }

            }
        })
    } catch {

    }
}