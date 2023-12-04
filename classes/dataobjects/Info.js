class Info {

      constructor(  { type, name, value, display_value, description, viewable }  ){
          this.name          = name           || "";
          this.value         = value          || "";
          this.display_value = display_value  || "";
          this.description   = description    || "";
          this.type          = type           || "";
          this.viewable      = "true";

          if ( (viewable != null) &&  (viewable == "false") ){
             viewable = "false";
          }
      }

      isValidType(type)
      {
          var testType = type || this.type;

      	  if( testType == "field" )  { return true; }
      	  if( testType == "input" )  { return true; }
      	  if( testType == "option")  { return true; }

      	  return false;
      }


      getName()         { return this.name; }
      getValue()        { return this.value; }
      getDescription()  { return this.description; }
      getDisplayValue() { return this.display_value; }
      getViewSetting()  { return this.viewable; }
      getType()         { return this.type; }
      isViewable()      { return (this.viewable == "true")?true:false;}

      setName(name)                   { this.name = name; }
      setValue(value)                 { this.value = value; }
      setDescription(description)     { this.description = description; }
      setDisplayValue(display_value)  { this.display_value = display_value; }
      setViewSetting(viewable)        { this.viewable = (viewable == "false")?"false":"true" }


      toString(){
       		var result = "";
       		result += "type="              + this.getType() + ", ";
       		result += "name="              + this.getName() + ", ";
       		result += "value="             + this.getValue() + ", ";
       		result += "description="       + this.getDescription() + ", ";
       		result += "display_value="     + this.getDisplayValue() + ", ";
       		result += "viewSetting="       + this.getViewSetting() + ", ";
       		return result;

      }

      toJSONObject()
      {
        var obj = {
            "type"              : this.getType() ,
            "name"              : this.getName() ,
            "value"             : this.getValue() ,
            "description"       : this.getDescription() ,
            "display_value"     : this.getDisplayValue() ,
            "viewSetting"       : this.getViewSetting() ,
        };
        return obj;

      }

      toJSON()
      {
        return JSON.stringify(this.toJSONObject());
      }

      copy(){
      	   return new this.constructor(this);
      }

}

module.exports = Info;
