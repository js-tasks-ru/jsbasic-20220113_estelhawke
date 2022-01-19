function factorial(n) {
    let factorialResult = 1;
    for (n; n>0; --n) {
      factorialResult = factorialResult * n;
    };
    return factorialResult;
  }

