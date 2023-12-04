var TemplateInfo = require("../../dataobjects/TemplateInfo.js");
/*
{
    "_init": {
          file: "templates/1.template",
          engine: "handlebars",
    },
    "PRINTPAGE-USER_DATA-PP01-DEFAULT": {
          file: "templates/2.template",
          engine: "handlebars",
    },

}

*/


class TemplateInfoSet {
   constructor(json){

     this.data = new Map();
     Object.keys(json).forEach( (page_id) => {
       var template_info = json[page_id];
       this.processTemplateInfo( page_id, template_info );
     });
   }


   processTemplateInfo( page_id, template_info)
   {
        var filename = template_info.filename;
        var engine   = template_info.engine;

        this.add(  new TemplateInfo( {page_id: page_id, filename: filename, engine: engine} )  );
   };


   size(){
   	    return this.data.size;
   }

   get(page_id){

   	var result =  this.data.get(page_id);
   	return result;
   }


  add( template_info ){
       this.data.set(template_info.getPageID(), template_info);
   }



   toString(){
   	var result = "";

    this.data.forEach( (info, page_id) => {
      result += `page_id:`;
      result += info.toString();
      result += "\n\n";
    });

   	return result;
   }
}


module.exports = TemplateInfoSet;
