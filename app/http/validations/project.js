const { body } = require("express-validator");

function createProjectValidator (){
    return [
      body("title").notEmpty().withMessage("عنوان پروژه نمیتواند خالی باشد."),
      body("tags").isArray({min:0,max:10}).withMessage("حداکثر هشتگ مورد استفاده 10 عدد میباشد."),
      body("text")
        .notEmpty()
        .isLength({ min: 20 })
        .withMessage(
          " توضیحات پروژه نمیتواند خالی باشد. و حداقل باید 20 کاراکتر باشد."
        ),
    ];
}

module.exports = {
  createProjectValidator,
};