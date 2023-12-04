var SoapCall      = require( "../../classes/dataobjects/RESTCall.js"  );


var sc = new SoapCall( { name: "A1", url: "A2", action: "A3",  content_type: "A4", request_template: "A5", response_template: "A5" } );

var sc2 = sc.copy();
sc.name="B1";

console.log(sc.toString());
console.log(sc2.toString());

console.log(sc.toJSON());
console.log(sc2.toJSON());
