var InputSet = require("../../classes/dataobjects/InputSet.js");
var Input = require("../../classes/dataobjects/Input.js");

 var i = new InputSet();


i.add( new Input({name: 'A1', value: 'A2'}));
i.add( new Input({name: 'B1', value: 'B2'}));

var i2 = i.copy();
i.add( new Input({name: 'C1', value: 'C2'}));

i2.add(new Input({name: 'D1', value: 'D2'}));
var x = i.get('B1').setValue('BOOO!');

console.log(i, i2);
console.log(i.toString(), i2.toString());
