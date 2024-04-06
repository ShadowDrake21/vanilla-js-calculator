export const printValues = (value) => {
  const resultField = document.getElementById('results').children[0];
  let fieldText = resultField.innerHTML;

  const binaryOperators = ['÷', '×', '-', '+', '%'];
  const unaryOperatorsOperatorFirst = [
    'e^x',
    '10^x',
    '1/x',
    '√x',
    '3√x',
    'ln',
    'log10',
    'sin',
    'cos',
    'tan',
    '2^x',
    '3^x',
  ];

  const unaryOperatorsOtherThanPowet = [
    '1/x',
    '√x',
    '3√x',
    'ln',
    'log10',
    'sin',
    'cos',
    'tan',
  ];

  const unaryOperatorsPower = ['e^x', '10^x', '2^x', '3^x'];

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

  const unaryOperatorsOperatorSecond = ['x^2', 'x^3', 'x^y', 'x!'];

  function checkPutOpenBracket() {
    return (
      (fieldText.length === 0 ||
        (fieldText.length !== 0 &&
          hasOparatorAtEnd(fieldText, binaryOperators))) &&
      value.toString() === '('
    );
  }

  function checkPutCloseBracket() {
    return (
      (fieldText.match(/\(/g) || []).length >
        (fieldText.match(/\)/g) || []).length && value.toString() === ')'
    );
  }

  function checkIfPossibleToPutCloseBracket() {
    return hasOparatorAtEnd(fieldText, [')']) && !isNaN(value);
  }

  function checkPutComma() {
    return (
      parseInt(fieldText.slice(fieldText.length - 1, fieldText.length)) >= 0 &&
      !isCommaSeparated(fieldText) &&
      value.toString() === ','
    );
  }

  function checkChangeFirstZero() {
    return (
      parseInt(fieldText.slice(fieldText.length - 1, fieldText.length)) === 0 &&
      isNaN(fieldText.slice(fieldText.length - 2, fieldText.length - 1)) &&
      fieldText.slice(fieldText.length - 2, fieldText.length - 1) !== ',' &&
      value !== 0 &&
      value.toString() !== ','
    );
  }

  function checkUnaryFunctions1() {
    return (
      (fieldText.length === 0 || !isNaN(fieldText)) &&
      (!isNaN(value) || unaryOperatorsOperatorFirst.includes(value))
    );
  }

  function checkAfterPiAndE() {
    return (
      fieldText.length !== 0 &&
      binaryOperators.includes(value.toString()) &&
      (!isNaN(fieldText.slice(fieldText.length - 1, fieldText.length)) ||
        hasOparatorAtEnd(fieldText, ['π', 'e']))
    );
  }

  function checkUnaryFunctions2() {
    return (
      fieldText.length !== 0 &&
      isNaN(fieldText.slice(fieldText.length - 1, fieldText.length)) &&
      (!isNaN(value) ||
        value.toString() === 'π' ||
        value.toString() === 'e' ||
        unaryOperatorsOperatorFirst.includes(value.toString())) &&
      !hasOparatorAtEnd(fieldText, ['π', 'e'])
    );
  }

  function checkUnaryFunctions3() {
    return (
      fieldText !== 0 &&
      unaryOperatorsOperatorFirst.includes(value.toString()) &&
      isNaN(fieldText.slice(fieldText.length - 1, fieldText.length)) &&
      binaryOperators.includes(
        fieldText.slice(fieldText.length - 1, fieldText.length)
      )
    );
  }

  function checkWritePiAndE() {
    return (
      (hasOparatorAtEnd(fieldText, binaryOperators) ||
        fieldText.length === 0) &&
      (value.toString() === 'π' || value.toString() === 'e')
    );
  }

  if (checkPutOpenBracket()) {
    console.log('1');
    resultField.innerHTML += value;
  } else if (checkPutCloseBracket()) {
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
  } else if (checkIfPossibleToPutCloseBracket()) {
    console.log('3');
    return;
  } else if (value.toString() === 'AC') {
    console.log('4');
    resultField.innerHTML = '';
  } else if (checkPutComma()) {
    console.log('5');
    console.log(isCommaSeparated(fieldText));
    resultField.innerHTML += value;
  } else if (checkChangeFirstZero()) {
    console.log('6');
    resultField.innerHTML =
      fieldText.slice(0, resultField.innerHTML.length - 1) + value.toString();
  } else if (checkUnaryFunctions1()) {
    if (unaryOperatorsOperatorFirst.includes(value)) {
      const strValue = value.toString();

      let operatorPart = strValue;
      if (unaryOperatorsPower.includes(strValue)) {
        console.log('7 unaryOperatorsPower');
        if (strValue.includes('x')) {
          operatorPart = strValue.slice(0, strValue.length - 1);
        }
        if (
          !hasOparatorAtEnd(operatorPart, ['^']) &&
          !unaryOperatorsOtherThanPowet.includes(value.toString())
        ) {
          operatorPart += '^' + '(';
        } else {
          operatorPart += '(';
        }
      } else if (strValue.includes('x')) {
        console.log('7 unaryOperatorsPower another');
        operatorPart = strValue.slice(0, strValue.length - 1) + '(';
      } else {
        operatorPart += '(';
      }
      console.log('7 unaryOperatorsPower just');
      resultField.innerHTML += `(${operatorPart}`;
    } else {
      console.log('7 simple');
      resultField.innerHTML += value;
    }
  } else if (checkAfterPiAndE()) {
    console.log('8');

    resultField.innerHTML += value;
  } else if (checkUnaryFunctions2()) {
    console.log('9');
    if ([...binaryOperators, '('].includes(fieldText.slice(-1))) {
      const strValue = value.toString();
      let operatorPart = strValue;
      if (unaryOperatorsOperatorFirst.includes(strValue)) {
        if (strValue.includes('x')) {
          operatorPart = strValue.slice(0, strValue.length - 1);
        }
        if (
          !hasOparatorAtEnd(operatorPart, ['^']) &&
          !unaryOperatorsOtherThanPowet.includes(value.toString())
        ) {
          operatorPart += '^' + '(';
        } else {
          operatorPart += '(';
        }
      } else if (parseInt(value)) {
        operatorPart = strValue;
      }
      resultField.innerHTML += operatorPart;
    } else if ([...binaryOperators, ','].includes(fieldText.slice(-1))) {
      resultField.innerHTML += value.toString();
    }
  } else if (
    fieldText.length !== 0 &&
    !isNaN(fieldText.slice(fieldText.length - 1, fieldText.length)) &&
    !isNaN(value)
  ) {
    console.log('10');
    resultField.innerHTML += value;
  } else if (checkUnaryFunctions3()) {
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
  } else if (checkWritePiAndE()) {
    console.log('14');
    resultField.innerHTML += value;
  } else if (unaryOperatorsOperatorSecond.includes(value.toString())) {
    if (parseInt(fieldText.slice(-1))) {
      if (value.toString() === 'x^y') {
        resultField.innerHTML += '^(';
      } else {
        console.log(countDigitsInLastNumber(fieldText));
        const lengthLastNumber = countDigitsInLastNumber(fieldText);
        const powerPart = fieldText.slice(
          fieldText.length - lengthLastNumber,
          fieldText.length
        );
        const modifiedPowerPart =
          '(' + powerPart + value.slice(1, value.length) + ')';
        resultField.innerHTML =
          fieldText.slice(0, fieldText.length - lengthLastNumber) +
          modifiedPowerPart;
      }
    }
  }
};

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
