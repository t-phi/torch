var ValidationsInfoSet = require("../../../classes/confighandlers/validations/ValidationsInfoSet.js");

var json = {
      "_init": {
            MANDATORY_FIELD: { regex: ".+"  }
      },
      "PRINTPAGE-USER_DATA-PP01-DEFAULT": {
            MANDATORY_FIELD: { regex: ".+"  }
      },

  };




     var vis = new ValidationsInfoSet( json );

     console.log(vis.toString());
