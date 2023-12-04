/**
 * TODO(developer): Uncomment these variables before running the sample.
 */

// Cloud Functions uses your function's url as the `targetAudience` value
// const targetAudience = 'https://project-region-projectid.cloudfunctions.net/myFunction';
// For Cloud Functions, endpoint (`url`) and `targetAudience` should be equal
// const url = targetAudience;


const {GoogleAuth} = require('google-auth-library');
const auth = new GoogleAuth();

var url = 'https://us-central1-daedalus-lab-fac9ff.cloudfunctions.net/function-1';
var targetAudience = 'https://us-central1-daedalus-lab-fac9ff.cloudfunctions.net/function-1';

async function request() {
  console.info(`request ${url} with target audience ${targetAudience}`);
  const client = await auth.getIdTokenClient(targetAudience);
  const res = await client.request({url});
  console.info(res.data);
}

request().catch(err => {
  console.error(err.message);
  process.exitCode = 1;
});
