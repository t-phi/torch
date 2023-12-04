var ValidApp      = require( "../../classes/dataobjects/ValidApp.js"  );


var va = new ValidApp( { name: "A1"} );

var va2 = va.copy();
va.name="B1";

console.log(va.toString());
console.log(va2.toString());

console.log(va.toJSON());
console.log(va2.toJSON());
