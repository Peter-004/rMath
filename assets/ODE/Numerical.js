//Ikr, who needs all these lines of code. I was approaching deadline so i couldn't think. Java didn't work out cuz i need a script engine
//to evaluate a String of equation, JS internal scriptengine didn't work, and I couldn't find an external library. This works though,
//don't ask why if stuff works.
//the equation should be written in the form("y'(x)={f(x,y)}").04/2023

//numSelected = sukuna.length;
//Use the JS engine in Google chrome to run it Please. Thanks

/**
 * @author Opemipo Adebayo Peter
 * @param {*} equation 
 * @param {*} h 
 * @param {*} x0 
 * @param {*} y0 
 * @param {*} xn 
 * @returns a list of points of solutions
 */
export function euler(equation, h,x0,y0,xn){
    let answer = [];
    let equalIndex = 0;
    let dependent = equation.charAt(0);
    let independent = 'x';
    const map = new Map();
    map.set(dependent,y0);
    let newEquation = "";
    let changed = false;
    //map.put(independent,x0);
    //yn+1 = yn + hy'n
    //loop the String of equation to find dependent,independent and reformat the equation
    for(let i = 0;i<equation.length;i++){
        let force = equation.charAt(i);
        if(force === '(' && !changed){
            independent = equation.charAt(i+1);
            map.set(independent,x0);
            changed = true;
        }
        if(force === '='){
            //save the equalIndex for the while loop to change newEquation
            equalIndex = i;
            //the eval is in terms of numbers, so create a new equation in terms of numbers not x,and ys
            for(let j = i+1;j<equation.length;j++){
                if(map.has(equation.charAt(j))){
                    newEquation += map.get(equation.charAt(j));
                }
                else{
                    newEquation += equation.charAt(j);
                }
            }
            break;
        }
    }
    while(x0 < xn){
        let yValues = [];
        //evaluate the new Equation
        /* eslint-disable strict */
        let fxy = eval(newEquation);
        y0 = y0 + h*(fxy);
        /* eslint-enable strict */
        //round to 2 decimal places
        //y0 = y0*100;
        //y0 = Math.round(y0);
        //y0 = y0 /100;
        x0 += h;
        map.set(dependent,y0);
        map.set(independent,x0);
        yValues.push(x0);
        yValues.push(y0);
        answer.push(yValues);
        newEquation = "";
        //the eval is in terms of numbers, so create a new equation in terms of numbers not x,and ys
        for(let j = equalIndex+1;j<equation.length;j++){
            if(map.has(equation.charAt(j))){
                newEquation += map.get(equation.charAt(j));
            }
            else{
                newEquation += equation.charAt(j);
            }
        }
    }
    return answer;
}

export function improvedEuler(equation, h,x0,y0,xn){
    let answer = [];
    let equalIndex = 0;
    let dependent = equation.charAt(0);
    let independent = 'x';
    const k1map = new Map();
    const k2map = new Map();
    k1map.set(dependent,y0);
    let k1Equation = "";
    let k2Equation = "";
    let changed = false;
    //map.put(independent,x0);
    //yn+1 = yn + hy'n
    //loop the String of equation to find dependent,independent and reformat the equation
    for(let i = 0;i<equation.length;i++){
        let force = equation.charAt(i);
        if(force === '(' && !changed){
            independent = equation.charAt(i+1);
            k1map.set(independent,x0);
            changed = true;
        }
        if(force === '='){
            //save the equalIndex for the while loop to change newEquation
            equalIndex = i;
            //the eval is in terms of numbers, so create a new equation in terms of numbers not x,and ys
            for(let j = i+1;j<equation.length;j++){
                if(k1map.has(equation.charAt(j))){
                    k1Equation += k1map.get(equation.charAt(j));
                }
                else{
                    k1Equation += equation.charAt(j);
                }
            }
            break;
        }
    }
    while(x0 < xn){
        let yValues = [];
        //evaluate the new Equation
        let k1 = eval(k1Equation);
        x0 += h;
        let u = y0 + h * (k1);
        k2map.set(dependent,u);
        k2map.set(independent,x0);
        for(let j = equalIndex+1;j<equation.length;j++){
            if(k2map.has(equation.charAt(j))){
                k2Equation += k2map.get(equation.charAt(j));
            }
            else{
                k2Equation += equation.charAt(j);
            }
        }
        let k2 = eval(k2Equation);
        y0 = y0 + (h/2)*(k1+k2);
        k1map.set(dependent,y0);
        k1map.set(independent,x0);
        //round to 2 decimal places
        //y0 = y0*100;
        //y0 = Math.round(y0);
        //y0 = y0 /100;
        yValues.push(x0);
        yValues.push(y0);
        answer.push(yValues);
        k1Equation = "";
        k2Equation = "";

        //the eval is in terms of numbers, so create a new equation in terms of numbers not x,and ys
        for(let j = equalIndex+1;j<equation.length;j++){
            if(k1map.has(equation.charAt(j))){
                k1Equation += k1map.get(equation.charAt(j));
            }
            else{
                k1Equation += equation.charAt(j);
            }
        }
    }
    return answer;
}

