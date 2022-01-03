const { config } = require('../configure/env')
const sqlStringView = 'select * from v_agency_client order by nameOfAgency'
const brick = []

exports.getPosts = (req, res) => {

}

exports.getPostById = (req, res) => {
    const par = JSON.parse(req.params.id)
    const accout_id = par.value
    brick.map((result, index) => {
        if (result[index].accountOfId === accout_id) {
            res.send(result)
        }
    })
}

exports.postPostById = (req, res) => {

}

const getDatebaseView = () => {
    config.get_connect.query(sqlStringView, (error, result) => {
        (process.env.NODE_ENV) ? console.log(error) : null
        brick.push(...brick, result)
    })
}

getDatebaseView()