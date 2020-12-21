const Cart = require('./model');
exports.cart = async(uid) => {
    console.log(uid);
    let carts = await Cart.find().populate({
        path: "items.productId",
        select: "name price"
    }).populate({ path: "user", select: "_id name role" }, );
    carts = carts.filter(cart => cart.user._id == uid);
    console.log(carts)
    return carts[0];
};
exports.addItem = async payload => {
    const newItem = await Cart.create(payload);
    return newItem;
}