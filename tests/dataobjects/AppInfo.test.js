var AppInfo = require("../../classes/dataobjects/AppInfo.js");


 var ai = new AppInfo({name: 'A1',  pageflow: 'A2',  templates: 'A3',  fieldnames: 'A4',  validations: 'A5',  soapCalls: 'A6', permissions: 'A7', permissionCheck: 'A8'} );


var ai2 = ai.copy();

console.log(ai, ai2);
