const productRoutes = require('./product/routes')
const cartRoutes = require("./cart/routes")
const userRoutes = require('./users/routes')
const userRepo = require('./users/repository');
const validate=require("./middlewares/authmiddleware")
module.exports = app => {
    // app.get("/product", validateUser, productRoutes)
    app.use("/product", validate.validateUser, productRoutes);
    app.use("/cart", validate.validateUser, cartRoutes);
    app.use("/user/", userRoutes);

    // app.use('/validateJwt/:jwt',validateJWT)
}

// const validateJWT=(req,res)=>{
//     console.log(req.params.jwt)
//     let verified = jwt.verify(req.params.jwt, req.app.get('secretKey'));
      
// }