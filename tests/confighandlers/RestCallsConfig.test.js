let RESTCallsConfig = require("../../classes/confighandlers/RESTCallsConfig.js");

let json = {
    meta: {
        type: "dædalus",
        version: "1.0",
        servicetype:  "web",
        config_root: "",
        config_type: "rest_config", // use json schema?
    },

    rest_functions: {
        register_init: {
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
                method: "GET",
                request_template: "./rest-register-request.template",
            },
            response:  {
                response_template: "./rest-register-response.template",
            },
        } ,
    } // end rest functions
} // end object


let rcc = new RESTCallsConfig(json);

console.log( rcc.toString() );
