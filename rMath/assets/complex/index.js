import * as Complex from './complex.js';

let btn_matrix = document.getElementById('generateMatrix');
let matA = document.getElementById('matrixA');
let matX = document.getElementById('matrixX');
let matB = document.getElementById('matrixB');

btn_matrix.addEventListener("click", ()=>{
    let equations = document.getElementById('eqs');
    const n = equations.value;
    if(n<2 || n>20)alert("Between 2 and 20");
    else{
      generateMatrix(n);
    }
});
document.querySelectorAll(".solve").forEach(elem => elem.addEventListener("click", ()=>solve(elem.getAttribute("for"))));

function generateMatrix(n){
    matA.innerHTML = '';
    matB.innerHTML = '';
    matX.innerHTML = '';
    const col = `<div class="matrixcol"></div>`;
    matX.insertAdjacentHTML('beforeend',col);
    matB.insertAdjacentHTML('beforeend',col);
    
  
  // Create the grid by generating rows and columns
  for (let i = 0; i < n; i++) {
    const row = `<div class="matrixrow" id="matrixrow${i}"></div>`;//document.createElement('div');
    matA.insertAdjacentHTML('beforeend',row);
    const colInput = `<input type="text" class="cell-input" id="x${i}">`;//document.createElement('input');

    document.querySelectorAll(".matrixcol").forEach(el => el.insertAdjacentHTML('beforeend', colInput));
//col.appendChild(colInput);
    for (let j = 0; j < n; j++) { 
      const input = `<input type="text" class="cell-input" id="a${i}${j}">`;//document.createElement('input'); 
      document.getElementById(`matrixrow${i}`).insertAdjacentHTML('beforeend',input);
    }
  }
}

function solve(operation){
  var parsival, ans;
  switch(operation){
    case "add":
      parsival = Complex.parseComplex(document.getElementById("adder").value);
      console.log(parsival);
      ans = Complex.formatComplex(parsival.real,parsival.imag);
      document.getElementById(operation).insertAdjacentHTML('beforeend', `<h5>The answer to ${document.getElementById("adder").value} is: ${ans }</h2>`);
    break;
    case "mult":
      parsival = Complex.parseComplex(document.getElementById("multer").value);
      console.log(parsival);
      ans = Complex.formatComplex(parsival.real,parsival.imag);
      document.getElementById(operation).insertAdjacentHTML('beforeend', `<h5>The answer to ${document.getElementById("multer").value} is: ${ans }</h2>`);
    break;
    case "equation":
      //Your Contribution here:

      document.getElementById(operation).insertAdjacentHTML('beforeend', `<h5>Comming Soon. Please contribute on Git</h2>`);
    break;
    case "simultaneous":
      let matrixA = [];
      let yn = Array.from(matA.querySelectorAll("input")).map(input => String(input.value));
      let matrixX = Array.from(matX.querySelectorAll("input")).map(input => String(input.value));
      let matrixB = Array.from(matB.querySelectorAll("input")).map(input => String(input.value));
      let a = yn.length;
      let n = Math.sqrt(a);
    for (let i = 0; i < n; i++) {
        matrixA.push(yn.slice(i * n, (i + 1) * n));
    }
    console.log("x = ", matrixX);
    console.log("B = ", matrixB);
    ans = Complex.kramer(matrixA,matrixX,matrixB);
    let lastH3 = document.getElementById(operation).querySelector("h3:last-of-type"); // Select last <h3> inside div

    if (lastH3)lastH3.remove(); 

    document.getElementById(operation).insertAdjacentHTML('beforeend', `<h3>${ans}</h3>`);
    break;
    default:
    console.log(`Sorry, we are out of.`);
  };
}