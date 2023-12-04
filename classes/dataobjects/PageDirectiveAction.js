var PageDirectiveTask = require("./PageDirectiveTask.js");
var InputSet = require("./InputSet.js");

class PageDirectiveAction extends PageDirectiveTask {

      constructor( input ){
        super(input);
        this.init(input);
      }
      init({host,  server,  method, error_field_name, parameters_input,  imports_input,  parameters_field,  imports_field }){
          this.host             = host                || "";
          this.server           = server              || "";
          this.method           = method              || "";
          this.error_field_name = error_field_name      || "";
          this.parameters_input = this.mapCopy(parameters_input)    || new InputSet();
          this.imports_input    = this.mapCopy(imports_input)       || new InputSet();
          this.parameters_field = this.mapCopy(parameters_field)    || new InputSet();
          this.imports_field    = this.mapCopy(imports_field)       || new InputSet();
      }

      getHost(){ return this.host; }
      getServer(){ return this.server; }
      getMethod(){ return this.method; }
      getErrorFieldName(){ return this.error_field_name; }
      getInputParameterValue( aKey ){ return  this.parameters_input.get( aKey ); }
      getInputImportValue( aKey ){ return  this.imports_input.get( aKey ); }
      getFieldParameterValue( aKey ){ return this.parameters_field.get( aKey ); }
      getFieldImportValue( aKey ){ return  this.imports_field.get( aKey ); }

      mapCopy(map)
      {
         var copy = new InputSet()
         if (( map == null) || (map.type() != "InputSet")) return copy;

         return map.copy();
      }

      getInputParametersCopy(){  		return this.mapCopy(this.parameters_input);    }
      getFieldParametersCopy(){    	return this.mapCopy(this.parameters_field);    }
      getInputImportsCopy(){    	  return this.mapCopy(this.imports_input);       }
      getFieldImportsCopy(){    	  return this.mapCopy(this.imports_field);       }


      mapToString(title, map)
      {
        var result = `\n${title}\n`;
        map.forEach( (key) => {
              result += ">> " + key + "=" + map.get(key) + "\n";
        });
        return result;
      }

      mapsToString(){
        	var result = "PageDirectiveAction: ";

          result += this.mapToString("InputParameters", this.parameters_input);
          result += this.mapToString("FieldParameters", this.parameters_field);
          result += this.mapToString("InputImports", this.imports_input);
          result += this.mapToString("FieldImports", this.imports_field);

          return result;
      }

      toString(){
       		var result = "PageDirectiveAction:";
       		result += "host="          + this.getHost()          + ", ";
       		result += "server="        + this.getServer()        + ", ";
       		result += "method="        + this.getMethod()        + ", ";
       		result += "errorFieldName="     + this.getErrorFieldName()     + ", ";

          result += this.mapsToString();
       		return result;

      }


      copy(){
      	   return new PageDirectiveAction(this);
      }

      type() {return this.constructor.name};


}

module.exports = PageDirectiveAction;
