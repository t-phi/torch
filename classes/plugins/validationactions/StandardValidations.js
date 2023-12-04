
class StandardValidations {

   equals(input)     {
        let v1 =  input.get("value1");
        let v2 =  input.get("value2");
        return v1 === v2;
    }
    
   notEqual(input)     {  return ! this.equals(input);   }
    
    contains( input)   {
        let v1 = input.get("value1");
        let v2 = input.get("value2");
        return (v1.indexOf(v2) >= 0);
    }
 
    doesNotContain(input)   {  return ! this.contains(input); }
    
    
    isValidDate(input){

    	let year  = input.get("YYYY");
    	let month = input.get("MM");
    	let day   = input.get("DD");

	    let date = new Date(year, month-1, day);

        if( date.getFullYear() === year)
            if( date.getMonth() === month-1 )
                if(date.getDay() === day)
                    return true;
		 return false;
    }
    
    isInvalidDate( input){ return ! this.isValidDate( input ); }


  
    
    isPastDate(input){
        let year  = input.get("YYYY");
        let month = input.get("MM");
        let day   = input.get("DD");

        let date = new Date(year, month-1, day);
    	        
        let currentDate = new Date();

        return (date < currentDate);
       
    }


    isPresentDate( input){
        let year  = input.get("YYYY");
        let month = input.get("MM");
        let day   = input.get("DD");

        let date = new Date(year, month-1, day);

        let currentDate = new Date();

        return (date.getTime() === currentDate.getTime());
    }


    isFutureDate( input){
        let year  = input.get("YYYY");
        let month = input.get("MM");
        let day   = input.get("DD");

        let date = new Date(year, month-1, day);

        let currentDate = new Date();

        return (date > currentDate);
    }

}
