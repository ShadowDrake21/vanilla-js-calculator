export const formUI = () => {
  const calculator = document.querySelector('.calculator');

  const resultsPart = document.createElement('div');
  resultsPart.classList.add('results');

  const functionalityPart = document.createElement('div');
  functionalityPart.classList.add('functionality');

  for (let i = 0; i < 50; i++) {
    if (i === 47) {
      continue;
    }
    const btn = document.createElement('button');
    btn.classList.add('functionality-btn');
    btn.setAttribute('data-type', 'type-' + i);
    functionalityPart.appendChild(btn);
  }

  calculator.appendChild(resultsPart);
  calculator.appendChild(functionalityPart);

  console.log(calculator);
};
