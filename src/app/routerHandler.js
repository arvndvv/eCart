const productRoutes = require('./product/routes')
const cartRoutes = require("./cart/routes")
const userRoutes = require('./users/routes')
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
const userRepo = require('./users/repository');
module.exports = app => {
    // app.get("/product", validateUser, productRoutes)
    app.use("/product", validateUser, productRoutes);
    app.use("/cart", validateUser, cartRoutes);
    app.use("/user/", userRoutes);
}
const validateUser = (req, res, next) => {
    console.log(req.headers['x-access-token'])
    console.log(req.app.get('secretKey'))
    try {
        let verified = jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'));
        if (verified) {
            // console.log(verified);
            return next();
        }
        console.log(verified)
    } catch (_err) {
        console.log(_err)
        //
    }
    // console.log(req.headers['x-access-token']);


    res.status(400).json({
        Error: 'Not Logged In! Please login to continue'
    })
}

// const restrictUser = async(req, res, next) => {
//     try {
//         let reqToken = req.headers['x-access-token'];
//         // console.log(jwtDecode(reqToken).id)
//         const userid = jwtDecode(reqToken).id;
//         let user = await userRepo.findUser({ _id: userid });
//         // console.log(user);
//         if (user.role === 'user') {
//             console.log('yess')
//             return next();
//         }
//     } catch (_err) {

//         //
//     }
//     // console.log(req.headers['x-access-token']);


//     res.status(400).json({
//         Error: 'Not Authenticated for this feature!'
//     })
// }