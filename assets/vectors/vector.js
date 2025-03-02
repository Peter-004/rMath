export class Vector {
    constructor(x, y, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getZ() {
        return this.z;
    }

    toString() {
        let components = [];
        if (this.x !== 0) components.push(`${this.x}i`);
        if (this.y !== 0) components.push(`${this.y < 0 ? '' : '+'}${this.y}j`);
        if (this.z !== 0) components.push(`${this.z < 0 ? '' : '+'}${this.z}k`);
        return components.join('') || '0';
    }

    static parseVector(s) {
        s = s.replace(/\s+/g, '');
        // Use regex to capture numbers with optional negative sign, handling standalone 'i' or 'j'
        const allComp = s.match(/-?\d*\.?\d*[ijk]?/g) || []; 
    
        let xcomp = [];
        let ycomp = [];
        let zcomp = [];
    
        for (let i of allComp) {
            if (i.includes('i')) {
                let newStr = i.replace(/i/, ''); // Remove 'i' or 'j'
    
                // If the imaginary part is just '-' or empty, treat it as -1 or 1 respectively
                if (newStr === "" || newStr === "-") {
                    newStr += "1";
                }
                xcomp.push(newStr);
            } 
            else if(i.includes('j')){
                let newStr = i.replace(/j/, ''); // Remove 'i' or 'j'
    
                // If the imaginary part is just '-' or empty, treat it as -1 or 1 respectively
                if (newStr === "" || newStr === "-") {
                    newStr += "1";
                }
                ycomp.push(newStr);
            }
            else if(i.includes('k')){
                let newStr = i.replace(/k/, ''); // Remove 'i' or 'j'
    
                // If the imaginary part is just '-' or empty, treat it as -1 or 1 respectively
                if (newStr === "" || newStr === "-") {
                    newStr += "1";
                }
                zcomp.push(newStr);
            }
        }
    
        const X = xcomp.reduce((acc, num) => acc + Number(num), 0);
        const Y = ycomp.reduce((acc, num) => acc + Number(num), 0);
        const Z = zcomp.reduce((acc, num) => acc + Number(num), 0);
    
        return new Vector(X,Y,Z);
    }

    static add(s,t){
        const isANumber = typeof s === 'number' || (!isNaN(s) && typeof s === 'string');
        const isBNumber = typeof t === 'number' || (!isNaN(t) && typeof t === 'string');
        if(isANumber && !isBNumber)return t;//If s is a number return the other vector provided not a number 
        if(!isANumber && isBNumber)return s;//If t is a number return the other vector provided not a number 
        return new Vector((s.x + t.x),(s.y+t.y),(s.z+t.z));
    }

    static sub(s,t){
        return new Vector((s.x - t.x),(s.y-t.y),(s.z-t.z));
    }

    static mod(v) {
        return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
    }

    static crossProduct(a, b) {
        const isANumber = typeof a === 'number' || (!isNaN(a) && typeof a === 'string');
        const isBNumber = typeof b === 'number' || (!isNaN(b) && typeof b === 'string');
        if(isANumber && !isBNumber)return new Vector(a*b.x,a*b.y,a*b.z); 
        if(!isANumber && isBNumber)return new Vector(b*a.x,b*a.y,b*a.z); 
        const arnold = a.y * b.z - a.z * b.y;
        const chris = -1 * (a.x * b.z - a.z * b.x);
        const rock = a.x * b.y - a.y * b.x;
        return new Vector(arnold, chris, rock);
    }

    static dotProduct(a, b) {
        const isANumber = typeof a === 'number' || (!isNaN(a) && typeof a === 'string');
        const isBNumber = typeof b === 'number' || (!isNaN(b) && typeof b === 'string');
        if(isANumber && !isBNumber)return new Vector(a*b.x,a*b.y,a*b.z); 
        if(!isANumber && isBNumber)return new Vector(b*a.x,b*a.y,b*a.z);
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }

    static angle(a, b) {
        return (Math.acos(Vector.dotProduct(a, b) / (Vector.mod(a) * Vector.mod(b))) * 180) / Math.PI;
    }

    // Tokenize expression into numbers, operators, and parentheses
    static tokenize(s) {
        const tokenRegex = /(\d+\.?\d*[ij]?|[ij]|[+\-*().x])/g;
        return s.match(tokenRegex);
    }
    
    static evalVector(expr) {
        expr = expr.replace(/\s+/g, ""); // Normalize spaces & j to i
        let tokens = Vector.tokenize(expr); // Convert to tokens
        var i = 0;
        console.log("tokens b4 =",tokens);
        //Handle ()() bracket multiplications and x()
        for(let token of tokens){
            if(token == '(' && i>0 && !['+', '-', '*', 'x', '.'].includes(tokens[i - 1]))tokens.splice(i, 0, 'x');
            i++;
        }
        console.log("tokens =",tokens);
        let postfix = Vector.infixToPostfix(tokens); // Convert infix to postfix
        return Vector.evaluatePostfix(postfix); // Compute result
    }

    // Convert infix notation to postfix using Shunting-Yard Algorithm
    static infixToPostfix(tokens) {
        let outputQueue = [];
        let operatorStack = [];
        let precedence = { "+": 1, "-": 1, "*": 2, "x": 2, ".": 2 };
    
        for (let token of tokens) {
            if (token.includes("i") || token.includes("j") || token.includes("k") || !isNaN(token)) {
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
    static evaluatePostfix(tokens) {
        let stack = [];
    
        for (let token of tokens) {
            if (token.includes("i") || token.includes("j") || token.includes("k") || !isNaN(token)) {
                stack.push(token);
            } else {
                let b = stack.pop();b = (!isNaN(b)) ? b : this.parseVector(b);console.log("b = ",b);
                let a = stack.pop();a = (!isNaN(a)) ? a : this.parseVector(a);console.log("a = ",a);
                if (token === "+") stack.push(this.add(a, b).toString());
                if (token === "-") stack.push(this.sub(a, b).toString());
                if (token === "*" || token === 'x') stack.push(this.crossProduct(a, b).toString());
                if (token === ".") stack.push(this.dotProduct(a, b).toString());
            }
        }
        return stack[0]; // Final ans
    }
}


/*
// Test the methods
const v1 = new Vector(1, 2, 3);
const v2 = new Vector(4, 5, 6);
const v3 = "2i+5j+6-4+9";

console.log(Vector.parseVector(v3).toString());
console.log(v1.toString()); // "1i 2j 3k"
console.log(Vector.mod(v1)); // Magnitude of v1
console.log(Vector.crossProduct(v1, v2).toString()); // Cross product of v1 and v2
console.log(Vector.dotProduct(v1, v2)); // Dot product of v1 and v2
console.log(Vector.angle(v1, v2)); // Angle between v1 and v2 in degrees*/
