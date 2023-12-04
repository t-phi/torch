
var InputSet      = require( "../../classes/dataobjects/InputSet.js"  );
var Input         = require( "../../classes/dataobjects/Input.js"     );
var Info          = require( "../../classes/dataobjects/Info.js"      );
var {ShortDAO, ShortDAOSet}      = require( "../../classes/dataobjects/ShortDAO.js"  );

//		type, name, value, displayValue, description, viewable
d = new ShortDAOSet( );


d.add(
   new ShortDAO(
      { type: "alpha", name: "a", value: "A", display_value: "A", description: "A", viewable: "false"  }
   )
 );
d.add( new ShortDAO( new Info( { type: "beta", name: "b", value: "B", display_value: "B", description: "B", viewable: "false"  } )) );
d.add( {name: "b3", value: "B3"} );

d.getByIndex(1).addChild({name: "c3", value: "C3"});




console.log(d.toString());
console.log("JSON: " + d.toJSON());
