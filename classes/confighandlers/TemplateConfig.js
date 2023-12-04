var TemplateInfoSet = require("./templates/TemplateInfoSet.js");
var Meta = require("./Meta.js");
var JSONHelper = require("../utils/JSONHelper.js");

class TemplateConfig {

   constructor( filename, session_token){
	     this.session_token = session_token;

       var json;
       if( typeof filename === 'object')
         json = filename;
       else {
         json = JSONHelper.load(filename)
       }
        this.meta = new Meta(json.meta);
	      this.templates = new TemplateInfoSet(json.pages);
    }


    getTemplateInfo(  pageID ){
          return this.templates.get(pageID);
    }


    getJSON( pageID ){
    	var result = "";
    	var tmp = this.getTemplateInfo(pageID);
    	if ( tmp != null )
    	{
    		result = tmp.toJSON();
    	}
    	return result;

    }

    getTemplateString( pageID ){
       var filename = this.templates.get(pageID).filename;
       var templateString = "";

  	   try{
            const fs = require('fs');
            let rawdata = fs.readFileSync(filename, "utf8");
            templateString = rawdata;
        }
        catch(e)
        {
           // In an error state from reading file
        }
        return templateString;
    }


    toString(){
       	var tmp = "";
       	tmp += "Template Info\n" + this.templates.toString();
       	tmp += "\n";
        return tmp;
    }
}




module.exports = TemplateConfig;
