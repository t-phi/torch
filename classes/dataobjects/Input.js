var DataElement = require('./DataElement.js');

class Input extends DataElement{

   constructor(object){
   	super( object);
   }


   toString(){
      var result = "";

      result = `Input: name=${this.name}, value=${this.value}, display_value=${this.display_value}, is_selected=${this.is_selected}`;

      return result;
   }

}

module.exports = Input;
