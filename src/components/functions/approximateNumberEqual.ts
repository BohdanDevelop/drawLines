function approximateNumberEquals(num1: any, num2: any) {
  if (parseInt(String(num1 / 10)) === parseInt(String(num2 / 10))) {
    if (Math.abs((num1 % 10) - (num2 % 10)) < 3) return true;
  }
  if (
    Math.abs(parseInt(String(num1 / 10)) - parseInt(String(num2 / 10))) === 1
  ) {
    if (num1 % 10 === 0 && num2 % 10 === 9) return true;
    if (num2 % 10 === 0 && num1 % 10 === 9) return true;
    if (num1 % 10 === 0 && num2 % 10 === 8) return true;
    if (num2 % 10 === 0 && num1 % 10 === 8) return true;
  }
}

export default approximateNumberEquals;
