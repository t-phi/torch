var ShortDAO = require("../../classes/dataobjects/ShortDAO.js");
var InputSet = require("../../classes/dataobjects/InputSet.js");
var Input = require("../../classes/dataobjects/Input.js");
var Info = require("../../classes/dataobjects/Info.js");



//		type, name, value, displayValue, description, viewable
d = new ShortDAO(new Info( { type: "alpha", name: "a", value: "A", displayValue: "A", description: "A", viewable: "false"  } )  );

/*
d.addChild( new ShortDAO( new Info( "alpha","b1", "B1", "B1", "B1", "true")) );
d.addChild( new ShortDAO( new Info( "alpha","b2", "B2", "B2", "B2", "true")) );
d.addChild( "b3", "B3" );


d.getChild(1).addChild("c21", "C21");
*/



console.log(d);
//console.log(d.toXML());
