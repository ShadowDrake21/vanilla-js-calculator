export const printValues = (value) => {
  const resultField = document.getElementById('results').children[0];
  const fieldText = resultField.innerHTML;

  const binaryOperators = ['÷', '×', '-', '+', '%'];
  const unaryOperatorsOperatorFirst = [
    '2nd',

    'ex',
    '10x',
    '1/x',
    '√x',
    '3√x',
    'y√x',
    'ln',
    'log10',
    'sin',
    'cos',
    'tan',
    'sinh',
    'cosh',
    'tanh',
  ];

  const unaryOperatorsPower = ['ex', '10x', '2nd'];

  const unaryOperatorsOperatorFirstSymbols = [
    '2^',
    'e^',
    '10^',
    '1/',
    '√',
    '3√',
    'y√',
    'ln',
    'log10',
    'sin',
    'cos',
    'tan',
    'sinh',
    'cosh',
    'tanh',
  ];

  const unaryOperatorsOperatorSecond = ['x2', 'x3', 'xy', 'x!'];

  if (
    (fieldText.length === 0 ||
      (fieldText.length !== 0 &&
        hasOparatorAtEnd(fieldText, binaryOperators))) &&
    value.toString() === '('
  ) {
    resultField.innerHTML += value;
  } else if (
    (fieldText.match(/\(/g) || []).length >
      (fieldText.match(/\)/g) || []).length &&
    value.toString() === ')'
  ) {
    resultField.innerHTML += value;
  } else if ((fieldText.length === 0 || !isNaN(fieldText)) && !isNaN(value)) {
    resultField.innerHTML += value;
  } else if (
    fieldText.length !== 0 &&
    binaryOperators.includes(value.toString()) &&
    !isNaN(fieldText.slice(fieldText.length - 1, fieldText.length))
  ) {
    resultField.innerHTML += value;
  } else if (
    fieldText.length !== 0 &&
    isNaN(fieldText.slice(fieldText.length - 1, fieldText.length)) &&
    !isNaN(value)
  ) {
    resultField.innerHTML += value;
  } else if (
    fieldText.length !== 0 &&
    !isNaN(fieldText.slice(fieldText.length - 1, fieldText.length)) &&
    !isNaN(value)
  ) {
    resultField.innerHTML += value;
  } else if (
    fieldText !== 0 &&
    unaryOperatorsOperatorFirst.includes(value.toString()) &&
    isNaN(fieldText.slice(fieldText.length - 1, fieldText.length)) &&
    binaryOperators.includes(
      fieldText.slice(fieldText.length - 1, fieldText.length)
    )
    //|| (fieldText === 0 && unaryOperators.includes(value.toString()))
  ) {
    const strValue = value.toString();

    let operatorPart = strValue;
    if (unaryOperatorsPower.includes(strValue)) {
      if (strValue.includes('x')) {
        operatorPart = strValue.slice(0, strValue.length - 1);
      } else if (strValue.includes('nd')) {
        operatorPart = strValue.slice(0, strValue.length - 2);
      }
      operatorPart += '^';
    } else if (strValue.includes('x')) {
      operatorPart = strValue.slice(0, strValue.length - 1);
    }
    resultField.innerHTML += operatorPart;
  } else if (
    hasOparatorAtEnd(fieldText, unaryOperatorsOperatorFirstSymbols) &&
    !isNaN(value)
  ) {
    resultField.innerHTML += value;
  }
};

function findInString(substring, array) {
  return array.filter((string) => string.includes(substring));
}

function hasOparatorAtEnd(str, array) {
  for (let i = 0; i < array; i++) {
    if (str.endsWith(array)) {
      return true;
    }
  }
  return false;
}
