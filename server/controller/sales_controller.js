const { get_error, get_success } = require('../configure/sql_message')
const isTable = 'forecast_monitoring'
const state = ['gm', 'admin', 'analyze', 'user']
name_month = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December']

exports.sales_read = (req, res) => {
    const brick = req.params
    const state_code = brick.state_code
    const user_code = brick.user_code
    const option = req.query.option
 
    switch (state_code) {
        case state[0]:
            if (true) {
                conn.query(`select * from ${isTable} ${option}`,
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
        case state[1]:
            if (true) {
                conn.query(`select * from ${isTable} where not in ('${user_code}')`,
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

        case state[2]:
            if (true) {
                conn.query(`select * from ${isTable} where not in ('${user_code}')`,
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
                    //console.log(error);
                } else {
                    alert_message = get_success(result)
                    res.send(result)
                    //console.log(result)
                }

            })
    }
}

exports.sales_update = (req, res) => {
    res.send()
}

exports.sales_delete = (req, res) => {
    res.send()
}