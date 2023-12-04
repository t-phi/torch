
var LogElement = require("../../classes/utils/LogElement.js");
var Logger = require("../../classes/utils/Logger.js");

var filename = process.argv[2];


//console.log(filename, user_context:{session: "00000001", key: "000-000-000", username: "bob"} );
var L = new Logger( {filename: filename, user_context:{username:"BOB", session:"00000001", key:"000-000-000"}  });
//L.info(  new LogElement( { component: "xxx",  code: "ads",  description: "this is a test", options: {a:'A', b:'B'} } ));


L.setComponent("Logger.test");



L.error( {    code: "1001",  description: "this is an ERROR",  user_context:{username:"COC", session:"00000002", key:"100-000-000"}});
L.warn({      code: "1002",  description: "this is a Warning"});
L.info({      code: "1003",  description: "this is an INFO message"});
L.verbose({   code: "1004",  description: "this is a VERBOSE message"});
L.debug({     code: "1005",  description: "this is a DEBUG message", data: {a:'A', b:'B'}  });
L.silly({     code: "1006",  description: "this is a SILLY message"} );
