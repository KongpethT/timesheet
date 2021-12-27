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
                conn.query(`select ${sqlString} from ${isTable} where name_of_agency like'${option}%' order by name_of_agency `,
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
                conn.query(`select * from ${isTable} where userCode='${user_code}'`,
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
        conn.query(`insert into ${isTable} (userCode,name_of_agency,name_of_client,PTT${number},year) values (?)`,
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
    conn.query(`update ${isTable} set ${row_update} = '${value}' where id='${row_id}'`,
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
