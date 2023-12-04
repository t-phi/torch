var ValidationsConfig = require("../../classes/confighandlers/ValidationsConfig.js");

var json = {
  "meta": {
    "type": "dædalus",
    "version": "1.0",
    "servicetype":  "web",
    "config_root": "",
    "config_type": "validations", // use json schema?
  },

  "pages": {
      "_init": {
            MANDATORY_FIELD: { regex: "TeST", flags: "i"  }
      },
      "PRINTPAGE-USER_DATA-PP01-DEFAULT": {
            MANDATORY_FIELD: { regex: ".+"  }
      },

  }
}




     var vc = new ValidationsConfig( json );
     var validator = vc.validateString('_init', "MANDATORY_FIELD", "TESTING");
     console.log( validator );

     console.log(vc.toString());
