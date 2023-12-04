class SoapCall {

      constructor( { name, url, action,  content_type, request_template, response_template } ){
          this.name              = name                || "";
          this.url               = url                 || "";
          this.action            = action              || "";
          this.content_type      = content_type        || "";
          this.request_template  = request_template    || "";
          this.response_template = response_template   || "";
      }

      getID(){ return this.name; }
      getURL(){ return this.url; }
      getSoapAction(){ return this.action; }
      getContentType(){ return this.content_type; }
      getRequestTemplateFileName(){ return this.request_template; }
      getResponseTemplateFileName(){ return this.response_template; }


      toString(){
       		var result = "";
       		result += "soapCallID="                    + this.getID() + ", ";
       		result += "soapURL="                       + this.getURL() + ", ";
       		result += "soapAction="                    + this.getSoapAction() + ", ";
       		result += "contentType="                   + this.getContentType() + ", ";
       		result += "requestTemplateFileName="       + this.getRequestTemplateFileName() + ", ";
       		result += "responseTemplateFileName="      + this.getResponseTemplateFileName() + ", ";
       		return result;

      }


      copy(){
      	   return new SoapCall(this );
      }



      	toJSONObject()
      	{

      		var obj = {
            name:               this.name              ,
            url:                this.url               ,
            action:             this.action            ,
            content_type:       this.content_type      ,
            request_template:   this.request_template  ,
            response_template:  this.response_template ,
      		};
      		return obj;
      	}

      	toJSON()
      	{
      			return JSON.stringify(this.toJSONObject());
      	}


}

module.exports = SoapCall;
