var ValidationsInfo = require("../../dataobjects/ValidationsInfo.js");
var ValidationObject = require("../../dataobjects/ValidationObject.js");
var Regex = require("../../dataobjects/Regex.js");

/*
  {
      "_init": {
            MANDATORY_FIELD: { regex: ".+"  }
      },
      "PRINTPAGE-USER_DATA-PP01-DEFAULT": {
            MANDATORY_FIELD: { regex: ".+"  }
      },

  }

*/

class ValidationsInfoSet {


   constructor(json) {
      this.data = new Map();
      Object.keys(json).forEach( (page_id) => {
         var rule_sets = json[page_id];
         this.processRuleSets( page_id, rule_sets );
      });
   }

    processRuleSets(  page_id,  rule_sets ){
          if( rule_sets == null)
            return;

          Object.keys(rule_sets).forEach( (errorCode) => {
            var rules = rule_sets[errorCode];
        //    console.log(`${page_id}->${errorCode}->${rules}`);
            this.processRules(page_id, errorCode, rules);
          });
    }


/*
    {
          MANDATORY_FIELD: { regex: ".+"  }
    },
*/


  processRules( page_id, errorCode, rules )
  {
      if( rules == null)
        return;

      var validationsObject = new ValidationObject();
      if (rules.regex != null)
          validationsObject = new Regex(rules);

      this.add(  page_id, new ValidationsInfo( {error_code: errorCode, validation: validationsObject} )  );
  }


   size(){
   	  return this.data.size;
   }

   get(page_id, error_code){
     	var result;

     	var tmp =  this.data.get(page_id);
     	if  (tmp != null)
     		result = tmp.get(error_code);

     	return result;
   }


   add( page_id,  element){
       var tmp = this.data.get( page_id );
       if (tmp == null)
          tmp = new Map();


       tmp.set(element.getErrorCode(), element);
       this.data.set( page_id, tmp);
   }



   toString(){
     var result = "";
     this.data.forEach( (rules, page_id) => {
        rules.forEach( (vi, error_code) => {
           result += `${page_id}: ${error_code}: `;
           result += "\n    " + vi.toString() + "\n\n";
        })
     });

     return result;
   }

}


module.exports = ValidationsInfoSet;
