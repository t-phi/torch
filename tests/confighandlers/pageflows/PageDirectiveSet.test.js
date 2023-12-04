const PageDirectiveSet = require("../../../classes/confighandlers/pageflows/PageDirectiveSet.js");

const json = {

        {validation: {
                error_code: "MANDATORY_FIELD",
                input_name: "TARGET",
                display_value: "",
            }
        }, // end validation

    {localAction: {
        class_name: ".plugins.localactions.StandardLocalValidationsPlugin",
        method: "decodeURL",
        parameters: [
            {name: "value1", input_value: "default_TARGET" }
        ],
        imports: [
            {input_name: "TARGET", return_value: "decodedTarget" }
        ],
    }}, // end localaction


  };




     var pds = new PageDirectiveSet( json );

     console.log(pds.toString());
