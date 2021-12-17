const api = {
    company: "http://localhost:3001/company",
    client_type: "http://localhost:3001/client_type",
    timeline: "http://localhost:3001/timeline",
    update_timeline: "http://localhost:3001/update_timeline",
    ae: "http://localhost:3001/ae",
    count_activity: "http://localhost:3001/count_activity",

    //end-time-sheet

    dataBlogs: "http://localhost:3001/blogs",
    dataPosts: "http://localhost:3001/post",
    message: "http://localhost:3001/message",
    upload: "http://localhost:3001/upload",
    debugs: "http://localhost:3001/debugs"
    // end-other share all project
}

const account = {
    token: localStorage.getItem('accessToken'),
    fullUser: localStorage.getItem('accessFullName'),
    userCode: localStorage.getItem('accessCode')
}

export { api, account }

//