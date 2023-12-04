/*

{
    request: {
        header: {
            "X-OpenIDM-Username": "anonymous",
                "X-OpenIDM-Password": "anonymous",
                "X-OpenIDM-NoSession": "true",
        },
        url: {
            ref: "/openidm/selfservice/registration",
                envconfig: "/data/shortcircuit/envconf.xml",
        },
        method: GET,
            body_template: "./rest-register-request.template",
    },
    response:  {
        response_template: "./rest-register-response.template",
    },
}
*/


class RESTCall {

      constructor( { name, headers, url, action,  method, content_type, request_template, response_template } ){
          this.name              = name                || "";
          this.headers           = headers             || {};
          this.url               = url                 || {};
          this.method            = method              || "";
          this.action            = action              || "";
          this.content_type      = content_type        || "";
          this.request_template  = request_template    || "";
          this.response_template = response_template   || "";
      }

      getID(){ return this.name; }
      getMethod(){ return this.method; }
      getURL(){ return this.url; }
      getHeaders(){return this.headers;}
      getAction(){ return this.action; }
      getContentType(){ return this.content_type; }
      getRequestTemplateFileName(){ return this.request_template; }
      getResponseTemplateFileName(){ return this.response_template; }


      toString(){
          let result = "\n";
          result += "restCallID="                       + this.getID() + ", \n";
       	    result += "url="                            + JSON.stringify(this.getURL() ) + ", \n";
            result += "headers="                        + JSON.stringify( this.getHeaders() )+ ", \n";
            result += "method="                         + this.getMethod() + ", \n";
            result += "action="                         + this.getAction() + ", \n";
       		result += "contentType="                    + this.getContentType() + ", \n";
       		result += "requestTemplateFileName="        + this.getRequestTemplateFileName() + ", \n";
       		result += "responseTemplateFileName="       + this.getResponseTemplateFileName() + ", \n";
       		return result;

      }


      copy(){
      	   return new RESTCall(this );
      }



      	toJSONObject()
      	{
            return {
                name: this.name,
                url: this.url,
                action: this.action,
                content_type: this.content_type,
                request_template: this.request_template,
                response_template: this.response_template,
            };
      	}

      	toJSON()
      	{
      			return JSON.stringify(this.toJSONObject());
      	}


}

module.exports = RESTCall;
