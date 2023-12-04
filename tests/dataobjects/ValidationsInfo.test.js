var ValidationsInfo      = require( "../../classes/dataobjects/ValidationsInfo.js"  );


var vi = new ValidationsInfo( { error_code:"A1", regex:"A2" });

var vi2 = vi.copy();

var regex = "B";

vi2.error_code="B1";
vi2.regex=regex;

console.log(vi.toString());
console.log(vi2.toString());

console.log(vi.toJSON());
console.log(vi2.toJSON());

var test_string = "This is a test B";
if( vi2.validateString(test_string))
{
  console.log(`${test_string} matches ${regex}`);
}
else {
  console.log(`${test_string} DOES NOT MATCH ${regex}`);

}
