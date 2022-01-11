const { config } = require('../configure/env')
// @route   GET api/sales/all/:para
exports.gets = (req, res) => {
    const brick = JSON.parse(req.params.para)
    const accountId = brick.id.value
    const agencyName = brick.agency
    const sqlString = `SELECT * FROM v_forecast_all where name_of_agency like'${agencyName}%'`
    config.get_connect.query(sqlString, (error, result) => {
        if (error) {
            (process.env.NODE_ENV === 'development') ? console.log(error) : null
        } else {
            res.send(result)
        }
    })
}
// @route   GET api/sales/:para/
exports.getById = (req, res) => {
    const brick = JSON.parse(req.params.para)
    const accountId = brick.id.value
    const agencyName = brick.agency
    const sqlString = `SELECT * FROM v_forecast_ptt where account_id = '${accountId}' and name_of_agency like'${agencyName}%'`
    config.get_connect.query(sqlString, (error, result) => {
        if (error) {
            (process.env.NODE_ENV === 'development') ? console.log(error) : null
        } else {
            res.send(result)
        }
    })
}
//@route GET api/sales/countAll/:para
exports.getCountAll = (req, res) => {
    const brick = JSON.parse(req.params.para)
    const accountId = brick.id.value
    const agencyName = brick.agency
    const countTPP = ` 
    FORMAT(sum(PTT1),0) as ptt1, FORMAT(sum(PTT2),0) as ptt2, FORMAT(sum(PTT3),0) as ptt3, 
    FORMAT(sum(PTT4),0) as ptt4, FORMAT(sum(PTT5),0) as ptt5, FORMAT(sum(PTT6),0) as ptt6, 
    FORMAT(sum(PTT7),0) as ptt7, FORMAT(sum(PTT8),0) as ptt8, FORMAT(sum(PTT9),0) as ptt9, 
    FORMAT(sum(PTT10),0) as ptt10, FORMAT(sum(PTT11),0) as ptt11, FORMAT(sum(PTT12),0) as ptt12`
    const countSGD = ` 
    FORMAT(sum(SGD1),0) as SGD1, FORMAT(sum(SGD2),0) as SGD2, FORMAT(sum(SGD3),0) as SGD3, 
    FORMAT(sum(SGD4),0) as SGD4, FORMAT(sum(SGD5),0) as SGD5, FORMAT(sum(SGD6),0) as SGD6, 
    FORMAT(sum(SGD7),0) as SGD7, FORMAT(sum(SGD8),0) as SGD8, FORMAT(sum(SGD9),0) as SGD9, 
    FORMAT(sum(SGD10),0) as SGD10, FORMAT(sum(SGD11),0) as SGD11, FORMAT(sum(SGD12),0) as SGD12`
    const countRCC = ` 
    FORMAT(sum(RCC1),0) as RCC1, FORMAT(sum(RCC2),0) as RCC2, FORMAT(sum(RCC3),0) as RCC3, 
    FORMAT(sum(RCC4),0) as RCC4, FORMAT(sum(RCC5),0) as RCC5, FORMAT(sum(RCC6),0) as RCC6, 
    FORMAT(sum(RCC7),0) as RCC7, FORMAT(sum(RCC8),0) as RCC8, FORMAT(sum(RCC9),0) as RCC9, 
    FORMAT(sum(RCC10),0) as RCC10, FORMAT(sum(RCC11),0) as RCC11, FORMAT(sum(RCC12),0) as RCC12`
    const sqlString = `SELECT ${countSGD},${countRCC},${countTPP} FROM v_forecast_all_count where name_of_agency like'${agencyName}%'`
    config.get_connect.query(sqlString, (error, result) => {
        if (error) {
            (process.env.NODE_ENV === 'development') ? console.log(error) : null
        } else {
            res.send(result)
        }
    })
}
//@route GET api/sales/count/:para
exports.getCountById = (req, res) => {
    const brick = JSON.parse(req.params.para)
    const accountId = brick.id.value
    const agencyName = brick.agency
    const countTPP = ` 
    FORMAT(sum(PTT1),0) as ptt1, FORMAT(sum(PTT2),0) as ptt2, FORMAT(sum(PTT3),0) as ptt3, 
    FORMAT(sum(PTT4),0) as ptt4, FORMAT(sum(PTT5),0) as ptt5, FORMAT(sum(PTT6),0) as ptt6, 
    FORMAT(sum(PTT7),0) as ptt7, FORMAT(sum(PTT8),0) as ptt8, FORMAT(sum(PTT9),0) as ptt9, 
    FORMAT(sum(PTT10),0) as ptt10, FORMAT(sum(PTT11),0) as ptt11, FORMAT(sum(PTT12),0) as ptt12`
    const sqlString = `SELECT ${countTPP} FROM v_forecast_all_count where account_id = '${accountId}' and name_of_agency like'${agencyName}%'`
    config.get_connect.query(sqlString, (error, result) => {
        if (error) {
            (process.env.NODE_ENV === 'development') ? console.log(error) : null
        } else {
            res.send(result)
        }
    })
}
//@route POST api/sale
exports.posts = (req, res) => {
    const brick = req.body
    const data = Object.keys(brick).map((key) => {
        return (brick[key])
    })
    const sqlString = `INSERT INTO forecast (account_id,agency_id,client_id,client_type_id, year) value (?)`
    config.get_connect.query(sqlString, [data], (error, result) => {
        if (error) {
            (process.env.NODE_ENV === 'development') ? console.log(error) : null
        } else {
            res.send(result)
        }
    })
}
//@route PUT api/sales
exports.puts = (req, res) => {
    const row_id = req.body.id
    const row_update = req.body.row
    const value = req.body.value
    config.get_connect.query(`update forecast set ${row_update} = '${value}' where id='${row_id}'`, (error, result) => {
        if (error) {
            (process.env.NODE_ENV === 'development') ? console.log(error) : null
        } else {
            res.send(result)
        }
    })
}

