var DataElement = require('./DataElement.js');

class ErrorData extends DataElement{



   constructor({name,  value,  display_value, is_selected, field_name}){
   	super( {name,  value,  display_value, is_selected});
   	this.field_name = field_name || "";
   }

   getFieldName(){
      return this.field_name;
   }



   toString(){
      var result = "";

      result = `ErrorData: name=${this.name}, field_name=${this.field_name}, value=${this.value}, display_value=${this.display_value}, is_selected=${this.is_selected}`;

      return result;
   }

}


module.exports = ErrorData;
