var Input = require("./Input.js");

class InputSet {

   constructor(){
   	this.data = new Map();
   }


   forEach(input)
   {
     return this.data.forEach(input);
   }
   add(input){
     if(  input.constructor.name != 'Input')
          return;

     this.data.set(input.getName(), input);
   }

   size(){
   	return this.data.size();
   }

   get( key ){
   	  return this.data.get( key );
   }

   getValue( key ){
   	    var result = "";
        var tmp = this.get( key );
        if( tmp != null)
        {
        	result = tmp.getValue();
        }
        return result;
   }

   keys(){
        return this.data.keys();         // returns iterator
   }
   values(){
        return this.data.values();         // returns iterator
   }

   clear(){
   	 this.data = new Map();
   }

   toString(){
   	var result = "";

    this.data.forEach( (element, key) => {
      if (element != null)
       {
         result +=  element.toString() + "\n";
       }
    });
   	return result;
   }


   copy(){
   	 var tmp = new InputSet();

     this.data.forEach( (element, key) => {
       if (element != null)
    		{

          //console.log(`clone: ${key}=>${element}`);
    		     var clone =  element.copy()
    		     tmp.add(clone);
    		}

     });

   	return tmp;

   }


   type() {return this.constructor.name};

}


module.exports = InputSet;
