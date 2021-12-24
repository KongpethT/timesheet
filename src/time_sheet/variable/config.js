const host = 'http://localhost:3001'
//const host = 'http://58.82.141.196:3001'

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
    get_staff_code: localStorage.getItem('accessCode')
}

const keys = {
    get_token: localStorage.getItem('accessToken'),
    get_key: '3003003000',
    get_default_password: 'U2FsdGVkX182CTZzfU1xfr37Ys3ApUI5x3oHLu7I9tM=',
}

export { api, account, keys }

//