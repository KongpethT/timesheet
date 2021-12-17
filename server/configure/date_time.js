let date = new Date()
global.get_date = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear()
global.get_time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()

