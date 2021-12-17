const mysql = require("mysql2")

global.conn = mysql.createConnection(
    {
        //host: "58.82.141.196",
        host: "10.180.0.1",
        //host: "localhost",
        user: "root",
        password: "@Ishow2010",
        //database: "blogsdb",
        database: "timesheet",
        //port: "13306",
        //pool: {max: 5,min: 0,acquire: 30000,idel: 10000}
    }
)
