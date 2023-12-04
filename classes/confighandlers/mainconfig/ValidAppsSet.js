var ValidApp = require("../../dataobjects/ValidApp.js");

class ValidAppsSet {

    constructor(json){
        this.data = [];
        
		   	for(var i=0; i < json.length; i++)
		   	{

		   		   this.add(  new ValidApp({name: json[i]})  );

   		 	}
   }

   add(element){
       this.data.push(element);
   }

   size(){
   	return this.data.length;
   }

   get(i){
   	return this.data[i];
   }

   toString(){
   	var tmp = "";
   	for(var i=0; i < this.size(); i++)
   	    tmp += this.get(i) + "\n";
   	return tmp;
   }

   isValidApp(appName){
       /*inefficient*/
       for(var i=0; i < this.size(); i++)
       {
       	   var tmp = this.get(i);
       	   if ( tmp.name() == appName)
       	   {
      	   	return true;
       	   }

       }
       return false;
   }



   appList(){
   	var copy = [];
   	for(var i=0; i < this.size(); i++)
   	{
   		copy.add(data.get(i));
   	}
   	return copy;

   }



}


module.exports = ValidAppsSet;
