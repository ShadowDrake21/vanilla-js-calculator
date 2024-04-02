export const printValues = (value) => {
  const resultField = document.getElementById('results').children[0];
  const fieldText = resultField.innerHTML;

  if ((fieldText.length === 0 || !isNaN(fieldText)) && !isNaN(value)) {
    resultField.innerHTML += value;
  }
  if (
    fieldText.length !== 0 &&
    value.toString().includes('x') &&
    !isNaN(fieldText.slice(fieldText.length - 1, fieldText.length))
  ) {
    resultField.innerHTML += value;
  }
  if (
    fieldText.length !== 0 &&
    isNaN(fieldText.slice(fieldText.length - 1, fieldText.length)) &&
    !isNaN(value)
  ) {
    resultField.innerHTML += value;
  }
  if (
    fieldText.length !== 0 &&
    !isNaN(fieldText.slice(fieldText.length - 1, fieldText.length)) &&
    isNaN(fieldText.slice(fieldText.length - 2, fieldText.length - 1)) &&
    !isNaN(value)
  ) {
    resultField.innerHTML += value;
  }
};
