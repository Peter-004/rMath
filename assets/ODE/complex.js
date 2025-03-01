/*
This project was Orignally written by Opemipo Peter Adebayo using Java Programming language
After a while, it was rewritten with the help of AI, in Javascript to allow for ease of use
in web browsers. This is free Open-source, but credit must be given where due. You can find the Java implementation on github.com/Peter-004
 */
export function parseComplex(s) {
    // Use regex to capture numbers with optional negative sign, handling standalone 'i' or 'j'
    const allComp = s.match(/-?\d*\.?\d*[ij]?/g) || [];  

    let real = [];
    let imag = [];

    for (let i of allComp) {
        if (i.includes('i') || i.includes('j')) {
            let newStr = i.replace(/i|j/, ""); // Remove 'i' or 'j'

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

export function formatComplex(x, y) {
    if (y === 0) return x.toFixed(3);
    if (x === 0) return `${y.toFixed(3)}i`;
    return y > 0 ? `${x.toFixed(3)}+${y.toFixed(3)}i` : `${x.toFixed(3)}${y.toFixed(3)}i`;
}

export function polar(s){
    let {real: a, imag: b} = parseComplex(s);
    return `${Math.sqrt((a*a)+(b*b))}<${Math.atan(b/a) * 180/Math.PI}∘`;
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
    return determinant !== 0 ? determinant : "The matrix is non-invertible...No solutions or infinitely many solutions";
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
    return determinant != 0 ? determinant : "The matrix is non-invertible...No solutions or infinitely many solutions";
}

export function kramer(a, x, col) {
    let determinantA = determinantComplex(a);
    let result = "The answer is: ";
    if (a.length !== x.length || a.length !== col.length) {
        return ("Cannot solve with matrix of invalid length");
    }
    else if(determinantA.length>20){
        return determinantA;
    }
    else {
        for (let i = 0; i < x.length; i++) {
            let varName = x[i];
            let kMat = kMatrix(a, col, i);
            let detColSub = determinantComplex(kMat);
            let ans = div(detColSub, determinantA);
            result += `<br>${varName} = ${ans}; Polar : ${polar(ans)}`;
        }
    }
    return result;
}
