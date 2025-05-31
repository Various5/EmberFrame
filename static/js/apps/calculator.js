/**
 * APP_METADATA
 * @name Calculator
 * @icon fas fa-calculator
 * @description Simple Calculator
 * @category Utilities
 * @version 1.0.0
 * @author EmberFrame Team
 * @enabled true
 */

class Calculator {
  static _container = null;
  static _display = null;
  static _buttons = null;

  static createWindow() {
    return {
      title: 'Calculator',
      width: '320px',
      height: '440px',
      content: `
        <div id="calculator" style="display: flex; flex-direction: column; align-items: center; background: #222; color: #fff; font-family: 'Arial', sans-serif; padding: 10px; box-sizing: border-box; height: 100%;">
          <!-- Display -->
          <input id="calc-display" type="text" readonly
                 style="width: 100%; height: 60px; background: #000; color: #0f0; font-size: 28px; text-align: right; padding: 0 10px; border: 2px solid #0f0; border-radius: 4px; box-sizing: border-box; margin-bottom: 10px;" />

          <!-- Buttons Grid -->
          <div id="calc-buttons" style="display: grid; grid-template-columns: repeat(4, 1fr); grid-gap: 8px; width: 100%;">
            <!-- First Row -->
            <button class="calc-btn" data-value="7" style="height: 60px; font-size: 20px; background: #333; border: 1px solid #555; border-radius: 4px; color: #fff; cursor: pointer;">7</button>
            <button class="calc-btn" data-value="8" style="height: 60px; font-size: 20px; background: #333; border: 1px solid #555; border-radius: 4px; color: #fff; cursor: pointer;">8</button>
            <button class="calc-btn" data-value="9" style="height: 60px; font-size: 20px; background: #333; border: 1px solid #555; border-radius: 4px; color: #fff; cursor: pointer;">9</button>
            <button class="calc-btn" data-value="/" style="height: 60px; font-size: 20px; background: #ff9500; border: 1px solid #d07a00; border-radius: 4px; color: #fff; cursor: pointer;">÷</button>

            <!-- Second Row -->
            <button class="calc-btn" data-value="4" style="height: 60px; font-size: 20px; background: #333; border: 1px solid #555; border-radius: 4px; color: #fff; cursor: pointer;">4</button>
            <button class="calc-btn" data-value="5" style="height: 60px; font-size: 20px; background: #333; border: 1px solid #555; border-radius: 4px; color: #fff; cursor: pointer;">5</button>
            <button class="calc-btn" data-value="6" style="height: 60px; font-size: 20px; background: #333; border: 1px solid #555; border-radius: 4px; color: #fff; cursor: pointer;">6</button>
            <button class="calc-btn" data-value="*" style="height: 60px; font-size: 20px; background: #ff9500; border: 1px solid #d07a00; border-radius: 4px; color: #fff; cursor: pointer;">×</button>

            <!-- Third Row -->
            <button class="calc-btn" data-value="1" style="height: 60px; font-size: 20px; background: #333; border: 1px solid #555; border-radius: 4px; color: #fff; cursor: pointer;">1</button>
            <button class="calc-btn" data-value="2" style="height: 60px; font-size: 20px; background: #333; border: 1px solid #555; border-radius: 4px; color: #fff; cursor: pointer;">2</button>
            <button class="calc-btn" data-value="3" style="height: 60px; font-size: 20px; background: #333; border: 1px solid #555; border-radius: 4px; color: #fff; cursor: pointer;">3</button>
            <button class="calc-btn" data-value="-" style="height: 60px; font-size: 20px; background: #ff9500; border: 1px solid #d07a00; border-radius: 4px; color: #fff; cursor: pointer;">−</button>

            <!-- Fourth Row -->
            <button class="calc-btn" data-value="0" style="grid-column: span 2; height: 60px; font-size: 20px; background: #333; border: 1px solid #555; border-radius: 4px; color: #fff; cursor: pointer;">0</button>
            <button class="calc-btn" data-value="." style="height: 60px; font-size: 20px; background: #333; border: 1px solid #555; border-radius: 4px; color: #fff; cursor: pointer;">.</button>
            <button class="calc-btn" data-value="+" style="height: 60px; font-size: 20px; background: #ff9500; border: 1px solid #d07a00; border-radius: 4px; color: #fff; cursor: pointer;">+</button>

            <!-- Fifth Row -->
            <button id="calc-clear" style="grid-column: span 2; height: 60px; font-size: 20px; background: #a00; border: 1px solid #700; border-radius: 4px; color: #fff; cursor: pointer;">C</button>
            <button id="calc-back" style="height: 60px; font-size: 20px; background: #a00; border: 1px solid #700; border-radius: 4px; color: #fff; cursor: pointer;">⌫</button>
            <button id="calc-equals" style="height: 60px; font-size: 20px; background: #0a0; border: 1px solid #070; border-radius: 4px; color: #fff; cursor: pointer;">=</button>
          </div>
        </div>
      `,
      onInit: (container) => {
        Calculator._container = container;
        Calculator._display = container.querySelector('#calc-display');
        Calculator._buttons = Array.from(container.querySelectorAll('.calc-btn'));
        Calculator._setupEventListeners();
      },
      onDestroy: () => {
        Calculator._removeEventListeners();
      }
    };
  }

