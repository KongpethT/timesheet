const get_error = (err) => {
    return set_message = {
        error: true,
        message: err.sqlMessage,
    }
}

const get_success = (result) => {
    return set_message = {
        error: false,
        row: result.length,
    }
}

module.exports = { get_error, get_success }