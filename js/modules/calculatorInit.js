import { buttonTexts } from '../../static/buttons.js';

export const initCalculator = () => {
  const calculator = document.querySelector('.calculator');

  const resultsPart = createResultsPart();
  const functionalityPart = createFunctionalityPart();

  calculator.appendChild(resultsPart);
  calculator.appendChild(functionalityPart);
};

const createResultsPart = () => {
  const resultsPart = document.createElement('div');
  resultsPart.classList.add('results');

  return resultsPart;
};

const createFunctionalityPart = () => {
  const functionalityPart = document.createElement('div');
  functionalityPart.classList.add('functionality');

  const resultBtnIndexes = [9, 19, 29, 39, 49];
  const numberButtonIndexes = [16, 17, 18, 26, 27, 28, 36, 37, 38, 46, 48];

  let textsCount = 0;
  for (let i = 0; i < 50; i++) {
    if (i === 47) {
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
