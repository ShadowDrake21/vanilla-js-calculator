import { buttonTexts } from '../../static/buttons.js';
import { printValues } from './calculatorPrint.js';

export const initCalculator = () => {
  const calculator = document.querySelector('.calculator');

  const resultsPart = createResultsPart();
  const functionalityPart = createFunctionalityPart();

  calculator.appendChild(resultsPart);
  calculator.appendChild(functionalityPart);
};

const createResultsPart = () => {
  const resultsPart = document.createElement('div');
  resultsPart.setAttribute('id', 'results');
  resultsPart.classList.add('results');

  const resultsField = document.createElement('p');
  resultsField.classList.add('resultsField');
  resultsField.classList.add('poppins-semibold');
  resultsField.setAttribute('id', 'resultsField');

  // resultsField.innerText = '2+4+6x8-10';

  resultsPart.appendChild(resultsField);

  return resultsPart;
};

const createFunctionalityPart = () => {
  const functionalityPart = document.createElement('div');
  functionalityPart.classList.add('functionality');

  const resultBtnIndexes = [9, 19, 29, 39, 49];
  const numberButtonIndexes = [
    6, 7, 8, 16, 17, 18, 26, 27, 28, 36, 37, 38, 46, 48,
  ];

  let textsCount = 0;
  for (let i = 0; i < 40; i++) {
    if (i === 37) {
      continue;
    }

    const btn = createButton('type-' + i);

    btn.value = buttonTexts[textsCount];
    btn.innerText = buttonTexts[textsCount];

    textsCount++;

    if (resultBtnIndexes.includes(i)) {
      btn.classList.add('result__btn');
    }

    if (numberButtonIndexes.includes(i)) {
      btn.classList.add('number__btn');
    }

    btn.classList.add('poppins-regular');

    btn.addEventListener('click', () => printValues(btn.value));

    functionalityPart.appendChild(btn);
  }

  return functionalityPart;
};

const createButton = (dataType) => {
  const btn = document.createElement('button');
  btn.classList.add('functionality-btn');
  btn.setAttribute('data-type', dataType);

  return btn;
};
