export default fieldValue => {
  fieldValue = fieldValue && fieldValue.trim ? fieldValue.trim() : fieldValue;

  return {
    valid:
      fieldValue != null && fieldValue != "" && fieldValue != "Invalid Date",
    validationText: "This field is mandatory"
  };
};
