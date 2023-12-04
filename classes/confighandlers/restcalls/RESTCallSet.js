import RESTCall from "../../dataobjects/RESTCall.js";/*{        register_init: {            request: {                header: {                    "X-OpenIDM-Username": "anonymous",                    "X-OpenIDM-Password": "anonymous",                    "X-OpenIDM-NoSession": "true",                },				url: {					ref: "/openidm/selfservice/registration",					envconfig: "/data/shortcircuit/envconf.xml",				},				method: GET,				request_template: "./rest-register-request.template",			},            response:  {                response_template: "./rest-register-response.template",            },        } ,    } // end rest functions */class RESTCallSet {   constructor(json){	   this.data = new Map();	   Object.keys(json).forEach( (rest_id) => {		   let rest_info = json[rest_id];		   this.load_rest_call( rest_id, rest_info );	   });   }	   load_rest_call( rest_id, json ){	   // { name, headers, url, action,  content_type, request_template, response_template }	   console.log(`ID: ${rest_id}\n`)	  // Object.keys(json).forEach( (key) => {		   let rest_info = json;		   let parameters = {};		   parameters.name = rest_id;		   if(rest_info.request != null)		   {			   parameters.headers 			= rest_info.request.header;			   parameters.url 				= rest_info.request.url;			   parameters.method 			= rest_info.request.method;			   parameters.request_template 	= rest_info.request.request_template;		   }		   if(rest_info.response != null)		   {				parameters.response_template = rest_info.response.response_template;		   }			let rest_call = new RESTCall(parameters);		   this.add(rest_call);	 //  });   }      size(){   		return this.data.size;   }   getRestCall( rest_id ){    	return this.data.get(rest_id);   }   add( rest_call ){       this.data.set( rest_call.getID(), rest_call);   }   toString(){	let result = "";	this.data.forEach( (rest_call, rest_id) => {		result += `${rest_id}: ${rest_call}\n`;	});	return result;   }}module.exports = RESTCallSet;