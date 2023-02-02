const jwt = require('jsonwebtoken')

module.exports = (credentials = []) => {
    return (req, res, next) => {
        //Allow for strings and array
        if (typeof credentials === String) {
            credentials = [credentials]
        }
        console.log("AUthorization middleware")
        //find token in header
        const AccessToken = req.headers["authorization"];
        if (!AccessToken) {
            res.status(401).send("You Don't have any Valid Token");
        }
        else {

            const tokenbody = AccessToken.slice(7);
            jwt.verify(tokenbody, process.env.Access_Secret_Token, (err, decoded) => {
                if (err) {
                    console.log("Token Error");
                    res.status(401).send("Token Error")
                }
                //no Errror
                // check the token has the correct score
                // if (credentials.length > 0)  // if credentials exist
                // {
                //     if (decoded.scopes &&
                //         decoded.scopes.length &&
                //         credentials.some((cred) => decoded.scopes.indexOf(cred) >= 0)) {
                //         next();
                //     }
                //     else {
                //         console.log("Token Scope Error");
                //         res.status(401).send("Token Scope Error")
                //     }


                // }

                //if no credentials
                next();

            })

        }

    }
}