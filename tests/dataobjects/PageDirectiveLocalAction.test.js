var PageDirectiveLocalAction = require("../../classes/dataobjects/PageDirectiveLocalAction.js");
var InputSet = require("../../classes/dataobjects/InputSet.js");
var Input = require("../../classes/dataobjects/Input.js");


var pda = new PageDirectiveLocalAction({
    class_name:         'A1',
    method:             'A3',
    error_field_name:   'A4',

});

pda.parameters_input.add( new Input({name: 'B1', value: 'B2'}));
pda.imports_input.add(    new Input({name: 'C1', value: 'C2'}));
pda.parameters_field.add( new Input({name: 'D1', value: 'D2'}));
pda.imports_field.add(    new Input({name: 'E1', value: 'E2'}));

var pda2 = pda.copy();

pda.imports_input.add(new Input({name: 'C1', value: 'C3'}));


console.log(pda.toString(), pda2.toString());
console.log(pda.type(), pda2.type());
