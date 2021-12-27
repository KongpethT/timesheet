const host = 'http://localhost:3001'
//const host = 'http://58.82.141.196:3001'
const date = new Date()
const name_month = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December']

const api = {
    company: host + "/company",
    client_type: host + "/client_type",
    timeline: host + "/timeline",
    update_timeline: host + "/update_timeline",
    ae: host + "/ae",
    count_activity: host + "/count_activity",
    signin: host + "/signin",
    change_password: host + "/change_password",
    message: host + "/message",
    sales: host + "/sales",
}

const account = {
    token: localStorage.getItem('accessToken'),
    fullUser: localStorage.getItem('accessFullName'),
    userCode: localStorage.getItem('accessCode'),
    get_full_name: localStorage.getItem('accessFullName'),
    get_staff_code: localStorage.getItem('accessCode'),
    get_state_code: localStorage.getItem('accessState')
}

const keys = {
    get_token: localStorage.getItem('accessToken'),
    get_key: '3003003000',
    get_default_password: 'U2FsdGVkX182CTZzfU1xfr37Ys3ApUI5x3oHLu7I9tM=',
}

const forms = {
    placeholder_warning: 'please fill out this field',
    massage_success: 'successfully',
    message_warning: 'unsuccessfully'
}

const dates = {
    name_month: ['January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'],
    get_date: date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear(),
    get_time: date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
    get_year: JSON.stringify(date.getFullYear()),
    get_month: name_month[date.getMonth()]
}

export { api, account, keys, forms, dates }

//