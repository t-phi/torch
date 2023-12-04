const https = require('https');
const passport = require('passport');
const OAuth2Strategy = require("passport-oauth2").Strategy;
const GoogleStrategy = require("passport-google").Strategy;

var url = 'https://us-central1-daedalus-lab-fac9ff.cloudfunctions.net/function-1'l
var oauth2_clientid = '106182037141465471014';
var key = '68b50b947a43f91dfd25ac1125c47e2486abd89e';
var name_short = 'function-agent';
var name_long = 'function-agent@daedalus-lab-fac9ff.iam.gserviceaccount.com';
console.log("hello");

passport.use(new GoogleStrategy({
    authorizationURL: 'https://www.example.com/oauth2/authorize',
    tokenURL: 'https://www.example.com/oauth2/token',
    clientID: '106182037141465471014',
    clientSecret: '68b50b947a43f91dfd25ac1125c47e2486abd89e',
    callbackURL: "http://localhost:3000/auth/example/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ exampleId: profile.id }, function (err, user) {
      console.log('Authenticated: ' + user);
      return cb(err, user);
    });
  }
));

obj.server.get("/auth/oauth2", middleware.asyncFlag);
obj.server.get("/auth/oauth2", passport.authenticate("oauth2"));
obj.server.get("/auth/oauth2/callback", middleware.asyncFlag);
obj.server.get("/auth/oauth2/callback", passport.authenticate("oauth2", {failureRedirect: "/login"}));
obj.server.get("/auth/oauth2/callback", redirect);

let request = https.get('https://us-central1-daedalus-lab-fac9ff.cloudfunctions.net/function-1', {headers:{ Authorization: ' Bearer 106182037141465471014' }}
, (res) => {
    if (res.statusCode !== 200) {
      console.error(`Did not get an OK from the server. Code: ${res.statusCode}`);
      res.resume();

    }

    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
      //  console.log("DATA CHUNK: [" + chunk + "]");
    });

    res.on('close', () => {
      console.log('Retrieved all data: ' + data);

    });
});
