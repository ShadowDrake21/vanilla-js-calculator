export const formUI = () => {
  const calculator = document.querySelector('.calculator');

  const resultsPart = document.createElement('div');
  resultsPart.classList.add('results');

  const functionalityPart = document.createElement('div');
  functionalityPart.classList.add('functionality');

  const resultBtnIndexes = [9, 19, 29, 39, 49];
  const numberButtonIndexes = [16, 17, 18, 26, 27, 28, 36, 37, 38, 46, 48];

  for (let i = 0; i < 50; i++) {
    if (i === 47) {
      continue;
    }

    const btn = createButton('type-' + i);

    if (resultBtnIndexes.includes(i)) {
      btn.classList.add('result__btn');
    }

    if (numberButtonIndexes.includes(i)) {
      btn.classList.add('number__btn');
    }

    functionalityPart.appendChild(btn);
  }

  calculator.appendChild(resultsPart);
  calculator.appendChild(functionalityPart);

  console.log(calculator);
};

const createButton = (dataType) => {
  const btn = document.createElement('button');
  btn.classList.add('functionality-btn');
  btn.setAttribute('data-type', dataType);
  // btn.addEventListener('click', () => {
  //   console.log(btn.attributes.getNamedItem('data-type'));
  // });

  return btn;
};
