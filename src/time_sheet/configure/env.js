//const host = 'https://10.180.0.1:3001'
const host = 'http://localhost:3001'
const date = new Date()
const name_month = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December']

const api = {
    //message: host + "/message",
    client_type: host + "/client_type",
    timeline: host + "/api/timeline",
    update_timeline: host + "/update_timeline",
    ae: host + "/ae",
    count_activity: host + "/count_activity",
    signin: host + "/api/signin",
    change_password: host + "/change_password",
    sales: host + "/api/sales",
    customer: host + "/api/customer",
    person: host + "/api/person",
    dashboard: host + '/api/dashboard'
}

const memory = {
    get_token: localStorage.getItem('token'),
    get_account_id: localStorage.getItem('account_id'),
    get_full_name: localStorage.getItem('full_name'),
    get_user_code: localStorage.getItem('user_code'),
    get_state_code: localStorage.getItem('state_code'),
    get_email: localStorage.getItem('email'),
}

const keys = {
    get_key: '3003003000',
    get_default_password: 'U2FsdGVkX182CTZzfU1xfr37Ys3ApUI5x3oHLu7I9tM=',


}
const alphabet = {
    get_capital: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    get_lowercase: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    get_number: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    get_special: ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', ' - ', ' + ', '=']

}

const forms = {
    get_placeholder_warning: 'please fill out this field',
    get_massage_success: 'successfully',
    get_message_warning: 'unsuccessfully',
    get_message_login_error1: 'Login Error',
    get_message_login_error2: 'An Invalid username or password. Please try logging in again.'
}

const dates = {
    get_name_month: ['January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'],
    get_date: date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear(),
    get_time: date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
    get_year: JSON.stringify(date.getFullYear()),
    get_month: name_month[date.getMonth()],
    get_time_expired: (60000 * 60), // 1 housr
}

const colors = {
    get_column_edit: '#c5e075',
    get_bg_default: '#0f2442',
    get_bg_SGD:'#70AD47',
    get_bg_RCC:'#4472C4',
    get_bg_PTT:'#FFC000',
}
const storage = (value, key) => {
    const now = new Date()
    const item = {
        value: value,
        expiry: now.getTime() + dates.get_time_expired,
    }

    localStorage.setItem(key, JSON.stringify(item))
}

const storege_exp = (key) => {
    const itemStr = localStorage.getItem(key)
    // if the item doesn't exist, return null
    if (!itemStr) {
        return null
    }

    const item = JSON.parse(itemStr)
    const now = new Date()
    //console.log(item.expiry);
    //console.log(now.getTime() > item.expiry);
    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
        // If the item is expired, delete the item from storage
        // and return null
        //localStorage.removeItem(key)
        localStorage.clear()
        //console.log('get-time: ', now.getTime());
        //164071030582228800
        return null
    }
    return item.value
}

const passwordValidity = (para1, para2) => {
    let isChecked = false
    for (let i = 0; i < para1.length; i++) {
        for (let j = 0; j < para2.length; j++) {
            if (para1[i] === para2[j]) {
                //console.log(para1[i] + ' = ' + para2[j])
                isChecked = true
                break
            }
            else {
                //console.log(para1[i] + ' = ' + para2[j])
            }
        }
        if (isChecked === true) { return isChecked }
    }
    return isChecked
}

export { api, memory, keys, forms, dates, storage, storege_exp, passwordValidity, alphabet, colors }
