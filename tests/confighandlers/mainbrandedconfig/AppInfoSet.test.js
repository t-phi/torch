let AppInfoSet = require("../../../classes/confighandlers/mainbrandedconfig/AppInfoSet.js");

let json = {
        _all: {
                globalvalidations: "globalvalidations.jfg"
        },

        registration: {
                _common:
                    {
                            location: "registration/_common/",
                            validations: "validations.jfg",
                            restcalls: "restcalls.jfg",
                            fieldnames: "fieldnames.jfg",
                            templates: "templates.jfg",
                    },

                EN: {
                        location: "registration/EN/",
                        pageflow: "pageflow.jfg",
                        templates: "templates.jfg",
                        fieldnames: "fieldnames.jfg",
                },

                FR: {
                        location: "registration/FR/",
                        pageflow: "pageflow.jfg",
                        templates: "templates.jfg",
                        fieldnames: "fieldnames.jfg",
                },

        }
};



     let ais = new AppInfoSet( json );

     console.log(ais.toString());
