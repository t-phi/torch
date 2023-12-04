
class LocalPluginClient {

    static async test() {
        return LocalPluginClient.generalClient(
            {
                location: "../plugins/localactions/LocalActionTest.mjs",
                class_name: "LocalActionTest",
                method_name: "test",
                parameters: {values: [3, 5, 20, 3, 31]},
                token: "TEST000000000000"
            }
        );
    }

    static booleanClient (parameters)
    {
        return LocalPluginClient.generalClient(parameters);
    }


    static mapClient (parameters)
    {
        return LocalPluginClient.generalClient(parameters);
    }

    static async generalClient(
        {
            location,
            class_name,
            method_name,
            parameters,
            token
        }
    ) {
        let result = null;
        parameters["#token"] = token;

        await import(location)
            .then((module) => { /// this is an asynchronous callback....
                const m = module[class_name];
                result = Reflect.apply(m[method_name], undefined, parameters);
            })
            .catch((err) => {
                throw (err)
            });

        return result;

    }


}
//LocalPluginClient.test();
module.exports = LocalPluginClient;

