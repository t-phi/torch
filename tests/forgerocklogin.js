const axios = require('axios');


let authenticate = {
    method: 'POST',
    url: `https://fidc.ronclapman.com/am/json/realms/root/realms/alpha/authenticate?authIndexType=service&authIndexValue=PasswordGrant`,
    headers: {
        'Content-Type': 'application/json',
        'Accept-API-Version': 'resource=2.1, protocol=1.0'
    }
};



const customAxios = async (config) => {
    try {
        const response = await axios(config);
        return response;
    } catch (error) {
        // Log the error as you see fit
        if (error.response) {
            console.error('Error status code:', error.response.status);
            console.error('Error details:', error.response.data);
        } else if (error.request) {
            console.error('No response was received', error.request);
        } else {
            console.error('Error setting up the request:', error.message);
        }

        // Optionally, you can throw the error again if you want the calling function to know an error occurred
        throw error;
    }
}

const initResponse = customAxios({ ...authenticate });


try {
    // Using axios to make the request to the backend
    console.log("about to call");
    axios.post('https://example.ronclapman.com:6443/api/authenticate', {
        'userId': "test",
        'password': "test"
    }).then(
        (response) => {

            console.log(response);

            const data = response.data;
            const token = data.token;
            console.log("/login token: " + token);

            if (data.success) {
                console.log("Success");
                // res.cookie(COOKIE_NAME, token, { secure: true, httpOnly: true, domain: '.ronclapman.com' });
                // res.render('welcome', { userId: req.body.userId });
            } else {
                console.log("Fail");
                // res.render('signinForm', { errorMessage: 'Invalid credentials. Please try again.' });
            }

        },
        (oops) =>
        {
            console.log(oops);
        }
    ).catch(  (err) => {
        console.log(err);
    });


} catch (error) {
    console.error("Error during authentication:", error);
    //res.status(500).send('Error during authentication.');
}