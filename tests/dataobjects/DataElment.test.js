var DataElement = require("../../classes/dataobjects/DataElement.js");


 var de = new DataElement({name:'A1',  value:'A2',  display_value:'A3', is_selected:'A4'} );


var de2 = de.copy();

console.log(de, de2);
console.log(de.toString(), de2.toString());
