import { initCalculator } from './modules/calculatorInit.js';
import { onBackspace, printValues } from './modules/calculatorPrint.js';

initCalculator();

document.addEventListener('keydown', (e) => {
  if (e.key === 'Backspace') {
    onBackspace();
  } else {
    printValues(e.key);
  }
});
