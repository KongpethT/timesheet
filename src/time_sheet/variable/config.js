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


    //end-time-sheet

    dataBlogs: "http://localhost:3001/blogs",
    dataPosts: "http://localhost:3001/post",
    message: host + "/message",
    upload: "http://localhost:3001/upload",
    debugs: "http://localhost:3001/debugs"
    // end-other share all project
}

const account = {
    token: localStorage.getItem('accessToken'),
    fullUser: localStorage.getItem('accessFullName'),
    userCode: localStorage.getItem('accessCode')
}
const keys = {
    get_token: localStorage.getItem('accessToken'),
    get_key: 3003003000,
    get_default_password: '1234',
}

export { api, account, keys }

//