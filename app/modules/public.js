const { body } = require("express-validator");

function mongoIdValidator() {
  return [body("id").isMongoId().withMessage("شناسه وارد شده صحیح نمیباشد.")];
}

module.exports = {
  mongoIdValidator,
};
