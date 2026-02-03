const { createContactValidator } = require("./createContactDto");
const { searchContactValidator } = require("./searchContactdto");
const { updateContactValidator } = require("./updateContacDto");

module.exports = {
    searchContactValidator,
    createContactValidator,
    updateContactValidator
};
  