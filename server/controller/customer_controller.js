const { config } = require('../configure/env')


exports.getPosts = (req, res) => {

}

exports.getPostByIdAgency = (req, res) => {
    const para = JSON.parse(req.params.id)
    const id = para.value
    const sqlStringView = `select * from agency where account_id = '${id}' order by name`
    config.get_connect.query(sqlStringView, (error, result) => {
        (process.env.NODE_ENV === 'development') ? console.log(error) : null
        res.send(result)
    })
}

exports.getPostByIdClient = (req, res) => {
    const id = req.params.id
    const sqlStringView = `select * from client where agency_id = '${id}' order by name`
    config.get_connect.query(sqlStringView, (error, result) => {
        (process.env.NODE_ENV === 'development') ? console.log(error) : null
        res.send(result)
    })
}

exports.getPostsClientType = (req, res) => {
    const sqlString = `select * from client_type order by name`
    config.get_connect.query(sqlString, (error, result) => {
        (process.env.NODE_ENV === 'development') ? console.log(error) : null
        res.send(result)
    })
}

exports.postPostById = (req, res) => {
}

