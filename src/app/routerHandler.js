const productRoutes = require('./product/routes')
const cartRoutes = require("./cart/routes")
const userRoutes = require('./users/routes')
const jwt = require('jsonwebtoken');
module.exports = app => {
    app.use("/product", validateUser, productRoutes);
    app.use("/cart", validateUser, cartRoutes);
    app.use("/user/", userRoutes);
}

const validateUser = (req, res, next) => {

    try {
        let verified = jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'));
        if (verified) {
            // console.log(verified);
            return next();
        }
    } catch (_err) {

        //
    }
    // console.log(req.headers['x-access-token']);


    res.status(400).json({
        Error: 'Not Logged In! Please login to continue'
    })

    //

}