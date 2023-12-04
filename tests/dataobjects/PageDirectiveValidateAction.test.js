var PageDirectiveValidateAction = require("../../classes/dataobjects/PageDirectiveValidateAction.js");
var InputSet = require("../../classes/dataobjects/InputSet.js");
var Input = require("../../classes/dataobjects/Input.js");


var pdva = new PageDirectiveValidateAction({
    host:               'A1',
    server:             'A2',
    method:             'A3',
    error_field_name:   'A4',

});

pdva.parameters_input.add( new Input({name: 'B1', value: 'B2'}));
pdva.parameters_field.add( new Input({name: 'D1', value: 'D2'}));

var pdva2 = pdva.copy();

pdva.parameters_input.add(new Input({name: 'B1', value: 'B3'}));


console.log(pdva.toString(), pdva2.toString());
console.log(pdva.type(), pdva2.type());
