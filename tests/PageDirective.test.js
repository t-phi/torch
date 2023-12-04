let PageDirective = require("../classes/PageDirective.js");


let name  = "check_target";
let json = {
        next_true: ":decodeTarget",
        next_false: ":set_default_target",
        actions: [
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

        ], // end actions
    }; //end decision



let pd = new PageDirective( name, json );

console.log(pd.toString());
