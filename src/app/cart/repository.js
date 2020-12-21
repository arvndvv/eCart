const Cart = require('./model');
exports.cart = async(uid) => {
    // console.log(uid);

    try {

        let carts = await Cart.find().populate({
            path: "items.productId",
            select: "name price"
        }).populate({ path: "user", select: "_id name role" }, );
        // console.log(carts)
        if (carts.length > 0) {
            carts = carts.filter(cart => cart.user._id == uid);
            return carts[0];
        } else {
            throw new Error('Cart is empty')
        }
        // console.log(x)

    } catch (err) {
        console.log(err)
    }

};
exports.addItem = async payload => {

    const newItem = await Cart.create(payload);
    return newItem;
}