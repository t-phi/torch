var Info = require("../../classes/dataobjects/Info.js");


 var i = new Info({name:'A1',  value:'A2',  display_value:'A3', is_selected:'A4', field_name: 'A5'} );


var i2 = i.copy();

console.log(i, i2);
console.log(i.toString(), i2.toString());
console.log("JSON: " + i.toJSON());
