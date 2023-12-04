var PageDirectiveAction = require("./PageDirectiveAction.js");
var InputSet = require("./InputSet.js");

class PageDirectiveValidateAction extends PageDirectiveAction {


          constructor( input ){
            super(input);
            this.init(input);
          }
          init( { host,  server,  method,  display_value,  error_field_name,  parameters_input,  parameters_field }){
          this.host             = host                || "";
          this.server           = server              || "";
          this.method           = method              || "";
          this.error_field_name = error_field_name    || "";
          this.display_value    = display_value       || "";
          this.parameters_input = this.mapCopy(parameters_input)    || new InputSet();
          this.parameters_field = this.mapCopy(parameters_field)    || new InputSet();
      }


      getInputImportsCopy(){    	  return null       }
      getFieldImportsCopy(){    	  return null       }
      getDisplayValue(){ return this.display_value; }

      mapsToString(){
        	var result = "";

          result += this.mapToString("InputParameters", this.parameters_input);
          result += this.mapToString("FieldParameters", this.parameters_field);

          return result;
      }


      toString(){
          var result = "PageDirectiveValidateAction: ";
          result += "host="          + this.getHost()          + ", ";
          result += "server="        + this.getServer()        + ", ";
          result += "method="        + this.getMethod()        + ", ";
          result += "error_field_name="     + this.getErrorFieldName()     + ", ";


          result += this.mapsToString();
          return result;

      }




      copy(){
      	   return new PageDirectiveValidateAction(this);
      }

}


module.exports = PageDirectiveValidateAction;
