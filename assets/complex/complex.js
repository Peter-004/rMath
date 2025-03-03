/*
This project was Orignally written by Opemipo Peter Adebayo using Java Programming language
After a while, it was rewritten with the help of AI, in Javascript to allow for ease of use
in web browsers. This is free Open-source, but credit must be given where due. You can find the Java implementation on github.com/Peter-004
 */

export function parseComplex(s) {
    s = s.replace(/j/g, 'i').replace(/\s+/g, '');
    // Use regex to capture numbers with optional negative sign, handling standalone 'i' or 'j'
    const allComp = s.match(/-?\d*\.?\d*[i]?/g) || [];  

    let real = [];
    let imag = [];

    for (let i of allComp) {
        if (i.includes('i')) {
            let newStr = i.replace(/i/, ''); // Remove 'i' or 'j'

            // If the imaginary part is just '-' or empty, treat it as -1 or 1 respectively
            if (newStr === "" || newStr === "-") {
                newStr += "1";
            }
            imag.push(newStr);
        } else {
            real.push(i);
        }
    }

    const RE = real.reduce((acc, num) => acc + Number(num), 0);
    const IM = imag.reduce((acc, num) => acc + Number(num), 0);

    return { real: RE, imag: IM };
}

export function evalComplex(expr) {
    expr = expr.replace(/\s+/g, "").replace(/j/g, "i"); // Normalize spaces & j to i
    let tokens = tokenize(expr); // Convert to tokens
    var i = 0;
    //Handle ()() bracket multiplications and x()
    for(let token of tokens){
        if(token == '(' && i>0 && !['+', '-', '*', '/'].includes(tokens[i - 1]))tokens.splice(i, 0, '*');
        i++;
    }
    //console.log("tokens =",tokens);debugging
    let postfix = infixToPostfix(tokens); // Convert infix to postfix
    return evaluatePostfix(postfix); // Compute result
}

// Tokenize expression into numbers, operators, and parentheses
function tokenize(s) {
    const tokenRegex = /(\d+\.?\d*i?|i|[+\-*/()])/g;
    return s.match(tokenRegex);
}
// Convert infix notation to postfix using Shunting-Yard Algorithm
function infixToPostfix(tokens) {
    let outputQueue = [];
    let operatorStack = [];
    let precedence = { "+": 1, "-": 1, "*": 2, "/": 2 };

    for (let token of tokens) {
        if (token.includes("i") || !isNaN(token)) {
            outputQueue.push(token);
        } else if (token in precedence) {
            while (operatorStack.length && precedence[operatorStack.at(-1)] >= precedence[token]) {
                outputQueue.push(operatorStack.pop());
            }
            operatorStack.push(token);
        } else if (token === "(") {
            operatorStack.push(token);
        } else if (token === ")") {
            while (operatorStack.length && operatorStack.at(-1) !== "(") {
                outputQueue.push(operatorStack.pop());
            }
            operatorStack.pop();
        }
    }

    while (operatorStack.length) outputQueue.push(operatorStack.pop());
    return outputQueue;
}

// Evaluate the postfix expression
function evaluatePostfix(tokens) {
    let stack = [];

    for (let token of tokens) {
        if (token.includes("i") || !isNaN(token)) {
            stack.push(token);
        } else {
            let b = stack.pop();
            let a = stack.pop();
            if (token === "+") stack.push(add(a, b));
            if (token === "-") stack.push(sub(a, b));
            if (token === "*") stack.push(product(a, b));
            if (token === "/") stack.push(div(a, b));
        }
    }
    return stack[0]; // Final ans
}

export function formatComplex(x, y) {
    if (y === 0) return x.toFixed(3);
    if (x === 0) return `${y.toFixed(3)}i`;
    return y > 0 ? `${x.toFixed(3)}+${y.toFixed(3)}i` : `${x.toFixed(3)}${y.toFixed(3)}i`;
}

export function polar(s){
    let {real: a, imag: b} = parseComplex(s);
    if(a == 0 && b == 0)return `0<0∘`;
    return `${Math.sqrt((a*a)+(b*b))}<${Math.atan(b/a) * 180/Math.PI}∘`;//Incorrect implementation
}

export function add(s, t) {
    let { real: a, imag: b } = parseComplex(s);
    let { real: c, imag: d } = parseComplex(t);
    return formatComplex(a + c, b + d);
}

export function sub(s, t) {
    let { real: a, imag: b } = parseComplex(s);
    let { real: c, imag: d } = parseComplex(t);
    return formatComplex(a - c, b - d);
}

export function product(s, t) {
    let { real: a, imag: b } = parseComplex(s);
    let { real: c, imag: d } = parseComplex(t);
    return formatComplex(a * c - b * d, a * d + b * c);
}

export function div(s, t) {
    let { real: a, imag: b } = parseComplex(s);
    let { real: c, imag: d } = parseComplex(t);
    let z = c * c + d * d;
    let x = (a * c + b * d) / z;
    let y = (b * c - a * d) / z;
    return formatComplex(x, y);
}

export function disp(matrix) {
    if (Array.isArray(matrix[0])) {
        matrix.forEach(row => console.log(JSON.stringify(row)));
    } else {
        matrix.forEach(item => console.log(item));
    }
    console.log("-----------------------------------------------------");
}

export function coFactor(matrix, row, col) {
    let n = matrix.length;
    let coFact = [];
    for (let i = 0; i < n; i++) {
        if (i !== row) {
            let newRow = [];
            for (let j = 0; j < n; j++) {
                if (j !== col) {
                    newRow.push(matrix[i][j]);
                }
            }
            coFact.push(newRow);
        }
    }
    return coFact;
}

export function determinant(matrix) {
    if (matrix.length === 2) {
        return (matrix[0][0] * matrix[1][1]) - (matrix[0][1] * matrix[1][0]);
    }
    let determinant = 0;
    let sign = 1;
    for (let col = 0; col < matrix.length; col++) {
        determinant += sign * matrix[0][col] * determinant(coFactor(matrix, 0, col));
        sign = -sign;
    }
    return determinant;
}

export function kMatrix(a, b, col) {
    let len = a.length;
    let kMat = a.map(row => [...row]);
    for (let i = 0; i < len; i++) {
        kMat[i][col] = b[i];
    }
    return kMat;
}

export function determinantComplex(matrix) {
    if (matrix.length === 2) {
        return sub(product(matrix[0][0], matrix[1][1]), product(matrix[0][1], matrix[1][0]));
    }
    let determinant = "0";
    let sign = "1";
    for (let col = 0; col < matrix.length; col++) {
        let signMultiply = product(sign, matrix[0][col]);
        let detCFactor = determinantComplex(coFactor(matrix, 0, col));
        let productVal = product(signMultiply, detCFactor);
        determinant = add(determinant, productVal);
        sign = product("-1", sign);
    }
    return determinant;
}

export function kramer(a, x, col) {
    let determinantA = determinantComplex(a);
    let result = "The solution is: ";
    if (a.length !== x.length || a.length !== col.length) {
        return ("Cannot solve with matrix of invalid length");
    }
    else if(determinantA == 0){//Incomplete....edge cases like 0.0003 since it formats in 3dp
        return "The matrix A is non-invertible...No solutions or infinitely many solutions";
    }
    else {
        for (let i = 0; i < x.length; i++) {
            let varName = x[i];
            let kMat = kMatrix(a, col, i);
            let detColSub = determinantComplex(kMat);
            let ans = div(detColSub, determinantA);
            result += `<br>${varName} = ${ans}; Polar : ${polar(ans)}`;//ES module or HTML solution
        }
    }
    return result;
}
