export default fieldValue => {
  return {
    valid: !isNaN(fieldValue),
    validationText: "Please enter only numbers"
  };
};
