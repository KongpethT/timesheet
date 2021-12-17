const { message } = require("./messaged_controller");

exports.timeline = (req, res) => {
  const id = req.query.id;
  conn.query(
    `select 
    id, 
    userCode,
    DATE_FORMAT(timeline, "%Y-%m-%d") as timeline,
    clientName,
    company,
    clientType,
    visitCall,visitAM,visitPM,siteTourAM,siteTourPM,lunch,dinner,others
    from timeline where userCode='${id}' order by id desc`,
    (error, result) => {
      if (error) {
        res.send({
          error: error
        });
      } else {
        res.send(result);
      }
    }
  );
};

//insert
exports.setTimeline = (req, res) => {
  const brick = req.body
  //format object data to array
  const data = Object.values(brick.value);
  conn.query("insert into timeline (userCode,timeline,clientName,company,clientType,"
    + "visitCall,visitAM,visitPM,siteTourAM,siteTourPM,lunch,dinner,others) values (?)",
    [data], (error, result) => {
      if (error) {
        alert_message = 'Unsuccessfully: ' + error.sqlMessage
        const text = { user: data[0], type: 'insert', error: error.sqlMessage }
        save_log_file('timeline', text)

      } else {
        alert_message = 'successfully'
        //create log successfully
        const text = { user: data[0], info: 'insert successfully' }
        save_log_file('timeline', text)

      }
    }
  )

}

//update
exports.update_timeline = (req, res) => {
  const value = req.body.value
  //console.log(value);
  conn.query("update timeline"
    + " set timeline = " + `'${value.date}'`
    + ", clientName = " + `'${value.client_name}'`
    + ", company = " + `'${value.company}'`
    + ", clientType = " + `'${value.client_type}'`
    + ", visitCall = " + `'${(value.visit_call) ? 1 : 0}'`
    + ", visitAM = " + `'${(value.visit_am) ? 1 : 0}'`
    + ", visitPM = " + `'${(value.visit_pm) ? 1 : 0}'`
    + ", siteTourAM = " + `'${(value.site_tour_am) ? 1 : 0}'`
    + ", siteTourPM = " + `'${(value.site_tour_pm) ? 1 : 0}'`
    + ", lunch = " + `'${(value.lunch) ? 1 : 0}'`
    + ", dinner = " + `'${(value.dinner) ? 1 : 0}'`
    + ", others = " + `'${value.others}'`
    + " where id = " + value.row_id + "",
    (error, result) => {
      if (error) {
        alert_message = `updated unsuccessfully: ${error.sqlMessage} `
        const text = { user: value.code, type: 'update', error: error.sqlMessage }
        save_log_file('timeline', text)
      } else {
        alert_message = `updated successfully:`
        const text = { user: value.code, type: 'update', info: 'successfully' }
        save_log_file('timeline', text)
      }
    })

}

////////