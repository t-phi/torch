let RESTCallSet = require("./restcalls/RESTCallSet.js");
let Meta = require("./Meta.js");
let JSONHelper = require("../utils/JSONHelper.js");
class RESTCallsConfig {


   constructor( filename,  session_token){

     this.session_token = session_token;

     let json;
     if( typeof filename === 'object')
       json = filename;
     else {
       json = JSONHelper.load(filename);
     }

     this.meta = new Meta(json.meta);
     this.rest_call_set = new RESTCallSet(json.rest_functions);
   }


    getRestCall( rest_id ){
               return this.rest_call_set.getRestCall(rest_id);
    }

    toString(){
       	let tmp = "";
       	tmp += "REST Calls\n" + this.rest_call_set.toString();
       	tmp += "\n";
        return tmp;
   }





}

module.exports = RESTCallsConfig;
