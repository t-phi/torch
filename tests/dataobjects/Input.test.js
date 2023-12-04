var Input = require("../../classes/dataobjects/Input.js");


 var i = new Input({name:'A1',  value:'A2',  display_value:'A3', is_selected:'A4', field_name: 'A5'} );


var i2 = i.copy();

console.log(i, i2);
console.log(i.toString(), i2.toString());
