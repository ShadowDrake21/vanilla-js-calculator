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
    /(?:\d+\,\d+|\d+|\(|\)|\+|\-|\×|\÷|\%|\^|\/|10\^\(\d+\)|\d+\^2|\d+√\(\d+\)|\d+√\(\d+\)|3√\(\d+\)|\d+!\b|\d+\^3|\d+\^\(\d+\)|\d+\/\(\d+\)|e^\(\d+\)|ln\(\d+\)|log10\(\d+\)|sin\(\d+\)|cos\(\d+\)|tan\(\d+\)|π|e)/g;

  const expressionParts = expression.match(regex);

  const evaluateExpression = (start, end) => {
    let result = decideHowParse(expressionParts, start);

    let idx = start + 1;
    while (idx < end) {
      const operator = expressionParts[idx];
      let operand = decideHowParse(expressionParts, idx + 1);

      while (
        idx + 2 < end &&
        getPrecedence(expressionParts[idx + 2]) < getPrecedence(operator)
      ) {
        const nextOperator = expressionParts[idx + 2];
        const nextOperand = decideHowParse(expressionParts, idx + 3);

        switch (nextOperator) {
          case '+':
            operand += nextOperand;
            break;
          case '-':
            console.log('substraction', operand, nextOperand);
            operand -= nextOperand;
            break;
          case '×':
            operand *= nextOperand;
            break;
          case '÷':
            operand /= nextOperand;
            break;
          case '%':
            operand %= nextOperand;
            break;
        }

        idx += 2;
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
        case '%':
          result %= operand;
          break;
      }

      idx += 2;
    }
    return result;
  };

  const evaluateParantheses = (start, end) => {
    let stack = [];
    for (let i = start; i < end; i++) {
      if (expressionParts[i] === '(') {
        stack.push(i);
      } else if (expressionParts[i] === ')') {
        const opndIdx = stack.pop();
        const result = evaluateExpression(opndIdx + 1, i);
        expressionParts.splice(opndIdx, i - opndIdx + 1, result.toString());
        i = opndIdx;
        end -= i - opndIdx;
      }
    }
    return evaluateExpression(start, end);
  };
  console.log(evaluateParantheses(0, expressionParts.length));
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
  if (array[index]) {
    if (array[index] === 'π') {
      return Math.PI;
    } else if (array[index] === 'e') {
      return Math.E;
    } else if (array[index] === 'sin') {
      return Math.sin(decideHowParse(array, index + 1));
    } else if (array[index] === 'cos') {
      return Math.cos(decideHowParse(array, index + 1));
    } else if (array[index] === 'tan') {
      return Math.tan(decideHowParse(array, index + 1));
    } else {
      return array[index].includes(',')
        ? parseNumberToFloat(array[index])
        : parseNumberToInt(array[index]);
    }
  }
  return null;
}
