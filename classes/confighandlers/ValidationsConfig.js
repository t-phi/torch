
var ValidationsInfoSet = require("./validations/ValidationsInfoSet.js");
var Meta = require("./Meta.js");
var JSONHelper = require("../utils/JSONHelper.js");

class ValidationsConfig {


   constructor( filename, session_token){
   	  this.session_token = session_token;

      var json;
      if( typeof filename === 'object')
        json = filename;
      else {
        json = JSONHelper.load(filename)
      }

      this.meta = new Meta(json.meta);

      var pages = json.pages;

    	this.validations = new ValidationsInfoSet(pages);
    }



    getValidation(  page_id, error_code ){
               return this.validations.get(page_id, error_code);
    }


    getRegexString( page_id, error_code  ){
    	var result = "";
    	var tmp = this.getValidation(page_id, error_code);
    	if ( tmp != null )
    	{
    		result = tmp.getRegexString();
    	}
    	return result;

    }



    validateString(  page_id,  error_code,  testString  ){
    	var result = false;
    	var tmp = this.getValidation(page_id, error_code).validation;

    	if ( tmp != null )
      {
    		result = tmp.test( testString );
      }

    	return result;

    }



    toString(){
       	var tmp = "";
        tmp += "Meta\n" + this.meta.toString() +  "\n";
        tmp += "ValidationsInfo\n" + this.validations.toString() +  "\n";
        return tmp;
   }






}


module.exports = ValidationsConfig;
