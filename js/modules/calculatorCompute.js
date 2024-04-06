class SyntaxTreeNode {
  constructor(value) {
    this.value = value;
    this.children = [];
  }
}

const precedence = {
  '(': 0,
  ')': 0,
  'x^2': 1,
  '√x': 1,
  '3√x': 1,
  '10^x': 1,
  ln: 1,
  log10: 1,
  '%': 1,
  'x^x': 1,
  'x^y': 1,
  'x!': 1,
  '1/x': 1,
  'e^x': 1,
  sin: 1,
  cos: 1,
  tan: 1,
  '÷': 2,
  '×': 2,
  '-': 3,
  '+': 3,
};

export const compute = () => {
  const expressionEl = document.querySelector('#resultsField');
  const expression = expressionEl.innerHTML;

  const regex =
    /(?:\d+\,\d+|\d+|\(|\)|\+|\-|\×|\÷|\^|\/|10\^\(\d+\)|\d+\^2|\d+√\(\d+\)|\d+√\(\d+\)|3√\(\d+\)|\d+!\b|\d+\^3|\d+\^\(\d+\)|\d+\/\(\d+\)|e^\(\d+\)|ln\(\d+\)|log10\(\d+\)|sin\(\d+\)|cos\(\d+\)|tan\(\d+\))/g;

  const expressionParts = expression.match(regex);

  const evaluateExpression = () => {
    let result = decideHowParse(expressionParts, 0);

    for (let i = 1; i < expressionParts.length - 1; i += 2) {
      const operator = expressionParts[i];
      let operand = decideHowParse(expressionParts, i + 1);

      while (
        i + 2 < expressionParts.length &&
        getPrecedence(expressionParts[i + 2]) < getPrecedence(operator)
      ) {
        const nextOperator = expressionParts[i + 2];
        const nextOperand = decideHowParse(expressionParts, i + 3);

        switch (nextOperator) {
          case '+':
            operand += nextOperand;
            break;
          case '-':
            operand -= nextOperand;
            break;
          case '×':
            operand *= nextOperand;
            break;
          case '÷':
            operand /= nextOperand;
            break;
        }

        i += 2;
      }
      switch (operator) {
        case '+':
          result += operand;
          break;
        case '-':
          result -= operand;
          break;
        case '×':
          result *= operand;
          break;
        case '÷':
          result /= operand;
          break;
      }
    }
    return result;
  };

  let expressionsInParentheses = findExpressionsInParentheses(expression);
  console.log(evaluateExpression());
};

function findExpressionsInParentheses(str) {
  const expressions = [];
  let start = null;
  let count = 0;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === '(') {
      count++;
      if (count === 1) {
        start = i + 1;
      }
    } else if (str[i] === ')' && count > 0) {
      count--;
      if (count === 0 && start !== null) {
        expressions.push(str.substring(start, i));
        start = null;
      }
    }
  }
  return expressions;
}

function parseNumberToFloat(string) {
  return parseFloat(string.replace(',', '.'));
}

function parseNumberToInt(string) {
  return parseInt(string);
}
function getPrecedence(operator) {
  return precedence[operator] || Infinity;
}

function decideHowParse(array, index) {
  return array[index].includes(',')
    ? parseNumberToFloat(array[index])
    : parseNumberToInt(array[index]);
}
