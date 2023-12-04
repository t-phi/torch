var ValidAppsSet = require("../../../classes/confighandlers/mainconfig/ValidAppsSet.js");

var json = [
        "registration",
        "enrolment",
        "modification",
        "expiredPassword",
        "forgottenPassword",
        "challengeResponse",
        "lockout",
        "forcePasswordChange",
        "delegation",
        "bulk_registration",
        "bulk_enrolment",
        "webRouter",
        "adminmain",
        "autologout"
    ];



     var vas = new ValidAppsSet( json );

     console.log(vas.toString());
