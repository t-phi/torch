var ErrorDataSet = require("../../classes/dataobjects/ErrorDataSet.js");
var ErrorData = require("../../classes/dataobjects/ErrorData.js");

 var eds = new ErrorDataSet({ data: [new ErrorData({}), new ErrorData({})]});



var eds2 = eds.copy();

eds.add(new ErrorData({}));
eds.data[1].name = 'huh';

console.log(eds, eds2);
console.log(eds.toString(), eds2.toString());
