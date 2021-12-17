exports.blogs = function (req, res) {
    conn.query("select title,author,category,cover from blogs order by created_at desc", (error, result) => {
        if (error) {
            res.send({
                develop: "pockoo",
                connected: false,
                message: error
            })
        } else {
            res.send(result)
        }
    })
}

exports.blogs_ = function (req, res) {
    const code = req.body.code
    const title = req.body.title
    const author = req.body.author
    const category = req.body.category
    const cover = req.body.text
    conn.query("insert into blogs (code, title, author, category,cover) values (?,?,?,?,?)",
        [code, title, author, category, cover], (error, result) => {
            if (error) {
                message =
                {
                    develop: "pockoo",
                    connected: true,
                    error: true,
                    message: error,
                    state: "unsuccessful"
                }
            } else {
                message =
                {
                    develop: "pockoo",
                    connected: true,
                    error: false,
                    message: result,
                    state: "successfully"
                }
            }
        })
    setTimeout(() => { message = null }, 30000)
}