const Meta = require("./Meta.js");

var MainBrandedConfig = require("./MainBrandedConfig.js");
var CustomerBrandSet = require("./mainconfig/CustomerBrandSet.js");
var ValidAppsSet = require("./mainconfig/ValidAppsSet.js");
var JSONHelper = require("../utils/JSONHelper.js");

class MainConfig {
    constructor(filename){

        var json;
        if( typeof filename === 'object')
          json = filename;
        else {
          json = JSONHelper.load(filename)
        }


        var meta     = json.meta;
        var tenants  = json.tenants;
        var maininfo = json.maininfo;

        this.meta = new Meta( meta );
    	  this.vas = new ValidAppsSet( maininfo.validApplications );
    	  this.cbs = new CustomerBrandSet( tenants );
    }

    getBrandConfig(tenant_id, language){
       return this.cbs.getByKeys( tenant_id, language);
    }

    getBrandConfigJSON(tenant_id, language){
       var filename = this.cbs.getByKeys( tenant_id, language);
       var dir = this.meta.getTenantRoot();

       const path = require('node:path');
       var full_path = path.join(dir, filename);
       full_path = path.normalize(full_path);
       var json = JSONHelper.load(filename);
       return json;
    }

    getBrandConfigObject(tenant_id, language){
       var json = getBrandConfigJSON(tenant_id, language);
       var mbc = new MainBrandedConfig(json);
       return mbc;
    }

    isValidApp( app_name){
    	return this.vas.isValidApp( app_name );
    }

    toString(){
       	var tmp = "";
        tmp += "Meta\n" + this.meta.toString() + "\n\n";
        tmp += "Valid Applications\n" + this.vas.toString() + "\n";
       	tmp += "Customer Brands\n"    + this.cbs.toString() + "\n";
       	return tmp;
    }
     getValidApps(){
   	    return this.vas.appList();
    }
    getMeta(){
       return this.meta;
   }


}


module.exports = MainConfig;
