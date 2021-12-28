const host = 'https://localhost:3001'
//const host = 'https://58.82.141.196:3001'
const date = new Date()
const name_month = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December']

const api = {
    client_type: host + "/client_type",
    timeline: host + "/timeline",
    update_timeline: host + "/update_timeline",
    ae: host + "/ae",
    count_activity: host + "/count_activity",
    signin: host + "/signin",
    change_password: host + "/change_password",
    message: host + "/message",
    sales: host + "/sales",
    customer: host + "/customer",
}

const memory = {
    get_token: localStorage.getItem('token'),
    get_full_name: localStorage.getItem('full_name'),
    get_user_code: localStorage.getItem('user_code'),
    get_state_code: localStorage.getItem('state_code'),
    get_email: localStorage.getItem('email'),
}

const keys = {
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
    get_month: name_month[date.getMonth()],
    get_time_expired: '28800',
}

const storage = (value, key) => {
    const now = new Date()
    const item = {
        value: value,
        expiry: now.getTime() + dates.get_time_expired,
    }

    localStorage.setItem(key, JSON.stringify(item))
}

export { api, memory, keys, forms, dates, storage }

//

/**
 * 
 * 
 */