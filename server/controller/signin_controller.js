const jwt = require('jsonwebtoken')
const { config } = require("../configure/env");
const account_table = (brick) => {
    try {
        config.get_connect.query(`select * from account order by fullName`, (error, result) => {
            if (error) {
                alert_message = {
                    mes: error.message,
                    stack: process.env.NODE_ENV === 'production' ? ':(' : error.sqlState,
                }
                brick(alert_message)
            } else {
                brick(result)
            }
        })
    } catch (error) {
        if (error) throw error
    }
}



// @route   GET api/posts
// @desc    Get All Posts
// @access  Public
exports.getPosts = (req, res) => {
    console.log('working here getPosts');
}


// @route   GET api/posts /:id
// @desc    Gets a post by ID
// @access  Private
exports.getPostById = (req, res) => {
    const param = JSON.stringify(req.params.param1)

    const demo = SON.parse(param);
    console.log(demo);


}

// @route   GET api/posts/:user/:password
// @desc    Gets a post by ID
// @access  Private
exports.getPostByLogin = (req, res) => {
    const name = req.params.name
    const password = req.params.password
  
}//


/*

const postsArray = [
    {
        id: 1,
        title: 'React from scratch',
        content: 'In this article we will create a ToDo App in React from scratch.... etc.etc.etc.',
        author: 'Jakob Klamser'
    },
    {
        id: 2,
        title: 'Vanilla JavaScript Basics',
        content: 'Today we will discuss some basic JavaScript fundamentals like array manipulation, currying etc.',
        author: 'Jakob Klamser'
    },
    {
        id: 3,
        title: 'VS Code Extensions',
        content: 'I wanted to show you some of my favorite VS Code Extensions.... Bracket Pair Colorizer etc.etc.',
        author: 'Jakob Klamser'
    },
    {
        id: 4,
        title: 'ExpressJS REST API',
        content: 'Is this the current article?',
        author: 'Jakob Klamser'
    },
];

*/

/*
// @route   GET api/posts
// @desc    Get All Posts
// @access  Public
exports.getPosts = (req, res) => {
    
    const posts = postsArray;
    return res.status(200).json({
        success: true,
        count: posts.length,
        brick: posts,
    });
};

// @route   GET api/posts/:id
// @desc    Gets a post by ID
// @access  Private
exports.getPostById = (req, res) => {
    const post = postsArray.filter(post => post.id === Number(req.params.id));
    console.log(post);
    if (post[0] !== undefined) {
        return res.status(200).json({
            success: true,
            brick: post[0],
        });
    }
    return res.status(404).json({
        success: false,
        error: 'No post found',
    })
};


/*
global.jwt = require('jsonwebtoken')
const { config } = require("../configure/env");

exports.signin = (req, res) => {
    const value = req.body.getAccount
    const isUsername = value.username
    const isPassword = value.password

    config.get_connect.query(`select user_code, user_state, fullName, email, password from account where email ='${isUsername}'`,
        (error, result) => {
            if (error) {
                alert_message = config.get_sql_err_message(error)
                res.send(error)
            } else {
                alert_message = config.get_sql_res_message()
                const brick = result[0];
                const brick = {
                    user_code: brick.user_code,
                    user_state: brick.user_state,
                    full_name: brick.fullName,
                    email_id: brick.email
                }
                const password = config.get_decrypt(brick.password)
                if (password === isPassword) {
                    let token = jwt.sign(brick, config.get_key_encrypt, {
                        expiresIn: '8h' // expires in 8 hours
                    });
                    const obj = { brick, token }
                    res.send(obj)
                }
            }
        }
    )
}

*/