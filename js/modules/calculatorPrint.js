export const printValues = (value) => {
  const resultField = document.getElementById('results').children[0];
  let fieldText = resultField.innerHTML;

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
  } else if (hasOparatorAtEnd(fieldText, [')']) && !isNaN(value)) {
    return;
  } else if (
    parseInt(fieldText.slice(fieldText.length - 1, fieldText.length)) >= 0 &&
    !isCommaSeparated(fieldText) &&
    value.toString() === ','
  ) {
    console.log(isCommaSeparated(fieldText));
    resultField.innerHTML += value;
  } else if (
    parseInt(fieldText.slice(fieldText.length - 1, fieldText.length)) === 0 &&
    isNaN(fieldText.slice(fieldText.length - 2, fieldText.length - 1)) &&
    value !== 0 &&
    value.toString() !== ','
  ) {
    resultField.innerHTML =
      fieldText.slice(0, resultField.innerHTML.length - 1) + value.toString();
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
  } else if (
    fieldText.slice(fieldText.length - 1, fieldText.length) === ')' &&
    binaryOperators.includes(value.toString())
  ) {
    resultField.innerHTML += value;
  }
};

function findInString(substring, array) {
  return array.filter((string) => string.includes(substring));
}

function hasOparatorAtEnd(str, array) {
  for (let i = 0; i < array.length; i++) {
    if (str.endsWith(array[i])) {
      return true;
    }
  }
  return false;
}

function countDigitsInLastNumber(string) {
  const numbers = string.match(/\d+/g);
  console.log(numbers);
  if (numbers) {
    const lastNumber = numbers[numbers.length - 1];
    return lastNumber.length;
  } else {
    return 0;
  }
}

function isCommaSeparated(string) {
  const pattern = /0*\d+(?:,\d+)*/g;
  let match;
  let lastNumberIndex = 0;

  while ((match = pattern.exec(string)) !== null) {
    lastNumberIndex = pattern.lastIndex - match[0].length;
  }

  const lastNumberMatch = string.match(pattern);
  const lastNumber = lastNumberMatch[lastNumberMatch.length - 1];
  const hasComma = lastNumber.includes(',');

  return hasComma;
}
