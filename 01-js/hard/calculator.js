/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a 'number' and adds it to the result
    - subtract: takes a 'number' and subtracts it from the result
    - multiply: takes a 'number' and multiply it to the result
    - divide: takes a 'number' and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note:
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
  - `npm run test-calculator`
*/

class Calculator {
  constructor() {
    this.result = 0;
  }
  add(num) {
    if (typeof num != "number") {
      throw new Error("Given input is not a 'number'");
    }
    this.result += num;
    return this.result;
  }
  subtract(num) {
    if (typeof num != "number") {
      throw new Error("Given input is not a 'number'");
    }
    this.result -= num;
    return this.result;
  }
  multiply(num) {
    if (typeof num != "number") {
      throw new Error("Given input is not a 'number'");
    }
    this.result *= num;
    return this.result;
  }
  divide(num) {
    if (typeof num != "number") {
      throw new Error("Given input is not a 'number'");
    }
    this.result /= num;
    return this.result;
  }
  clear() {
    this.result = 0;
  }
  getResult() {
    return this.result;
  }
  calculate(expression) {
    // console.log(expression);
    expression = this.stripAllSpaces(expression);
    // console.log("After stripping extra spaces.....     " + expression);
    let l = 0,
      r = expression.length - 1;
    let bracketExp = {};
    while (l < r) {
      if (expression[l] === "(" && expression[r] === ")") {
        bracketExp[l] = r;
        console.log(bracketExp[l]);
        l++;
        r--;
      } else if (expression[l] === "(") {
        r--;
      } else if (expression[r] === ")") {
        l++;
      } else {
        l++;
        r--;
      }
    }
    // console.log("Brackets initially:  " + bracketExp);
    return this.solve(expression, 0, expression.length, bracketExp);
  }
  stripAllSpaces(expression) {
    let modifiedExpression = "";
    for (let i = 0; i < expression.length; i++) {
      if (expression[i] == " ") {
        continue;
      }
      modifiedExpression += expression[i];
    }
    return modifiedExpression;
  }

  solve(expression, start, end, bracketExp) {
    // console.log("Expression in solve:  " + expression.substring(start, end));
    // console.log("Brackets in solve:  " + bracketExp);

    let pt = start;
    let res = "";
    while (pt < end) {
      if (expression[pt] == "(") {
        let closingBracket = bracketExp[pt];
        res += this.solve(expression, pt + 1, closingBracket, bracketExp);
        pt = closingBracket;
      } else {
        res += expression[pt];
      }
      pt++;
    }
    this.checkValidExpression(res);
    for (let i = 0; i < 100; i++) {
      res = this.resolveOperation(res, "/");
      res = this.resolveOperation(res, "*");
      res = this.resolveOperation(res, "+");
      res = this.resolveOperation(res, "-");
    }
    this.result = Number(res);
    return res;
  }
  checkValidExpression(exp) {
    let ops = { "+": 0, "-": 1, "*": 2, "/": 3, ".": 4 };
    for (let i = 0; i < exp.length; i++) {
      if (exp[i] in ops || (exp[i] >= "0" && exp[i] <= "9")) {
        continue;
      } else {
        // console.log(exp[i] in ops);
        throw Error("Not a valid expression: " + exp);
      }
    }
  }
  resolveOperation(exp, op) {
    let pt = 0;
    let finalexp = "";
    let ops = { "+": 0, "-": 1, "*": 2, "/": 3 };
    // console.log("Resolving operation:     " + exp + " op:     " + op);
    while (pt < exp.length) {
      let temp = "";
      let num1 = "";
      while (pt < exp.length && !(exp[pt] in ops)) {
        num1 += exp[pt];
        pt++;
      }
      if (pt < exp.length - 1 && exp[pt] === op) {
        let num2 = "";
        pt++;
        while (pt < exp.length && !(exp[pt] in ops)) {
          // console.log(num2);
          num2 += exp[pt];
          pt++;
        }
        // console.log("Num1: " + num1);
        // console.log("Num2: " + num2);
        num1 = Number(num1);
        num2 = Number(num2);
        if (op == "/") {
          let res = num1 / num2;
          finalexp += res.toString();
        } else if (op == "*") {
          let res = num1 * num2;
          finalexp += res.toString();
        } else if (op == "+") {
          let res = num1 + num2;
          finalexp += res.toString();
        } else if (op == "-") {
          let res = num1 - num2;
          // console.log(res);
          finalexp += res.toString();
        }
      } else {
        finalexp += num1;
      }
      if (pt < exp.length) {
        finalexp += exp[pt];
        pt++;
      }
    }
    return finalexp;
  }
}
// console.log(
//   new Calculator().calculate("10 +   2 *    (   6 - (4 + 1) / 2) + 7"),
// );
console.log(new Calculator().calculate("2+3*4"));
module.exports = Calculator;
