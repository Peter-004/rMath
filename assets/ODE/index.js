import * as Numerical from './Numerical.js';

//console.log(Numerical.euler("y'(x)=xy",0.2,0,5,10));
document.querySelectorAll(".solve").forEach(elem => elem.addEventListener("click", ()=>solve(elem.getAttribute("for"))));

function solve(operation){
  let del, ans, q, h, x0, y0, xn, result;
  result = '';
  switch(operation){
    case "euler":
      del = document.getElementById(operation).getElementsByTagName('h5');
      Array.from(del).forEach(h5 => {
        h5.remove(); // Remove each <h5> element
      });
      // Select all <h5> elements within the div
      q = document.getElementById("eulerer").value;
      h = Number(document.getElementById('e-h').value);
      x0 = Number(document.getElementById('e-x0').value);
      y0 = Number(document.getElementById('e-y0').value);
      xn = Number(document.getElementById('e-xn').value);
      ans = Numerical.euler(q,h,x0,y0,xn);
      var i = 0;
      for(let pt of ans){
        i++;
        result += `<br>${i}. y(${pt[0]}) = ${pt[1]}\n`;
      }
      document.getElementById(operation).insertAdjacentHTML('beforeend', `<h5>The solution to ${q} is: ${result}</h5>`);
    break;
    case "katta":
      del = document.getElementById(operation).getElementsByTagName('h5');
      Array.from(del).forEach(h5 => {
        h5.remove(); // Remove each <h5> element
      });
      // Select all <h5> elements within the div
      q = document.getElementById("kattaer").value;
      h = Number(document.getElementById('k-h').value);
      x0 = Number(document.getElementById('k-x0').value);
      y0 = Number(document.getElementById('k-y0').value);
      xn = Number(document.getElementById('k-xn').value);
      ans = Numerical.rungeKutta(q,h,x0,y0,xn);
      var i = 0;
      for(let pt of ans){
        i++;
        result += `<br>${i}. y(${pt[0]}) = ${pt[1]}\n`;
      }
      document.getElementById(operation).insertAdjacentHTML('beforeend', `<h5>The solution to ${q} is: ${result}</h5>`);
    break;
    case "i-euler":
      del = document.getElementById(operation).getElementsByTagName('h5');
      Array.from(del).forEach(h5 => {
        h5.remove(); // Remove each <h5> element
      });
      // Select all <h5> elements within the div
      q = document.getElementById("i-eulerer").value;
      h = Number(document.getElementById('i-h').value);
      x0 = Number(document.getElementById('i-x0').value);
      y0 = Number(document.getElementById('i-y0').value);
      xn = Number(document.getElementById('i-xn').value);
      ans = Numerical.improvedEuler(q,h,x0,y0,xn);var i = 0;
      for(let pt of ans){
        i++;
        result += `<br>${i}. y(${pt[0]}) = ${pt[1]}\n`;
      }
      document.getElementById(operation).insertAdjacentHTML('beforeend', `<h5>The solution to ${q} is: ${result}</h5>`);
    break;
    default:
    console.log(`Sorry, we are out of coffee.`);
  };
}