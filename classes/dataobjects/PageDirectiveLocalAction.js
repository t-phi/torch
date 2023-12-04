var PageDirectiveAction = require("./PageDirectiveAction.js");
var InputSet = require("./InputSet.js");


class PageDirectiveLocalAction extends PageDirectiveAction {
      constructor( input ){
        super(input);
        this.init(input);
      }
      init( {class_name,  method, error_field_name, parameters_input,  imports_input,  parameters_field,  imports_field }){

          this.class_name       = class_name                    || "";
          this.method           = method                        || "";
          this.error_field_name = error_field_name              || "";
          this.parameters_input = this.mapCopy(parameters_input)    || new InputSet();
          this.imports_input    = this.mapCopy(imports_input)       || new InputSet();
          this.parameters_field = this.mapCopy(parameters_field)    || new InputSet();
          this.imports_field    = this.mapCopy(imports_field)       || new InputSet();

      }

      getHost(){ return null; }
      getServer(){ return null; }
      getClassName(){ return this.class_name; }

      toString(){
       		var result = "PageDirectiveLocalAction: ";
       		result += "class_name="          + this.getClassName()        + ", ";
       		result += "method="              + this.getMethod()       + ", ";
       		result += "error_field_name="    + this.getErrorFieldName()   + ", ";

          result += this.mapsToString();
          return result;
      }


      copy(){
      	   return new PageDirectiveLocalAction(this);
      }

}


module.exports = PageDirectiveLocalAction;
