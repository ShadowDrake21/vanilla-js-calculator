export const printValues = (value) => {
  const resultField = document.getElementById('results').children[0];
  let fieldText = resultField.innerHTML;

  const binaryOperators = ['÷', '×', '-', '+', '%'];
  const unaryOperatorsOperatorFirst = [
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
  ];

  const unaryOperatorsPower = ['ex', '10x'];

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
  ];

  const unaryOperatorsOperatorSecond = ['x2', 'x3', 'xy', 'x!'];

  if (
    (fieldText.length === 0 ||
      (fieldText.length !== 0 &&
        hasOparatorAtEnd(fieldText, binaryOperators))) &&
    value.toString() === '('
  ) {
    console.log('1');
    resultField.innerHTML += value;
  } else if (
    (fieldText.match(/\(/g) || []).length >
      (fieldText.match(/\)/g) || []).length &&
    value.toString() === ')'
  ) {
    console.log('2');
    if (
      checkBetween(fieldText, '(', fieldText.length, binaryOperators, true) &&
      !hasOparatorAtEnd(fieldText, binaryOperators)
    ) {
      resultField.innerHTML += value;
    } else {
      if (
        checkBetween(
          fieldText,
          '(',
          fieldText.length,
          binaryOperators,
          false
        ) &&
        !hasOparatorAtEnd(fieldText, binaryOperators)
      ) {
        resultField.innerHTML += value;
      }
      return;
    }
  } else if (hasOparatorAtEnd(fieldText, [')']) && !isNaN(value)) {
    console.log('3');
    return;
  } else if (value.toString() === 'AC') {
    console.log('4');
    resultField.innerHTML = '';
  } else if (
    parseInt(fieldText.slice(fieldText.length - 1, fieldText.length)) >= 0 &&
    !isCommaSeparated(fieldText) &&
    value.toString() === ','
  ) {
    console.log('5');
    console.log(isCommaSeparated(fieldText));
    resultField.innerHTML += value;
  } else if (
    parseInt(fieldText.slice(fieldText.length - 1, fieldText.length)) === 0 &&
    isNaN(fieldText.slice(fieldText.length - 2, fieldText.length - 1)) &&
    value !== 0 &&
    value.toString() !== ','
  ) {
    console.log('6');
    resultField.innerHTML =
      fieldText.slice(0, resultField.innerHTML.length - 1) + value.toString();
  } else if (
    (fieldText.length === 0 || !isNaN(fieldText)) &&
    (!isNaN(value) || unaryOperatorsOperatorFirst.includes(value))
  ) {
    if (unaryOperatorsOperatorFirst.includes(value)) {
      const strValue = value.toString();

      let operatorPart = strValue;
      if (unaryOperatorsPower.includes(strValue)) {
        console.log('7 unaryOperatorsPower');
        if (strValue.includes('x')) {
          operatorPart = strValue.slice(0, strValue.length - 1);
        }
        operatorPart += '^' + '(';
      } else if (strValue.includes('x')) {
        console.log('7 unaryOperatorsPower another');
        operatorPart = strValue.slice(0, strValue.length - 1) + '(';
      } else {
        operatorPart += '(';
      }
      console.log('7 unaryOperatorsPower just');
      resultField.innerHTML += operatorPart;
    } else {
      console.log('7 simple');
      resultField.innerHTML += value;
    }
  } else if (
    fieldText.length !== 0 &&
    binaryOperators.includes(value.toString()) &&
    (!isNaN(fieldText.slice(fieldText.length - 1, fieldText.length)) ||
      hasOparatorAtEnd(fieldText, ['π', 'e']))
  ) {
    console.log('8');

    resultField.innerHTML += value;
  } else if (
    fieldText.length !== 0 &&
    isNaN(fieldText.slice(fieldText.length - 1, fieldText.length)) &&
    (!isNaN(value) || value.toString() === 'π' || value.toString() === 'e') &&
    !hasOparatorAtEnd(fieldText, ['π', 'e'])
  ) {
    console.log('9');
    resultField.innerHTML += value;
  } else if (
    fieldText.length !== 0 &&
    !isNaN(fieldText.slice(fieldText.length - 1, fieldText.length)) &&
    !isNaN(value)
  ) {
    console.log('10');
    resultField.innerHTML += value;
  } else if (
    fieldText !== 0 &&
    unaryOperatorsOperatorFirst.includes(value.toString()) &&
    isNaN(fieldText.slice(fieldText.length - 1, fieldText.length)) &&
    binaryOperators.includes(
      fieldText.slice(fieldText.length - 1, fieldText.length)
    )
  ) {
    console.log('11');
    const strValue = value.toString();

    let operatorPart = strValue;
    if (unaryOperatorsPower.includes(strValue)) {
      if (strValue.includes('x')) {
        operatorPart = strValue.slice(0, strValue.length - 1);
      }
      operatorPart += '^';
    } else if (strValue.includes('x')) {
      operatorPart = strValue.slice(0, strValue.length - 1);
    }
    resultField.innerHTML += operatorPart + '(';
  } else if (
    hasOparatorAtEnd(fieldText, unaryOperatorsOperatorFirstSymbols) &&
    !isNaN(value)
  ) {
    console.log('12');
    resultField.innerHTML += value;
  } else if (
    fieldText.slice(fieldText.length - 1, fieldText.length) === ')' &&
    binaryOperators.includes(value.toString())
  ) {
    console.log('13');
    resultField.innerHTML += value;
  } else if (
    (hasOparatorAtEnd(fieldText, binaryOperators) || fieldText.length === 0) &&
    (value.toString() === 'π' || value.toString() === 'e')
  ) {
    console.log('14');
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

function checkBetween(str, entryPoint, exitPosition, operators, fullSearch) {
  const lastOpenEncounter = str.lastIndexOf(entryPoint);
  const valueBetween = str.slice(lastOpenEncounter + 1, exitPosition);
  let isThereOperator = false;
  console.log('valueBetween', valueBetween);
  if (fullSearch) {
    for (let i = 0; i < operators.length; i++) {
      isThereOperator = valueBetween.includes(operators[i]);
      if (isThereOperator) return true;
    }

    return false;
  } else {
    return valueBetween.length !== 0;
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

export function onBackspace() {
  const resultsField = document.querySelector('#resultsField');
  resultsField.innerHTML = resultsField.innerHTML.slice(
    0,
    resultsField.innerHTML.length - 1
  );
}
