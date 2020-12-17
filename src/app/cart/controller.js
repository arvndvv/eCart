const cartRepository = require('./repository');
const productRepository = require('../product/repository');
// const { db } = require('../product/model');
const cartmodel = require('../cart/model');
exports.addItemToCart = async(req, res) => {
    //  console.log(req.body);
    const {
        productId
    } = req.body;
    const quantity = Number.parseInt(req.body.quantity);
    try {
        let cart = await cartRepository.cart();
        console.log(cart);
        let productDetails = await productRepository.productById(productId);
        if (!productDetails) {
            return res.status(500).json({
                type: "Not Found",
                msg: "Invalid request"
            })
        }
        //if cart exist
        if (cart) {
            //check if index exist
            const indexFound = cart.items.findIndex(item => item.productId.id == productId);
            //this removes an item from the cart if the quantity is set to zero, we can use this method to remove an item from the list ---
            if (indexFound !== -1 && quantity <= 0) {
                cart.items.splice(indexFound, 1);
                if (cart.items.length == 0) {
                    cart.subTotal = 0;
                } else {
                    cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
                }
            } else if (indexFound !== -1) {
                cart.items[indexFound].quantity = cart.items[indexFound].quantity + quantity;
                cart.items[indexFound].total = cart.items[indexFound].quantity * productDetails.price;
                cart.items[indexFound].price = productDetails.price;
                cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
            } //check if quantity is greater than 0 then add item to items array
            else if (quantity > 0) {
                cart.items.push({
                    productId: productId,
                    quantity: quantity,
                    price: productDetails.price,
                    total: parseInt(productDetails.price * quantity)
                });
                cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);

            }
            //if quantity of price is 0 throw the error
            else {
                return res.status(400).json({
                    type: "Invalid",
                    msg: "Invalid request"
                })
            }
            let data = await cart.save();
            res.status(200).json({
                type: "success",
                msg: "Process Successfull",
                data: data
            })
        }
        // this creates a new cart and then adds the item to the cart that has been created
        else {
            const cartData = {
                items: [{
                    productId: productId,
                    quantity: quantity,
                    total: parseInt(productDetails.price * quantity),
                    price: productDetails.price
                }],
                subTotal: parseInt(productDetails.price * quantity)
            }
            cart = await cartRepository.addItem(cartData)
                //let data = await cart.save()
            res.json(cart);
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({
            type: "Invalid",
            msg: "Something Went Wrong",
            err: err
        })
    }
}
exports.getCart = async(req, res) => {
    try {
        let cart = await cartRepository.cart()
        if (!cart) {
            return res.status(400).json({
                type: "Invalid",
                msg: "cart not found",
            })
        }
        res.status(200).json({
            status: true,
            data: cart
        })
    } catch (err) {
        console.log(err);
        res.status(400).jspn({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }

}
exports.emptyCart = async(req, res) => {
    try {
        let cart = await cartRepository.cart();
        cart.items = [];
        cart.subTotal = 0;
        let data = await cart.save();
        res.status(200).json({
            type: "Success",
            msg: "Cart has been emptied",
            data: data
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
}
exports.subtractItem = async(req, res) => {

    try {
        const pid = req.params.id;
        let cart = await cartRepository.cart();
        console.log(cart.items);
        const indexFound = cart.items.findIndex(item => item.productId.id === pid);
        if (cart && indexFound !== -1) {
            cart.items[indexFound].quantity = cart.items[indexFound].quantity - 1;
            let data = await cart.save();
            res.status(200).json({
                type: "success",
                msg: "Process Successfull",
                data: data
            })

            console.log(data)
        }





    } catch (err) {
        console.log(err);
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
}