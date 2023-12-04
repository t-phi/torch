var CustomerBrand = require("../../classes/dataobjects/CustomerBrand.js");


 var cb = new CustomerBrand( {name: 'A1', lang: 'A2', cfg:'A3'} );


var cb2 = cb.copy();

console.log(cb, cb2);
