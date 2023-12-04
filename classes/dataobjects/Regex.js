var ValidationObject = require("./ValidationObject.js");

class Regex extends ValidationObject{

      constructor( { regex, flags} ){
          super({regex, flags});

          this.regex              = regex                || "";
          this.flags              = flags                || "";

      }

      getRegexString(){ return this.regex; }
      getFlags(){ return this.flags; }



      toString(){
       		var result = "";
       		result += "regex="                    + this.getRegexString() + ", ";
       		result += "flags="                    + this.getFlags() + ", ";

       		return result;

      }


      copy(){
      	   return new Regex(this );
      }


      test(test_string)
      {
         var rx = new RegExp(this.regex, this.flags); // core Javascript datatype
         return rx.test(test_string);

      }

      	toJSONObject()
      	{

      		var obj = {
            regex:               this.regex              ,
            flags:               this.flags              ,
      		};
      		return obj;
      	}

      	toJSON()
      	{
      			return JSON.stringify(this.toJSONObject());
      	}


}

module.exports = Regex;
