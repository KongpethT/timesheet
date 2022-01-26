const { config } = require('../configure/env')

//@router get api/customer
exports.getPosts = (req, res) => {

}
//@router get api/customer/agency/:id
exports.getPostByIdAgency = (req, res) => {
    const para = JSON.parse(req.params.id)
    const id = para.value
    const sqlStringView = `select * from agency where account_id = '${id}' order by name`
    config.get_connect.query(sqlStringView, (error, result) => {
        if (error) {
            (process.env.NODE_ENV === 'development') ? console.log(error) : null
        } else {
            res.send(result)
        }
    })
}
//@router get api/customer/client/:id
exports.getPostByIdClient = (req, res) => {
    const id = req.params.id
    const sqlStringView = `select * from client where agency_id = '${id}' order by name`
    config.get_connect.query(sqlStringView, (error, result) => {
        if (error) {
            (process.env.NODE_ENV === 'development') ? console.log(error) : null
        } else {
            res.send(result)
        }
    })
}
//@router get api/customer/clientType
exports.getPostsClientType = (req, res) => {
    const sqlString = `select * from client_type order by name`
    config.get_connect.query(sqlString, (error, result) => {
        if (error) {
            (process.env.NODE_ENV === 'development') ? console.log(error) : null
        } else {
            res.send(result)
        }


    })
}
// @route POST api/customer/agency
exports.postPostAgency = (req, res) => {
    const brick = req.body.getAddress
    const data = Object.keys(brick).map((key) => {
        return (brick[key])
    })
    const sqlString = `INSERT INTO agency (account_id,name,contact_name,email,address,address2,city,state,zip) value (?)`
    config.get_connect.query(sqlString, [data], (error, result) => {
        if (error) {
            (process.env.NODE_ENV === 'development') ? console.log(error) : null
        } else {
            res.send(result)
        }
    })
}
//@route POST api/customer/client
exports.postPostClient = (req, res) => {
    const brick = req.body
    const data = Object.keys(brick.getBrick).map((key) => {
        return (brick.getBrick[key])
    })
    const sqlString = `INSERT INTO client (agency_id, name) value (?)`
    config.get_connect.query(sqlString, [data], (error, result) => {
        if (error) {
            (process.env.NODE_ENV === 'development') ? console.log(error) : null
        } else {
            res.send(result)
        }
    })
}
/**@route get api/customer/process */
exports.getProcess = (req, res) => {
    const sqlString = 'SELECT * FROM process order by name'
    config.get_connect.query(sqlString, (error, result) => {
        if (error) {
            (process.env.NODE_ENV === 'development') ? console.log(error) : null
        } else {
            console.log(result)
            res.send(result)
        }
    })
}

/**@route PUT api/customer/agency/update */
exports.agencyUpdate = (req, res) => {
    const brick = req.body.brick
    const sqlString = `UPDATE agency set ${brick.name} = '${brick.value}' where id = '${brick.rowId}'`
    config.get_connect.query(sqlString, (error, result) => {
        if (error) {
            (process.env.NODE_ENV === 'development') ? console.log(error) : null
        } else {
            res.send(result)
        }
    })
}
/**@route PUT api/customer/client/update */
exports.clientUpdate = (req, res) => {
    const brick = req.body.brick
    const sqlString = `UPDATE client set ${brick.name} = '${brick.value}' where id = '${brick.rowId}'`
    config.get_connect.query(sqlString, (error, result) => {
        if (error) {
            (process.env.NODE_ENV === 'development') ? console.log(error) : null
        } else {
            res.send(result)
        }
    })
}
/**@route DELETE api/customer/agency/deleted/:id */
exports.agencyDeleted = (req, res) => {
    const id = req.params.id
    const sqlString = `DELETE FROM agency where id = ${id}`
    config.get_connect.query(sqlString, (error, result) => {
        if (error) {
            (process.env.NODE_ENV === 'development') ? console.log(error) : null
        } else {
            res.send(result)
        }
    })
}
/**@route DELETE api/customer/client/delete/:id */
exports.clientDeleted = (req, res) => {
    const id = req.params.id
    const sqlString = `DELETE FROM client where id = ${id}`
    config.get_connect.query(sqlString, (error, result) => {
        if (error) {
            (process.env.NODE_ENV === 'development') ? console.log(error) : null
        } else {
            res.send(result)
        }
    })
}