  static _setupEventListeners() {
    // Digit and operator buttons
    Calculator._buttons.forEach(btn => {
      btn.addEventListener('click', Calculator._onButtonClick);
    });

    // Clear, Backspace, Equals
    const clearBtn = Calculator._container.querySelector('#calc-clear');
    const backBtn = Calculator._container.querySelector('#calc-back');
    const equalsBtn = Calculator._container.querySelector('#calc-equals');

    clearBtn.addEventListener('click', Calculator._clearDisplay);
    backBtn.addEventListener('click', Calculator._backspace);
    equalsBtn.addEventListener('click', Calculator._evaluateExpression);

    // Keyboard support
    Calculator._keyHandler = Calculator._onKeyDown.bind(Calculator);
    window.addEventListener('keydown', Calculator._keyHandler);
  }

  static _removeEventListeners() {
    Calculator._buttons.forEach(btn => {
      btn.removeEventListener('click', Calculator._onButtonClick);
    });
    const clearBtn = Calculator._container.querySelector('#calc-clear');
    const backBtn = Calculator._container.querySelector('#calc-back');
    const equalsBtn = Calculator._container.querySelector('#calc-equals');

    clearBtn.removeEventListener('click', Calculator._clearDisplay);
    backBtn.removeEventListener('click', Calculator._backspace);
    equalsBtn.removeEventListener('click', Calculator._evaluateExpression);

    window.removeEventListener('keydown', Calculator._keyHandler);
  }

  static _onButtonClick(e) {
    const value = e.currentTarget.getAttribute('data-value');
    Calculator._appendToDisplay(value);
  }

  static _onKeyDown(e) {
    const key = e.key;
    if ((key >= '0' && key <= '9') || key === '.') {
      Calculator._appendToDisplay(key);
      e.preventDefault();
    } else if (['+', '-', '*', '/'].includes(key)) {
      Calculator._appendToDisplay(key);
      e.preventDefault();
    } else if (key === 'Enter' || key === '=') {
      Calculator._evaluateExpression();
      e.preventDefault();
    } else if (key === 'Backspace') {
      Calculator._backspace();
      e.preventDefault();
    } else if (key.toLowerCase() === 'c') {
      Calculator._clearDisplay();
      e.preventDefault();
    }
  }

  static _appendToDisplay(text) {
    // Prevent multiple operators in a row
    const disp = Calculator._display;
    const current = disp.value;
    const lastChar = current.slice(-1);
    if ('+-*/'.includes(text) && (current === '' || '+-*/'.includes(lastChar))) {
      return;
    }
    disp.value = current + text;
  }

  static _clearDisplay() {
    Calculator._display.value = '';
  }

  static _backspace() {
    const disp = Calculator._display;
    disp.value = disp.value.slice(0, -1);
  }

  static _evaluateExpression() {
    const disp = Calculator._display;
    const expr = disp.value;
    if (!expr) return;

    try {
      // Safely evaluate arithmetic expression
      // eslint-disable-next-line no-new-func
      const result = Function(`"use strict"; return (${expr});`)();
      if (result === Infinity || result === -Infinity || isNaN(result)) {
        disp.value = 'Error';
      } else {
        disp.value = String(result);
      }
    } catch {
      disp.value = 'Error';
    }
  }
}

// Export for WindowManager
window.Calculator = Calculator;
