var PageDirectiveTask = require("./PageDirectiveTask.js");

class PageDirectiveValidate extends PageDirectiveTask {


      constructor( input ){
        super(input);
        this.init(input);
      }
      init( {error_code,  input_name, field_name, error_field_name, display_value} ){
          this.error_code         = error_code          || "";
          this.input_name         = input_name          || "";
          this.field_name         = field_name          || "";
          this.error_field_name   = error_field_name    || field_name    || "";
          this.display_value      = display_value       || "";
      }


      getErrorCode(){ return this.error_code; }
      getInputName(){ return this.input_name; }
      getFieldName(){ return this.field_name; }
      getErrorFieldName(){ return this.error_field_name; }
      getDisplayValue(){ return this.display_value; }


      toString(){
       		var result = "PageDirectiveValidate: ";
       		result += "error_code="        + this.getErrorCode()       + ", ";
            result += "input_name="        + this.getInputName()       + ", ";
            result += "field_name="        + this.getFieldName()       + ", ";
       		result += "error_field_name="  + this.getErrorFieldName()  + ", ";
       		result += "display_value="     + this.getDisplayValue()   ;
       		return result;

      }


      copy(){
      	   return new PageDirectiveValidate(this);
      }

}



module.exports = PageDirectiveValidate;
