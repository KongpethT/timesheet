const { config } = require('../configure/env')
// @route   GET api/sales/all/:para
exports.gets = (req, res) => {
    const brick = JSON.parse(req.params.para)
    const accountId = brick.id.value
    const agencyName = brick.agency
    const sqlString = `SELECT * FROM v_forecast_all where name_of_client like'${agencyName}%'`
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
    const sqlString = `SELECT * FROM v_forecast_ptt where account_id = '${accountId}' and name_of_client like'${agencyName}%' order by update_timestamp DESC`
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
    const summary = `FORMAT(sum(total_SGD), 0) AS total_SGD,FORMAT(sum(total_RCC), 0) AS total_RCC,
    FORMAT(sum(total_PTT), 0) AS total_PTT,FORMAT(sum(total), 0) AS total`
    const sqlString = `SELECT ${countSGD},${countRCC},${countTPP},${summary} FROM v_forecast_all_count where name_of_client like'${agencyName}%'`
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
    FORMAT(sum(PTT10),0) as ptt10, FORMAT(sum(PTT11),0) as ptt11, 
    FORMAT(sum(PTT12),0) as ptt12,FORMAT(sum(total_PTT), 0) AS total_PTT`
    const countPRO = `  FORMAT(sum(PRO1),0) as PRO1, FORMAT(sum(PRO2),0) as PRO2, FORMAT(sum(PRO3),0) as PRO3, 
    FORMAT(sum(PRO4),0) as PRO4, FORMAT(sum(PRO5),0) as PRO5, FORMAT(sum(PRO6),0) as PRO6, 
    FORMAT(sum(PRO7),0) as PRO7, FORMAT(sum(PRO8),0) as PRO8, FORMAT(sum(PRO9),0) as PRO9, 
    FORMAT(sum(PRO10),0) as PRO10, FORMAT(sum(PRO11),0) as PRO11, 
    FORMAT(sum(PRO12),0) as PRO12,FORMAT(sum(total_PRO), 0) AS total_PRO`
    const sqlString = `SELECT ${countTPP},${countPRO} FROM v_forecast_all_count where account_id = '${accountId}' and name_of_client like'${agencyName}%'`
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
    const txt1 = 'SGD1,RCC1,PTT1,PRO1,SGD2,RCC2,PTT2,PRO2,SGD3,RCC3,PTT3,PRO3,SGD4,RCC4,PTT4,PRO4'
    const txt2 = 'SGD5,RCC5,PTT5,PRO5,SGD6,RCC6,PTT6,PRO6,SGD7,RCC7,PTT7,PRO7,SGD8,RCC8,PTT8,PRO8'
    const txt3 = 'SGD9,RCC9,PTT9,PRO9,SGD10,RCC10,PTT10,PRO10,SGD11,RCC11,PTT11,PRO11,SGD12,RCC12,PTT12,PRO12'
    const sqlString = `INSERT INTO forecast(account_id, agency_id, client_id, client_type_id, year, ${txt1}, ${txt2}, ${txt3}) value(?, 
        '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
         '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 
         '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0')`
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
    config.get_connect.query(`update forecast set ${row_update} = "${value}" where id = '${row_id}'`, (error, result) => {
        if (error) {
            (process.env.NODE_ENV === 'development') ? console.log(error) : null
        } else {
            res.send(result)
        }
    })
}
//@route DELETED api/sales
exports.deleted = (req, res) => {
    const id = req.params.id
    const sqlString = `DELETE FROM forecast where id=${id}`
    config.get_connect.query(sqlString, (error, result) => {
        if (error) {
            (process.env.NODE_ENV === 'development') ? console.log(error) : null
        } else {
            //console.log(result.affectedRows)
            res.send(result)
        }
    })
}