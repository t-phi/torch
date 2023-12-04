var Meta = require("./Meta.js");
var JSONHelper = require("../utils/JSONHelper.js");
var {ShortDAO, ShortDAOSet}  = require("../dataobjects/ShortDAO.js");


/*
  { type: "alpha", name: "a", value: "A", display_value: "A", description: "A", viewable: "false"  }


{  /// differentiate between constants, input variables, session variables, values coming back from external functions? // variable scoping?
  "_init": {
      UserID:           {   default_value:  "",            displayValue:   "UserID",            description:    "" },
      Brand:            {   default_value:  "",            displayValue:   "BrandID",           description:    "" },
      DataSource:       {   default_value:  "forgerock",   displayValue:   "Datasource",        description:    "" },
      RecordType:       {   default_value:  "Person",      displayValue:   "Recordtype",        description:    "" },
      serviceUtility:   {   default_value:  "",            displayValue:   "ServiceUtility",    description:    "", viewable: "false" },
      default_TARGET:   {   default_value:  "http://www.gov.ab.ca",            displayValue:   "TARGET",            description:    "" },
  }
}

*/


class FieldConfig {



   constructor( filename,  session_token){

     this.fieldsByPage = new Map();
     this.session_token = session_token;
     this.importedFields = new ShortDAOSet();


     var json;
     if( typeof filename === 'object')
       json = filename;
     else {
       json = JSONHelper.load(filename);
     }

     this.meta = new Meta(json.meta);
     var pages = json.pages;

     this.loadList(pages);

    }



   loadList(json){

     Object.keys(json).forEach( (page_id) => {
       var field_set = json[page_id];
          var set = this.fieldsByPage.get(page_id);
          if(set == null)
          { set = new ShortDAOSet(); }

          Object.keys(field_set).forEach( (field_name) => {
               var field_info = field_set[field_name];
               field_info["name"] = field_name;
               field_info["type"] = "field";

               set.add( new ShortDAO(  field_info ));
               this.fieldsByPage.set(  page_id, set);
          })
     });

   }

    getImportedFields( ) { return this.importedFields; }
    setImportedFields( newFields ) { this.importedFields = newFields; }


    importField( aField )   { 	this.importedFields.add(aField);    }


    getFields( pageID ){
       if( this.fieldsByPage != null )
       {
          return this.importedFields.merge( this.fieldsByPage.get(pageID) ) ;
       }
       else
       {
          return new ShortDAOSet();
       }
    }

    getFieldInfo( pageID, fieldName ){

        var fieldSet= this.fieldsByPage.get(pageID);

       if( fieldSet != null)
       {
          return fieldSet.get( fieldName );
       }
       else
       {
  	    return this.importedFields.get(fieldName);
       }

    }






    toString(){
       var tmp  = "";

       this.fieldsByPage.forEach( (field_set, page_id) => {
         tmp += "Field Configuration Info\n" ;
         tmp += `[${page_id}]`;
         tmp += "\n" + field_set.toString() + "\n";
       });

       tmp += "\nImported Fields\n";
       tmp += this.importedFields.toString() + "\n";
       return tmp;
   }


    /*
  public static void main( String[] args) throws Exception{
        String fcfg = "";


        if (args.length < 1)
        {
             System.out.println("Usage: java FieldConfig FULLPATHTOCONFIG\n");
        }
        else
        {
             fcfg = args[0];
             FieldConfig fc = new FieldConfig( fcfg, "" );
             System.out.println( fc );
        }
    }
      */


}


module.exports = FieldConfig;
