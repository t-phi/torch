class TemplateInfo {

      constructor({ page_id, filename, engine }){
          this.page_id    = page_id;
          this.filename   = filename;
          this.engine     = engine;
      }

      getPageID(){ return this.page_id; }
      getFilename(){ return this.filename; }
      getEngine(){ return this.engine; }


      toString(){
     		var result = "";
     		result += "page_id=" + this.getPageID()     + ", ";
     		result += "filename=" + this.getFilename()  + ", ";
     		result += "engine=" + this.getEngine()       + ", ";
     		return result;
      }


      copy(){
      	   return new TemplateInfo( this );
      }

      toJSONObject()
      {

        var obj = {
          page_id:            this.page_id                  ,
          filename:           this.filename               ,
          engine:             this.engine            ,
        };
        return obj;
      }

      toJSON()
      {
          return JSON.stringify(this.toJSONObject());
      }


}

module.exports = TemplateInfo;
