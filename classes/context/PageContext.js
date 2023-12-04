
class PageContext {

  	
  	constructor( {key_token, language, state, page_id} ){
  	   this.language    = language;
  	   this.state       = state;
  	   this.page_id     = page_id;
  	   this.key_token   = key_token;
  	}
  	
  	
  	getLanguage() { return this.language; }
  	getState() { return this.state; }
  	getPageID() { return this.page_id; }
  	getKeyToken() { return this.key_token; }
  	
  	
  	
  	setLanguage( language ){ this.language = language; 	}
    setState( state ){ 	this.state = state; 	}
  	setPageID( page_id ){	this.page_id = page_id 	}
  	toString(){
  	  let result = "";
  	  
  	  result += "key_token=" + this.key_token + ",";
  	  result += "language=" + this.language + ",";
  	  result += "state=" + this.state + ",";
  	  result += "page_id=" + this.page_id + ",";
  	  
  	  
  	  return result;
  	}

}
module.exports = PageContext;