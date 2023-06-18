const { odd, even } = require('./var')
const chekcNumber = require('./func')


function checkStringOddOrEven(str){
    if(str.length % 2){
        return odd;
    } else{
        return even;
    }
}


console.log(chekcNumber(10));
console.log(checkStringOddOrEven('안녕하세요'));