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
        (process.env.NODE_ENV === 'development') ? console.log(error) : null
        res.send(result)
    })
}
//@router get api/customer/client/:id
exports.getPostByIdClient = (req, res) => {
    const id = req.params.id
    const sqlStringView = `select * from client where agency_id = '${id}' order by name`
    config.get_connect.query(sqlStringView, (error, result) => {
        (process.env.NODE_ENV === 'development') ? console.log(error) : null
        res.send(result)
    })
}
//@router get api/customer/clientType
exports.getPostsClientType = (req, res) => {
    const sqlString = `select * from client_type order by name`
    config.get_connect.query(sqlString, (error, result) => {
        (process.env.NODE_ENV === 'development') ? console.log(error) : null
        res.send(result)
    })
}
// @route   post api/customer/agency
exports.postPostAgency = (req, res) => {
    const brick = req.body.getAddress
    const data = Object.keys(brick).map((key) => {
        return (brick[key])
    })
    const sqlString = `INSERT INTO agency (account_id,name,contact_name,email,address,address2,city,state,zip) value (?)`
    config.get_connect.query(sqlString, [data], (error, result) => {
        (process.env.NODE_ENV === 'development') ? console.log(error) : null
        res.send(result)
    })
}
//@route post api/customer/client
exports.postPostClient = (req, res) => {
    const brick = req.body
    const data = Object.keys(brick.getBrick).map((key) => {
        return (brick.getBrick[key])
    })
    const sqlString = `INSERT INTO client (agency_id, name) value (?)`
    config.get_connect.query(sqlString, [data], (error, result) => {
        (process.env.NODE_ENV === 'development') ? console.log(error) : null
        res.send(result)
    })
}
