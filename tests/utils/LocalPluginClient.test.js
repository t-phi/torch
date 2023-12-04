var LocalPluginClient = require("../../classes/utils/LocalPluginClient.js");


var lpc = LocalPluginClient.mapClient( {
    location: "../plugins/localactions/LocalActionTest.mjs",
    class_name: "LocalActionTest",
    method_name: "test",
    parameters: {a: "A", b: "B", c: "C"},
    token: "34567890--0987",
});

lpc.then((result) => {do_this(result)});
lpc.catch((err) => {
    console.log(`ERROR: ${err.message}`);
});


function do_this(info)
{
    console.log(`FINISH THIS: ${info}`);
}