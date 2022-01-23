let calculator = {

  read (a, b) {
     this.firstNum = a;
     this.secondNum = b;
  },

  sum() {
     let sum = this.firstNum + this.secondNum;
     return sum;
  },

  mul() {
     let mul = this.firstNum * this.secondNum;
     return mul;
  }
  };

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
