const cartRepository = require('./repository');
const productRepository = require('../product/repository');
const jwtDecode = require('jwt-decode');
// const { db } = require('../product/model');
const cartmodel = require('../cart/model');
exports.addItemToCart = async(req, res) => {
    // console.log(req.headers['x-access-token']);
    let reqToken = req.headers['x-access-token'];
    // console.log(jwtDecode(reqToken).id)
    const userid = jwtDecode(reqToken).id;
    const {
        productId
    } = req.body;
    const quantity = Number.parseInt(req.body.quantity);
    try {

        let cart = await cartRepository.cart(userid);
        // console.log(cart);
        let productDetails = await productRepository.productById(productId);
        // console.log(productDetails)
        // console.log(productDetails)
        if (!productDetails) {
            return res.status(400).json({
                type: "Product Details cannot be Fetched",
                msg: "Invalid request"
            })
        }
        //if cart exist
        if (cart) {
            // console.log(cart.items);

            //check if index exist
            const indexFound = cart.items.findIndex(item => item.productId.id == productId);
            // console.log(indexFound)
            // console.log('test');

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
                if (cart.items[indexFound].quantity > 99) {
                    cart.items[indexFound].quantity=99
                }
                cart.items[indexFound].total = cart.items[indexFound].quantity * productDetails.price;
                cart.items[indexFound].price = productDetails.price;
                
                cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
            } //check if quantity is greater than 0 then add item to items array
            else if (quantity > 0 ) {
                cart.items.push({
                    productId: productId,
                    img:productDetails.image,
                    quantity: quantity,
                    price: productDetails.price,
                    total: parseInt(productDetails.price * quantity)
                });
                cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
                cart.user = userid;
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
            // console.log(userid)
            const cartData = {
                items: [{
                    productId: productId,
                    img:productDetails.image,
                    quantity: quantity,
                    total: parseInt(productDetails.price * quantity),
                    price: productDetails.price
                }],
                subTotal: parseInt(productDetails.price * quantity),
                user: userid
            }
            cart = await cartRepository.addItem(cartData)
                //let data = await cart.save()
            res.json(cart);
        }
    } catch (err) {
        // console.log(err);
        res.status(400).json({
            type: "Invalid",
            msg: "Something Went Wrong",
            err: err
        })
    }
}
exports.getCart = async(req, res) => {

    try {
        // console.log(req.headers['x-access-token']);
        let reqToken = req.headers['x-access-token'];
        // console.log(jwtDecode(reqToken).id)
        const userid = jwtDecode(reqToken).id;

        let cart = await cartRepository.cart(userid);
        // console.log(cart)
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
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }

}
exports.emptyCart = async(req, res) => {

    try {
        // console.log(req.headers['x-access-token']);
        let reqToken = req.headers['x-access-token'];
        // console.log(jwtDecode(reqToken).id)
        const userid = jwtDecode(reqToken).id;
        let cart = await cartRepository.cart(userid);
        cart.items = [];
        cart.subTotal = 0;
        let data = await cart.save();
        res.status(200).json({
            type: "Success",
            msg: "Cart has been emptied",
            data: data
        })
    } catch (err) {
        // console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
}
exports.subtractItem = async(req, res) => {

    try {
        // console.log(req.headers['x-access-token']);
        let reqToken = req.headers['x-access-token'];
        // console.log(jwtDecode(reqToken).id)
        const userid = jwtDecode(reqToken).id;
        const pid = req.params.id;
        let cart = await cartRepository.cart(userid);
        // console.log(cart.items);
        const indexFound = cart.items.findIndex(item => item.productId.id === pid);
        if (cart && indexFound !== -1) {
            if (cart.items[indexFound].quantity > 1) {

                cart.items[indexFound].quantity = cart.items[indexFound].quantity - 1;

                cart.subTotal = cart.subTotal - cart.items[indexFound].price;
            } else {
                let itemToRemove = cart.items.find(item => item.productId.id === pid);
                // console.log(itemToRemove.quantity)

                cart.subTotal = cart.subTotal - cart.items[indexFound].price;

                cart.items = cart.items.filter(item => item.productId.id !== pid);

            }
            let data = await cart.save();
            res.status(200).json({
                type: "success",
                msg: "Process Successfull",
                data: data
            })

            // console.log(data)
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
exports.removeItem = async(req, res) => {
    try {
        // console.log(req.headers['x-access-token']);
        let reqToken = req.headers['x-access-token'];
        // console.log(jwtDecode(reqToken).id)
        const userid = jwtDecode(reqToken).id;
        const pid = req.params.id;
        let cart = await cartRepository.cart(userid);
        
        let itemToRemove = cart.items.find(item => item.productId.id === pid);
        cart.subTotal = cart.subTotal - itemToRemove.total;

        cart.items = cart.items.filter(item => item.productId.id !== pid);

        if (cart) {
            // cart.items[indexFound].quantity = 0;
            await cart.save();


            cart = await cartRepository.cart();
            // console.log(cart)

            res.status(200).json({
                type: "success",
                msg: "Process Successfull",
                data: cart
            })
        }
    } catch (err) {
        // console.log(err);
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
}