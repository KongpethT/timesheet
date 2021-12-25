const name_month = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December']
let date = new Date()
global.get_date = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear()
global.get_time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
global.get_year = date.getFullYear()
global.get_month = name_month[date.getMonth()]

