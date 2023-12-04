var CustomerBrandSet = require("../../../classes/confighandlers/mainconfig/CustomerBrandSet.js");



var json = {
      admin: {
        "EN": {
            location: "admin",
            apps_config: "appmain-e.jfg",
        },
        "FR": {
            location: "admin",
            apps_config: "appmain-f.jfg",
        }
      },
      pm: {
        "EN": {
            location: "public_mobile",
            apps_config: "appmain-e.jfg",
        },
        "FR": {
            location: "public_mobile",
            apps_config: "appmain-f.jfg",
        }
      },

  };

 var cbs = new CustomerBrandSet( json );

 console.log(cbs.toString());
