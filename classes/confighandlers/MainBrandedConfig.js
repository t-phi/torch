
var JSONHelper = require("../utils/JSONHelper.js");
var AppInfo = require("../dataobjects/AppInfo.js");

class MainBrandedConfig {


   constructor(filename){

     var json;
     if( typeof filename === 'object')
       json = filename;
     else {
       json = JSONHelper.load(filename)
     }

     this.app_info;


          NodeList nl1 = XMLHelper.getNodeList("apps", aFileName);
	  ai = new AppInfoSet(nl1);
    }



  getAppInfo(  appName ){
               return ai.getAppInfo(appName);
    }

toString(){
   	String tmp = "";
   	tmp += "Application Info\n" + ai.toString();
   	tmp += "\n";
    	return tmp;
   }



}
