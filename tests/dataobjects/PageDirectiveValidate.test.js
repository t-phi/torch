var PageDirectiveValidate = require("../../classes/dataobjects/PageDirectiveValidate.js");
var InputSet = require("../../classes/dataobjects/InputSet.js");
var Input = require("../../classes/dataobjects/Input.js");


var pdv = new PageDirectiveValidate({
    error_code:               'A1',
    field_name:               'A2',
    display_value:            'A3',
    error_field_name:         'A4',

});


var pdv2 = pdv.copy();

pdv.field_name="B2";

console.log(pdv.toString(), pdv2.toString());
console.log(pdv.type(), pdv2.type());
