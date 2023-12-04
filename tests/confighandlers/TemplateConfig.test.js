var TemplateConfig = require("../../classes/confighandlers/TemplateConfig.js");

var json = {
  "meta": {
      "type": "dædalus",
      "version": "1.0",
      "servicetype":  "web",
      "config_root": "",
      "config_type": "templates", // use json schema?
    },

    "pages": {
        "_init": {
              filename: "templates/1.template",
              engine: "handlebars",
        },
        "PRINTPAGE-USER_DATA-PP01-DEFAULT": {
              filename: "templates/2.template",
              engine: "handlebars",
        },
    }
};




     var tc = new TemplateConfig( json );
    // var validator = tc.validateString('_init', "MANDATORY_FIELD", "TESTING");
  //   console.log( validator );

     console.log(tc.toString());


console.log(     tc.getTemplateString("_init") );
