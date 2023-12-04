var TemplateInfo      = require( "../../classes/dataobjects/TemplateInfo.js"  );


var ti = new TemplateInfo( { id: "A1", state: "A2", template: "A3" } );

var ti2 = ti.copy();
ti.id="B1";

console.log(ti.toString());
console.log(ti2.toString());

console.log(ti.toJSON());
console.log(ti2.toJSON());
