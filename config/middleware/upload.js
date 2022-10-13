const { body, param, query } = require("express-validator")
const middleware = {}

middleware.validate = (method) => {
    switch (method) {
        case 'uploadImage': {
            return [
                body('type', 'Type is required').notEmpty().exists(),
            ]
        }
    }
}

module.exports = middleware