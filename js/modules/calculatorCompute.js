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
    /(?:\d+,\d+|\d+\.\d+|\d+|[\(\)\+\-\×\÷\%\^]|10\^\(\d+\)|\d+\^2|\d+√\(\d+\)|3√\(\d+\)|\d+!\b|\d+\^3|\d+\^\(\d+\)|\d+\/\(\d+\)|e\^\(\d+\)|ln\(\d+\)|log10\(\d+\)|(sin|cos|tan)\((?:\d+(\,\d+)?|[^\(\)]+?)\)|sin\(π\)|cos\(π\)|tan\(π\)|sin\(e\)|cos\(e\)|tan\(e\)|sin\(π(?:\/\d+(\,\d+)?)?\)|cos\(π(?:\/\d+(\,\d+)?)?\)|tan\(π(?:\/\d+(\,\d+)?)?\)|π|e)/g;

  // /(?:(?:\d+,\d+|\d+\.\d+|\d+|\(|\)|\+|\-|\×|\÷|\%|\^|\/|10\^\(\d+\)|\d+\^2|\d+√\(\d+\)|\d+√\(\d+\)|3√\(\d+\)|\d+!\b|\d+\^3|\d+\^\(\d+\)|\d+\/\(\d+\)|e^\(\d+\)|ln\(\d+\)|log10\(\d+\)|sin\(\d+(\,\d+)?|\(π\/\d+(\,\d+)?|\(\d+(\,\d+)?\)|\(e\/\d+(\,\d+)?\)|cos\(\d+(\,\d+)?|\(π\/\d+(\,\d+)?|\(\d+(\,\d+)?\)|\(e\/\d+(\,\d+)?\)|tan\(\d+(\,\d+)?|\(π\/\d+(\,\d+)?|\(\d+(\,\d+)?\)|\(e\/\d+(\,\d+)?\)|π|e))/g;

  const expressionParts = expression.match(regex);

  console.log('before', expressionParts, expression);

  for (let i = 0; i < expressionParts.length; i++) {
    if (
      expressionParts[i].includes('sin') |
      expressionParts[i].includes('cos') |
      expressionParts[i].includes('tan')
    ) {
      const operator = expressionParts[i].slice(0, 3);
      let value;
      if (
        expressionParts[i].includes('(') &&
        expressionParts[i].includes(')')
      ) {
        value = expressionParts[i].substring(
          expressionParts[i].indexOf('(') + 1,
          expressionParts[i].indexOf(')')
        );
        console.log('value', value);
      } else {
        value = expressionParts[i].slice(4);
      }
      console.log('trigonometry', operator, value);
      expressionParts[i] = operator;
      expressionParts.splice(i + 1, 1);
      expressionParts.splice(i + 1, 0, value);
      i++;
    }
    console.log(expressionParts);
  }

  const evaluateExpression = (start, end) => {
    let result = decideHowParse(expressionParts, start);
    console.log('result', start, end);
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
        case 'sin':
          result = Math.sin(fromDegreesToRadians(operand));
          break;
        case 'cos':
          result = Math.cos(fromDegreesToRadians(operand));
          break;
        case 'tan':
          result = Math.tan(fromDegreesToRadians(operand));
          break;
      }

      idx += 2;
    }
    return result;
  };

  const evaluateParantheses = (start, end) => {
    let stack = [];
    let i = start;
    while (i < end) {
      if (expressionParts[i] === '(') {
        stack.push(i);
      } else if (expressionParts[i] === ')') {
        const opndIdx = stack.pop();
        const result = evaluateExpression(opndIdx + 1, i);
        console.log();
        console.log('result', result);
        expressionParts.splice(opndIdx, i - opndIdx + 1, result.toString());
        end -= i - opndIdx;
        i = opndIdx;
      }
      i++;
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

function fromDegreesToRadians(degress) {
  return degress * (Math.PI / 180);
}
