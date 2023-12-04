import GenerateID from "../utils/GenerateID";
import {ShortDAO} from "../dataobjects/ShortDAO";
import ShortDAOSet from "../dataobjects/_ShortDAOSet";
import PageContext from "./PageContext";
import Info from "../dataobjects/Info";


class ApplicationContext {
  
  	constructor(
        {
            brand,
            app_name,
            script_name,
            language
        }
  	){
  	    this.brand                      = brand;
  	    this.app_name                   = app_name;
  	    this.script_name                = script_name;
  	    this.current_language           = language;
  	    this.fresh_inputs               = new ShortDAOSet();
  	    this.inputs                     = new ShortDAOSet();
  	    this.global_fields              = new ShortDAOSet();
  	    this.page_context_collection    = new Map();
  	    
  	    this.current_key                    = "";
  	    this.previous_key                   = "";
  	    this.sticky_fields                  = true;
        this.show_errors                    = true;
  	    this.strip_leading_input_spaces     = false;
  	    this.strip_trailing_input_Spaces    = false;

  	    let field_config = null;

  	}
  	
  	
  	getBrandID(){           return this.brand;               }
  	getAppName(){           return this.app_name;            }
  	getScriptName(){        return this.script_name;         }
  	getCurrentLanguage(){   return this.current_language;    }
  	getGlobalFields(){      return this.global_fields;       }
  	getInputsCopy(){        return this.inputs.copy();   }
  	
  	setFieldConfig(field_config){ this.field_config = field_config; }
   	setGlobalFields(  global_fields ){  this.global_fields = global_fields; }
 	

  	getAllInputsCopy(){
  	
  	     let fresh_inputs_copy = this.fresh_inputs.copy();
  	     let inputs_copy   = this.inputs.copy();
  	     
    	     
   	     for(let i=0; i < inputs_copy.size(); i++)
   	     {
   	     	let element = inputs_copy.get(i);
   	     	
   	     	if (element != null)
   	     	{
   	     	     if( fresh_inputs_copy.get(element.getName() ) == null )
   	     	     {
   	     	        fresh_inputs_copy.add(element);
   	     	     }
   	     	}
   	     }
   	     
   	     return fresh_inputs_copy;
  	}


  	setStickyFields( flag ) { this.sticky_fields = flag; }
  	getStickyFields(){ return this.sticky_fields; }
  	

  	setShowErrors( flag) { this.show_errors = flag; }
  	getShowErrors(){ return this.show_errors; }

    setStripLeadingInputSpaces( flag ) { this.stripLeadingInputSpaces = flag; }
    setStripTrailingInputSpaces( flag ){ this.stripTrailingInputSpaces = flag; }


  	addPageContext(
        {
            language,
            state,
            page_id
        }
  	)
  	{
  	    let key = GenerateID.getID();

  	    //pageContextCollection.put(key, new PageContext(key, aLanguage, aState, aPageID));

            let tmp = new PageContext({
                key_token:  key,
                language:   language,
                state:      state,
                page_id:    page_id
            });
            
            let tmp2 = this.page_context_collection.get(key);
            
            if( tmp2 == null )
            {         	
               this.page_context_collection.put(key, tmp );
            }
            else
            {
               tmp2.setLanguage( language );
               tmp2.setState( state );
               tmp2.setPageID( page_id );
            }


  	    return key;
  	}
  	
  	
  	getCurrentKey(){ return this.current_key; }
  	getPreviousKey(){ return this.previous_key; }
  	
  	
  	setPageTokens( current_key, previous_key){
  	   this.current_key  = current_key;
  	   this.previous_key = previous_key;
  	   let tmp = this.getPageContext( current_key );
  	   if (tmp != null)
  	      this.current_language = tmp.getLanguage();
  	}
  	
  	
  	
  	setScriptName( script_name ){
  		this.script_name = script_name;
  	}
  	
  	setCurrentLanguage( language ){
  		this.current_language = language;
  	}
  	
