const productRoutes = require('./product/routes')
const cartRoutes = require("./cart/routes")
module.exports = app => {
    app.use("/product", productRoutes);
    app.use("/cart", cartRoutes);
}