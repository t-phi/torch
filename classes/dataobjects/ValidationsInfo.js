class ValidationsInfo {

      constructor( {error_code, validation} ){
            this.error_code = error_code;
            this.validation      = validation;
      }

      getErrorCode(){ return this.error_code; }
      getValidationsObject(){ return this.validation; }


      validateString(  test_string )
      {
      	   if( test_string == null){ test_string = ""; }
           return this.validation.test(test_string);

      }



      toString(){
         		var result = "";
         		result += "errorCode="+ this.getErrorCode() + ", ";
         		result += "validation="    + this.getValidationsObject() + ", ";


         		return result;
      }


      copy(){
      	   return new ValidationsInfo(this );
      }

      toJSONObject()
    	{

    		var obj = {
    			error_code:               this.error_code              ,
          validation:                    this.validation  ,
    		};
    		return obj;
    	}

    	toJSON()
    	{
    			return JSON.stringify(this.toJSONObject());
    	}

}


module.exports = ValidationsInfo;
