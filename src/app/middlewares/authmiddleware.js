
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
exports.validateUser = (req, res, next) => {
    // console.log(req.headers['x-access-token'])
    // console.log(req.app.get('secretKey'))
    try {

        let verified = jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'));
        if (verified) {
            // console.log(verified);
            return next();
        }
        // console.log("verified")
    } catch (_err) {
        console.log(_err)
        // return false
        //
    }
    // console.log(req.headers['x-access-token']);
    res.status(401).json({status:false,message:"Unauthorized Access"})
}

