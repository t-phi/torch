let PageDirectiveValidate = require("./dataobjects/PageDirectiveValidate.js");
let PageDirectiveLocalAction = require("./dataobjects/PageDirectiveLocalAction.js");
let PageDirectiveRESTCall = require("./dataobjects/PageDirectiveRESTCall.js");
let InputSet = require("./dataobjects/InputSet.js");
let Input = require("./dataobjects/Input.js");
//let PageDirectiveValidateAction = require("./dataobjects/PageDirectiveValidateAction.js");
//let PageDirectiveAction = require("./dataobjects/PageDirectiveAction.js");
//let PageDirectiveTask = require("./dataobjects/PageDirectiveTask.js");


class PageDirective {

	
      constructor( name, json ){

		  console.log(json);
		  let {  next,  next_true,  next_false, actions} = json;
		  console.log(next_true);

      	  //  this.tag_type           = tag_type      || "";
            this.name               = name          || "";
            this.next               = next          || "";
            this.next_true          = next_true     || "";
            this.next_false         = next_false    || "";
            this.json               = actions       || [];

            this.validations = [];
		  console.log(this.next_true);

          for(let i=0; i < actions.length; i++)
          { 
          	let tmp          = actions[i];
			  console.log(tmp);
          	if( tmp.validation        != null)  { this.processValidate( tmp.validation );        }
  //       	if( tmp.validateAction  != null)  { this.processValidateAction( tmp.validateAction );  }
  //       	if( tmp.action          != null)  { this.processAction( tmp.action );          }
          	if( tmp.localAction     != null)  { this.processLocalAction( tmp.localAction ); 	}
          	if( tmp.restCall        != null)  { this.processRESTCall( tmp.restCall );        }
          }             
      }
      
    processValidate( action ){
   	   let {error_code, input_name, display_value, error_field_name} = action;

   	   this.validations.push(  new PageDirectiveValidate(
		   {
			   error_code: error_code,
			   input_name: input_name,
			   error_field_name: error_field_name,
			   display_value: display_value
		   }
	   )  );
    }


      processLocalAction( action){
      	
		  let {class_name, method, display_value, error_field_name} = action;

		  console.log(class_name, method);

		  let parametersAndImports = this.processChildren( action.parameters, action.imports );
		  let {parameters_input, imports_input, parameters_field, imports_field} = parametersAndImports;
		  this.validations.push(  new PageDirectiveLocalAction({
			  class_name: class_name,
			  method: method,
			  error_field_name: error_field_name,
			  parameters_input: parameters_input,
			  imports_input: imports_input,
			  parameters_field: parameters_field,
			  imports_field: imports_field
		  }));
      }


      processRESTCall( rest ){

		let {id, host, server, method, error_field_name		} = rest;
		let parametersAndImports = this.processChildren( rest.parameters, rest.imports );
		let {parameters_input, imports_input, parameters_field, imports_field} = parametersAndImports;

		this.validations.push(  new PageDirectiveRESTCall( {

		   	id: id,
			host: host,
			server: server,
			method: method,
			error_field_name: error_field_name,
			parameters_input: parameters_input,
			imports_input: imports_input,
			parameters_field: parameters_field,
			imports_field: imports_field

		}));
      }



      processChildren( parameters, imports ){
 
        let result = {};
       	let parameters_input = new InputSet();
       	let parameters_field = new InputSet();
       	let imports_input    = new InputSet();
       	let imports_field    = new InputSet();

		parameters.forEach( (parameters_item) => {
			let results = this.processParameter(parameters_item);
			let {name, input_value, field_value} = results;

			if( (input_value != null) && (input_value !== "" ) )
				parameters_input.add( new Input({ name: name, value: input_value})  );



			if( (field_value != null) && ( field_value !== "") )
				parameters_field.add( new Input({ name: name, value: field_value}) );
		});

		   imports.forEach( (import_item) => {
			   let results = this.processImports(import_item);
			   let {input_name, return_value, field_name} = results;

			   if( (input_name!= null) && (input_name !== "" ) )
				   imports_input.add( new Input({ name: input_name, value: return_value})   );

			   if( (field_name != null) && ( field_name !== "") )
				   imports_field.add( new Input({ name: field_name, value: return_value}) );
		   });

   	
			result.parameters_input		= parameters_input;
			result.imports_input		= imports_input;
			result.parameters_field		= parameters_field;
			result.imports_field 		= imports_field;

			return result;
     }



      	processParameter(parameter)
      	{
              	let {name, input_value, field_value} = parameter;

                return {
					name: name,
	 				input_value: input_value,
					field_value: field_value
				};
      	}

      	processImports(imports)
      	{
      	   let {input_name, field_name, return_value} = imports;
		   return {
			   input_name: input_name,
			   field_name: field_name,
			   return_value: return_value
		   };
      	}

      	

      getTagType(){ return this.tag_type; }
      getNextPage( flag){
		  if ( flag == null )
			  return this.next;

		  return (flag)?this.getNextTrue():this.getNextFalse();
	  }
      getNextTrue(){ return this.next_true; }
      getNextFalse(){ return this.next_false; }
      getID(){ return this.name; }
      
      getNumSubTasks(){ return this.validations.length; }
      getSubTask(i){ return this.validations[i];}


      /*
   		readExternalParam (String fileName, String xpath)
   		{
   				String result = "Error reading external parameter";
   				try
   				{
   					NodeList importedNode = XMLHelper.getNodeList("IAU", fileName);
   					if (importedNode != null)
   					{
   						Node target = XPathAPI.selectSingleNode(importedNode.item(0), xpath);
   						if (target != null)
   							result = target.getFirstChild().getNodeValue();
   					}
   				}
   				catch (Exception e)
   				{
   					e.printStackTrace();
   				}
   				return result;
   		}
   		*/
      
      toString(){
   		let result = "";
   		result += "tagType="        + this.getTagType()   + ", ";
   		result += "nextPage="       + this.getNextPage()  + ", ";
   		result += "nextTrue="       + this.getNextTrue()  + ", ";
   		result += "nextFalse="       + this.getNextFalse()  + ", ";

   		result += "\n-->  Validations\n";
   		for (let i=0; i < this.validations.length; i++)
   		{
   		    result += " ...      " + this.getSubTask(i)	 + "\n";
   		}
   		return result;
      	
      }
      
		copy(){
      	   return new PageDirective(this);
      	}
      
}

module.exports  = PageDirective;