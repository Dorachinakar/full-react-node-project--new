import joi from "joi";
function FormikValidateJoi(schema) {
  return (values) => {
    const { error } = joi.object(schema).validate(values, {
      abortEarly: false,
    });
    if (!error) {
      return null;
    }
    const errors = {};
    for (const detail of error.details) {
      error[detail.path[0]] = detail.massage;
    }
    return errors;
  };
}

export default FormikValidateJoi;
