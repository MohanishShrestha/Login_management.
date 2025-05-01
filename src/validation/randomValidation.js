import Joi from "joi";

let randomValidation = Joi.object()
  .keys({
    name: Joi.string().required().min(3).messages({
      "any.required": "name is required",
      "string.base": "field must be string",
      "string.min": "name must be at least 3 character",
      "string.max": "name must be at most 10 character",
    }), //.allow("") it allow empty string
    age: Joi.number().required().min(18).max(60).messages({
      "any.required": "age is required",
    }),
    gender: Joi.string().required().valid("male", "female", "other"),
    email: Joi.string()
      .required()
      .custom((value, msg) => {
        let validEmail = value.match(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        );
        if (validEmail) {
          return true;
        } else {
          return msg.message("email is not valid");
        }
      }),
    password: Joi.string()
      .required()
      .custom((value, msg) => {
        let validPassword = value.match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        );
        if (validPassword) {
          return true;
        } else {
          return msg.message(
            "password must have at least 8 character, one lower and one upper case letter, one number and a special character"
          );
        }
      }),

    isMarried: Joi.boolean().required(),
    //spouseName is depend on isMarried
    spouseName: Joi.when("isMarried", {
      is: true,
      then: Joi.string().required(),
      otherwise: Joi.string(),
    }),

    location: Joi.object().keys({
      country: Joi.string().required(),
      exactlocation: Joi.string().required(),
    }),

    favTeacher: Joi.array().items(Joi.string().required()),

    favSubject: Joi.array().items(
      Joi.object().keys({
        bookName: Joi.string().required(),
        bookAuthor: Joi.string().required(),
      })
    ),
  })
  .unknown(false);

// true vayo vane unknown pathauna milxa ie mathi difine nagareko ni pathauna milxa

export default randomValidation;
