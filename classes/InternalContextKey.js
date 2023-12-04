
class InternalContextKey {

	  
	  constructor(
	    {
	        uid,
	        brand,
	        app_id
	    }
	  )
	  {
		  	this.uid     = uid;
		  	this.brand   = brand;
		  	this.app_id   = app_id;
	  }
	  
	  
	  makeKey(){
	        return `${this.uid}-${this.brand}-${this.app_id}`;
	  }
	  
}

module.exports = InternalContextKey;