export function rungeKutta(equation, h,x0,y0,xn){
    let answer = [];
    let equalIndex = 0;
    let dependent = equation.charAt(0);
    let independent = 'x';
    const k1map = new Map();
    const k2map = new Map();
    const k3map = new Map();
    const k4map = new Map();
    k1map.set(dependent,y0);
    let k1Equation = "";
    let k2Equation = "";
    let k3Equation = "";
    let k4Equation = "";
    let changed = false;
    //map.put(independent,x0);
    //yn+1 = yn + hy'n
    //loop the String of equation to find dependent,independent and reformat the equation
    for(let i = 0;i<equation.length;i++){
        let force = equation.charAt(i);
        if(force === '(' && !changed){
            independent = equation.charAt(i+1);
            k1map.set(independent,x0);
            changed = true;
        }
        if(force === '='){
            //save the equalIndex for the while loop to change newEquation
            equalIndex = i;
            //the eval is in terms of numbers, so create a new equation in terms of numbers not x,and ys
            for(let j = i+1;j<equation.length;j++){
                if(k1map.has(equation.charAt(j))){
                    k1Equation += k1map.get(equation.charAt(j));
                }
                else{
                    k1Equation += equation.charAt(j);
                }
            }
            break;
        }
    }
    while(x0 < xn){
        let yValues = [];
        //evaluate the new Equation
        let k1 = eval(k1Equation);
        k2map.set(dependent,y0+(0.5*h*k1));
        k2map.set(independent,x0+(0.5*h));
        for(let j = equalIndex+1;j<equation.length;j++){
            if(k2map.has(equation.charAt(j))){
                k2Equation += k2map.get(equation.charAt(j));
            }
            else{
                k2Equation += equation.charAt(j);
            }
        }
        let k2 = eval(k2Equation);
        k3map.set(dependent,y0+(0.5*h*k2));
        k3map.set(independent,x0+(0.5*h));
        for(let j = equalIndex+1;j<equation.length;j++){
            if(k3map.has(equation.charAt(j))){
                k3Equation += k3map.get(equation.charAt(j));
            }
            else{
                k3Equation += equation.charAt(j);
            }
        }
        let k3 = eval(k3Equation);
        x0 += h;
        k4map.set(dependent,y0+(h*k3));
        k4map.set(independent,x0);
        for(let j = equalIndex+1;j<equation.length;j++){
            if(k4map.has(equation.charAt(j))){
                k4Equation += k4map.get(equation.charAt(j));
            }
            else{
                k4Equation += equation.charAt(j);
            }
        }
        let k4 = eval(k4Equation);
        y0 += (h/6)*(k1+(2*(k2+k3))+k4);
        k1map.set(dependent,y0);
        k1map.set(independent,x0);
        //round to 2 decimal places for Java
        //y0 = y0*100;
        //y0 = Math.round(y0);
        //y0 = y0 /100;
        yValues.push(x0);
        yValues.push(y0);
        answer.push(yValues);
        k1Equation = "";
        k2Equation = "";
        k3Equation = "";
        k4Equation = "";

        //the eval is in terms of numbers, so create a new equation in terms of numbers not x,and ys
        for(let j = equalIndex+1;j<equation.length;j++){
            if(k1map.has(equation.charAt(j))){
                k1Equation += k1map.get(equation.charAt(j));
            }
            else{
                k1Equation += equation.charAt(j);
            }
        }
    }
    return answer;
}
//console.log(euler("y'(x)=x*y",0.2,0,5,10));
//The equation should be written in the form "y'(x)=f(x,y)" The ' is redundant, there is no coefficient multiplication. 
//3x^2 is "3*(x**2)" not "3(x^2)". Worst case scenario, memory storage is exceeded.