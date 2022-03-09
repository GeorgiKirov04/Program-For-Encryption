function solve(input,secondput){
 input = Math.floor(Math.random() * (10 - 1 + 1) ) + 1;
 secondput = Math.floor(Math.random() * (20 - input+ 1) ) + input;
let product = input.secondput;
 if (((input-1)*(secondput-1)*2) > product) {
    input = Math.floor(Math.random() * (10 - 1 + 1) ) + 1;
    secondput = Math.floor(Math.random() * (20 - input+ 1) ) + input;
 }

console.log(input)
console.log(secondput);
}
solve(0,0)