/*
const { get_error, get_success } = require('../configure/sql_message')
const isTable = 'forecast_monitoring'
const state = ['gm', 'user']
name_month = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December']

//params:userCode, params:state_code[gm,user]
exports.sales_read = (req, res) => {
    const brick = req.params
    const state_code = brick.state_code
    const user_code = brick.user_code
    const sqlString = req.query.sqlString
    const option = req.query.option
    switch (state_code) {
        case state[0]:
            if (true) {
                conn.query(`select ${ sqlString } from ${ isTable } where name_of_agency like'${option}%' order by name_of_agency`,
                    (error, result) => {
                        if (error) {
                            alert_message = get_error(error)
                        } else {
                            alert_message = get_success(result)
                            res.send(result)
                        }
                    }
                )
            }
            break;

        case state[3]:
            if (true) {
                conn.query(`select * from ${ isTable } where userCode = '${user_code}'`,
                    (error, result) => {
                        if (error) {
                            alert_message = get_error(error)
                        } else {
                            alert_message = get_success(result)
                            res.send(result)
                        }
                    }
                )
            }
            break;

        default:
            break;
    }

}

exports.sales_create = (req, res) => {
    const brick = req.body
    const data = brick.getOpenSales
    const value = [data.userCode, data.NameOfAgency, data.NameOfClient, data.PTT, data.year]
    const number = name_month.indexOf(data.Month) + 1
    if (true) {
        conn.query(`insert into ${ isTable }(userCode, name_of_agency, name_of_client, PTT${ number }, year) values(?)`,
            [value], (error, result) => {
                if (error) {
                    alert_message = get_error(error)
                } else {
                    alert_message = get_success(result)
                    res.send(result)
                }

            })
    }
}

exports.sales_update = (req, res) => {
    const row_id = req.body.id
    const row_update = req.body.row
    const value = req.body.value
    conn.query(`update ${ isTable } set ${ row_update } = '${value}' where id = '${row_id}'`,
        (error, result) => {
            if (error) {
                alert_message = get_error(error)
            } else {
                alert_message = get_success(result)
                res.send(result)
            }
        })
}

exports.sales_delete = (req, res) => {
    res.send()
}
*/
