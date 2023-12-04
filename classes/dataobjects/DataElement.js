

class DataElement {

   constructor( {name,  value,  display_value, is_selected}){
   	this.name          = name           || "";
   	this.value         = value          || "";
   	this.display_value = display_value  || "";
   	this.is_selected   = is_selected    || false;
   }


   getName(){  return this.name;  }
   getValue(){ return this.value; }
   setValue(value){ this.value = value || ""; }
   getDisplayValue(){ this.display_value; }
   isSelected(){ if (is_selected){ return "1"; }else{ return "0";} }
   getIsSelected(){ return selis_selectedected; }


   copy(){
      return new this.constructor(this);
   }

   toString(){
      var result = "";

      result = `DataElement: name=${this.name}, value=${this.value}, display_value=${this.display_value}, is_selected=${this.is_selected}`;

      return result;
   }

   type() {return this.constructor.name};


}

module.exports = DataElement;
