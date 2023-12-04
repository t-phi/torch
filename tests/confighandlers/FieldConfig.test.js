var FieldConfig = require("../../classes/confighandlers/FieldConfig.js");

var json = {
  "meta": {
      "type": "dædalus",
      "version": "1.0",
      "servicetype":  "web",
      "config_root": "",
      "config_type": "fields", // use json schema?
    },

    "pages": {
      "_init": {
          UserID:           {   default_value:  "",            display_value:   "UserID",            description:    "" },
          Brand:            {   default_value:  "",            display_value:   "BrandID",           description:    "" },
          DataSource:       {   default_value:  "forgerock",   display_value:   "Datasource",        description:    "" },
          RecordType:       {   default_value:  "Person",      display_value:   "Recordtype",        description:    "" },
          serviceUtility:   {   default_value:  "",            display_value:   "ServiceUtility",    description:    "", viewable: "false" },
          default_TARGET:   {   default_value:  "http://www.gov.ab.ca",            displayValue:   "TARGET",            description:    "" },
      },
        "PRINTPAGE-USER_DATA-PP01-DEFAULT": {
            UserID:           {   default_value:  "",            display_value:   "UserID",            description:    "" },
            Brand:            {   default_value:  "",            display_value:   "BrandID",           description:    "" },
            DataSource:       {   default_value:  "forgerock",   display_value:   "Datasource",        description:    "" },
            RecordType:       {   default_value:  "Person",      display_value:   "Recordtype",        description:    "" },
            serviceUtility:   {   default_value:  "",            display_value:   "ServiceUtility",    description:    "", viewable: "false" },
            default_TARGET:   {   default_value:  "http://www.gov.ab.ca",            display_value:   "TARGET",            description:    "" },
        },
    }
};




     var fc = new FieldConfig( json );

     console.log(fc.toString());
