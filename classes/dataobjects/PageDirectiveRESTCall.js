var PageDirectiveAction = require("./PageDirectiveAction.js");
var InputSet = require("./InputSet.js");

class PageDirectiveRESTCall extends PageDirectiveAction {

      constructor( input ){
        super(input);
        this.init(input);
      }
      init( { id,  host,  server,  method,  error_field_name, parameters_input,  imports_input,  parameters_field,  imports_field }){
          this.id               = id                            || "";
          this.host             = host                          || "";
          this.server           = server                        || "";
          this.method           = method                        || "";
          this.error_field_name   = error_field_name                || "";

          this.parameters_input = this.mapCopy(parameters_input)    || new Map();
          this.imports_input    = this.mapCopy(imports_input)       || new Map();
          this.parameters_field = this.mapCopy(parameters_field)    || new Map();
          this.imports_field    = this.mapCopy(imports_field)       || new Map();

      }

      getID(){ return this.id; }


      toString(){
       		var result = "PageDirectiveSoapCall: ";
          result += "id="            + this.getID()            + ", ";
          result += "host="          + this.getHost()          + ", ";
       		result += "server="        + this.getServer()        + ", ";
       		result += "method="        + this.getMethod()        + ", ";
       		result += "error_field_name="     + this.getErrorFieldName()     + ", ";


          result += this.mapsToString();
       		return result;

      }




      copy(){
      	   return new PageDirectiveSoapCall(this);
      }

}



module.exports = PageDirectiveRESTCall;
