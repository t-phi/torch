var ErrorData = require("../../classes/dataobjects/ErrorData.js");


 var ed = new ErrorData({name:'A1',  value:'A2',  display_value:'A3', is_selected:'A4', field_name: 'A5'} );


var ed2 = ed.copy();

console.log(ed, ed2);
console.log(ed.toString(), ed2.toString());
