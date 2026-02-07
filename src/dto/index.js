const { createContactValidator } = require("./createContactDto");
const { refreshTokenValidator } = require("./refresh-token.dto");
const { searchContactValidator } = require("./searchContactdto");
const { updateContactValidator } = require("./updateContacDto");
const { registerValidator, loginValidator } = require("./auth.dto");

module.exports = {
    searchContactValidator,
    createContactValidator,
    updateContactValidator,
    refreshTokenValidator,
    registerValidator,
    loginValidator,
};
  