let Meta = require("./Meta.js");
let FieldConfig = require("./FieldConfig.js");
let PageFlowConfig = require("./PageFlowConfig.js");
let ValidationsConfig = require("./ValidationsConfig.js");
let TemplateConfig = require("./TemplateConfig.js");
let RESTCallsConfig = require("./RESTCallsConfig.js");
let PermissionConfig = require("./PermissionConfig.js");
let JSONHelper = require("../utils/JSONHelper.js");
let {ShortDAO, ShortDAOSet}  = require("../dataobjects/ShortDAO.js");


class AppConfig {
   constructor(app_info, session_token){

        this.fcfg  = new FieldConfig(        app_info.fieldnames()  , session_token);
        this.pcfg  = new PageFlowConfig(     app_info.pageflow()    , session_token);
        this.vcfg  = new ValidationsConfig(  app_info.validations() , session_token);
        this.tcfg  = new TemplateConfig(     app_info.templates()   , session_token);
        this.scfg  = new RESTCallsConfig(    app_info.restCalls()   , session_token);
        if(app_info.permissions() != null)
        	this.pmcfg = new PermissionConfig(app_info.permissions()	, session_token);
    }

    getFieldConfig()       { return this.fcfg; }
    getPageFlowConfig()    { return this.pcfg; }
    getValidationsConfig() { return this.vcfg; }
    getTemplateConfig()    { return this.tcfg; }
    getRESTCallsConfig()   { return this.scfg; }
    getPermissionConfig()   { return this.pmcfg; }


    toString(){


        let tmp  = "";
        tmp += "FIELD CONFIG\n============\n";
        tmp += this.getFieldConfig();
        tmp += "PAGEFLOW CONFIG\n===============\n";
        tmp += this.getPageFlowConfig();
        tmp += "VALIDATIONS CONFIG\n==================\n";
        tmp += this.getValidationsConfig();
        tmp += "TEMPLATE CONFIG\n===============\n";
        tmp += this.getTemplateConfig();
        tmp += "RESTCALLS CONFIG\n================\n";
        tmp += this.getRESTCallsConfig();
        if(this.pmcfg != null)
        {
            tmp += "COMPONENT PERMISSION CONFIG\n================\n";
            tmp += this.getPermissionConfig();
        }
        return tmp;
   }


/*
  public static void main( String[] args) throws Exception{
        String fcfg = "";


        if (args.length < 6)
        {
                System.out.println("Usage: java AppConfig APPNAME PAGEFLOWCONFIG TEMPLATECONFIG FIELDNAMECONFIG VALIDATIONSCONFIG SOAPCALLSCONFIG\n");

        }
        else
        {


                String appname     = args[0];
                String pageflow    = args[1];
                String templates   = args[2];
                String fieldnames  = args[3];
                String validations = args[4];
                String soapcalls   = args[5];

                AppInfo ai = new AppInfo( appname, pageflow, templates, fieldnames, validations, soapcalls);
                AppConfig acfg = new AppConfig( ai, "" );

                System.out.println( acfg );

        }
    }
*/


}


module.exports = AppConfig;
