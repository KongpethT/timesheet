const fs = require('fs')
const mysql = require("mysql2")
const CryptoJS = require("crypto-js");
const sql_connect = {
    host: '58.82.141.196',
    user: "root",
    password: "@Ishow2010",
    database: "timesheet",
    port: "13306",
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0
}

const config = {
    get_process_state: 'development',
    get_key_encrypt: '3003003000',
    get_default_password: 'U2FsdGVkX182CTZzfU1xfr37Ys3ApUI5x3oHLu7I9tM=',
    get_certificate: {
        key: fs.readFileSync('./configure/ssl_private.key'),
        cert: fs.readFileSync('./configure/ssl.crt')
    },
    get_connect: mysql.createPool(sql_connect),
    get_sql_err_message: (err) => {
        return set_message = {
            error: true,
            message: err.sqlMessage,
        }
    },
    get_sql_res_message: (result) => {
        return set_message = {
            error: false,
            row: result,
        }
    },
    set_encrypt: (value) => {
        var ciphertext = CryptoJS.AES.encrypt(value, config.get_key_encrypt).toString();
        return ciphertext
    },
    get_decrypt: (value) => {
        var bytes = CryptoJS.AES.decrypt(value, config.get_key_encrypt);
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText
    }

}

process.env.NODE_ENV = process.env.NODE_ENV || config.get_process_state

module.exports = { config }