  	getPageContext( key ){
  	    this.page_context_collection.get(key);
  	}
  	
    addInput( parameters ){

        let input;

        /// chck if it's a shortdao
        if( parameters.type() == 'ShortDAO' )
        {
            input = parameters;
        }
        else
        {
            let  {
                    name,
                    value,
                    label,
                    is_selected
                } =  parameters;

			let tmpValue = value;
            if( this.strip_leading_input_spaces  ) { tmpValue = this.stripLeadingSpaces(tmpValue); }
            if( this.strip_trailing_input_Spaces ) { tmpValue = this.stripTrailingSpaces(tmpValue); }

            input = new ShortDAO( new Info("input", name, tmpValue, label, "", (is_selected?"true":"false") ) );
        }

        if( input != null)
        {
            let tmpValue = input.getValue();
            if( this.strip_leading_input_spaces  ) { tmpValue = this.stripLeadingSpaces(tmpValue); }
            if( this.strip_trailing_input_Spaces ) { tmpValue = this.stripTrailingSpaces(tmpValue); }


            input.setValue(tmpValue);

            //freshInputs.add( new Input( anInput.getName(), tmpValue, anInput.getDisplayValue(), anInput.getIsSelected() ) );
            this.fresh_inputs.add( input.copy() );

            let current_context = this.page_context_collection.get(current_key);

            let current_page = "";
            if ( current_context != null) {
                 current_page = current_context.getPageID();
            }

           if( this.field_config.getFieldInfo(  current_page, input.getName()  ) != null)
                this.inputs.add( input );
       }

    }
        

  	
  	resetFreshInputs(){
  		 this.fresh_inputs = new ShortDAOSet();
  	}
  	
  	resetInputs(){
  		 this.inputs = new ShortDAOSet();
  	}
  	
  	
  	
  	importInputs( page_id,  new_inputs){
		if (new_inputs == null)
			return;

        for(let i=0; i < new_inputs.size(); i++)
        {
           let element = new_inputs.get(i);
           this.addInput( element );
        }
  	}
  	
  	updateInputsFromFresh(page_id){
         let fresh_inputs_copy= this.fresh_inputs.copy();
             
   	     for(let i=0; i < fresh_inputs_copy.size(); i++)
   	     {
   	     	let element =  fresh_inputs_copy.get(i);
   	     	
   	     	if (element != null)
   	     	{
                if( this.field_config.getFieldInfo(  page_id, element.getName()  ) != null)
				{
                   this.inputs.add( element );
                }
   	        }
   	     }
  	}

  	clear(){

  	     this.resetInputs();
  	     this.page_context_collection = new Map();
  	     this.current_key = "";
  	     this.previous_key = "";
  	     
  	     this.updateInputsFromFresh(""); // don't clear fields that are identified in initial (noname) page.
  	     this.resetFreshInputs();
	     this.global_fields = new ShortDAOSet();

  	}
  	
  	
  	
  	stripLeadingSpaces( aString ){
  		return aString.replace(/^\s+/g,``);
  	}
  	
  	stripTrailingSpaces(  aString ){
  		return aString.replace(/\s+$/g,``);
   	}
  	
  	
    toString(){
		let result = "";

		result += `brand=${this.brand}, `;
		result += `app_name=${this.app_name}, `;
		result += `script_name=${this.script_name}, `;
		result += `current_language=${this.current_language}, `;
		result += `current_key=${this.current_key}, `;
		result += `previous_key=${this.previous_key}, `;

		result += "\nFRESH INPUTS\n";

		result += this.fresh_inputs;

		result += "\nINPUTS\n";

		result += this.inputs;

		result += "\nPAGECONTEXTS\n";

		let values =  this.page_context_collection.values();
		for(let i=0; i < values.size(); i++)
		{
			let tmp = values.get(i);
			if (tmp != null)
			{
			   result +=  tmp + "\n";
			}
		}
		return result;
   }


}
