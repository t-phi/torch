let AppConfig = require("../../classes/confighandlers/AppConfig.js");

let json =  {
    meta: {
    type:           "dædalus",
        version:        "1.0",
        servicetype:    "web",
        app_root:       "apps",
        config_type:    "app_config",
        language:       "EN",
},
apps: {
    _all: {
        globalvalidations:  "globalvalidations.jfg"
    },

    registration: {
        _common:
        {
            location:     "registration/_common/",
            validations:  "validations.jfg",
            restcalls:    "restcalls.jfg",
            fieldnames:   "fieldnames.jfg",
            templates:    "templates.jfg",
        },

        EN: {
            location:     "registration/EN/",
                pageflow:     "pageflow.jfg",
                templates:    "templates.jfg",
                fieldnames:   "fieldnames.jfg",
        },

        FR: {
            location:     "registration/FR/",
            pageflow:     "pageflow.jfg",
            templates:    "templates.jfg",
            fieldnames:   "fieldnames.jfg",
        },

    }
}
}





     let ac = new AppConfig( json );
     console.log(ac.toString());
