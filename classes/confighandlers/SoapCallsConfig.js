
class SoapCallsConfig {
   SoapCallSet si;
   String cfg;
   String sessionToken;


   constructor( filename,  session_token){

                 this.session_token = session_token;


                 var json;
                 if( typeof filename === 'object')
                   json = filename;
                 else {
                   json = JSONHelper.load(filename);
                 }

                 this.meta = new Meta(json.meta);
                 tihs.si = json.soapCall;

    }


    getSoapCall( soapID ){
               return si.getSoapCall(soapID);
    }

    toString(){
       	var tmp = "";
       	tmp += "Soap Calls\n" + si.toString();
       	tmp += "\n";
        return tmp;
   }





}
