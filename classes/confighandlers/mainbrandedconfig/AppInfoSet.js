let AppInfo = require("../../dataobjects/AppInfo.js");

/*
{
      _all: {
          globalvalidations:  "globalvalidations.jfg"
      },

      registration: {
          _common:
          {
            location:     "registration/_common/",
            validations:  "validations.jfg",
            restcalls:    "restcalls.jfg"
            fieldnames:   "fieldnames.jfg",
            templates:    "templates.jfg",
          },

          EN: {
              location:     "registration/EN/",
              pageflow:     "pageflow.jfg",
              templates:    "templates.jfg",
              fieldnames:   "fieldnames.jfg",
          },

          FR: {
              location:     "registration/FR/",
              pageflow:     "pageflow.jfg",
              templates:    "templates.jfg",
              fieldnames:   "fieldnames.jfg",
          },

      }
 */


class AppInfoSet {

   constructor( json ) {
	   this.data = new Map(); // 2D map using name and language as keys
	   this.import(json);
   }

   import(json) {

	   Object.keys(json).forEach( (app_id) => {
		   let app_info = json[app_id];
		   this.load_api_info( app_id, app_info );
	   });
   }
	load_api_info( app_id, app_info ) {
		Object.keys(app_info).forEach( (lang) => {

			let app_info_details = app_info[lang];
			let parameters = {};

			parameters.name 				= app_id;
			parameters.language 			= lang;
			parameters.location 			= app_info_details.location;
			parameters.pageflow 			= app_info_details.pageflow;
			parameters.templates 			= app_info_details.templates;
			parameters.fieldnames 			= app_info_details.fieldnames;
			parameters.restcalls 			= app_info_details.restcalls;
			parameters.validations 			= app_info_details.validations;
			parameters.globalvalidations 	= app_info_details.globalvalidations;

			this.add( new AppInfo(parameters) );

		});
	}




   size(){ return this.data.size; }

   
   
   add( app_info ){



	   let name = app_info.name;
	   let lang = app_info.language;

	   let app = this.data.get(name);
	   if( app == null ) {
		   app = new Map();
	   }

	   app.set(lang, app_info);
	   this.data.set(name, app);
   }
   
   
   
   toString(){
   	let result = "";

	this.data.forEach( (app, app_id) =>
	{
		console.log(`${app_id}`);

		app.forEach( (app_info, lang)  =>
		{
			result += `(${app_id},${lang}):: ` + app_info.toString() + "\n";
		});

	});

   	return result;
   }
   
   getAppInfo( app_id, lang )
   {
	   let app_info = this.data[app_id];
	   if( app_info != null)
	   {
		   let app_info_details = app_info[lang];
		   return  app_info_details;
	   }
	   return null;
   }


    
}


module.exports = AppInfoSet;