const auth = require("./auth.middleware")
const isOwnerOrAdmin = require("./ownership.middleware")
const checkRole = require("./role.middleware")
const validate = require("./validate")
const setLanguage = require("./setLanguage")

module.exports = {
    auth,
    checkRole,
    validate,
    isOwnerOrAdmin,
    setLanguage,
}