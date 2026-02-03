const auth = require("./auth.middleware")
const isOwnerOrAdmin = require("./ownership.middleware")
const checkRole = require("./role.middleware")
const validate = require("./validate")

module.exports = {
    auth,
    checkRole,
    validate,
    isOwnerOrAdmin,

}