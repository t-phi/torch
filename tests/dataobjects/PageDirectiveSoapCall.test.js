var PageDirectiveSoapCall = require("../../classes/dataobjects/PageDirectiveRESTCall.js");
var InputSet = require("../../classes/dataobjects/InputSet.js");
var Input = require("../../classes/dataobjects/Input.js");


var pdsc = new PageDirectiveSoapCall({
    host:               'A1',
    server:             'A2',
    method:             'A3',
    error_field_name:   'A4',
    id:                 'A5',

});

pdsc.parameters_input.add( new Input({name: 'B1', value: 'B2'}));
pdsc.imports_input.add(    new Input({name: 'C1', value: 'C2'}));
pdsc.parameters_field.add( new Input({name: 'D1', value: 'D2'}));
pdsc.imports_field.add(    new Input({name: 'E1', value: 'E2'}));

var pdsc2 = pdsc.copy();

pdsc.imports_input.add(new Input({name: 'C1', value: 'C3'}));


console.log(pdsc.toString(), pdsc2.toString());
console.log(pdsc.type(), pdsc2.type());
