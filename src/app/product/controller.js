const productRepository = require('./repository');

const jwtDecode = require('jwt-decode');
const userRepo = require('../users/repository');
exports.createProduct = async(req, res) => {
    // console.log(req.body)
    try {
        let payload = {
            name: req.body.name,
            price: req.body.price,
            image: req.file.path
        }
        let product = await productRepository.createProduct({
            ...payload
        });
        res.status(200).json({
            status: true,
            data: product,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err,
            status: false,
        })
    }
}
exports.getProducts = async(req, res) => {
    try {
        let products = await productRepository.products();

        res.status(200).json({
            status: true,
            data: products
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err,
            status: false
        })
    }
}
exports.getProductById = async(req, res) => {
    try {
        let id = req.params.id;
        let productDetails = await productRepository.productById(id);
        res.status(200).json({
            status: true,
            data: productDetails
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            error: err
        })
    }
}
exports.removeProduct = async(req, res) => {
    try {
        let id = req.params.id;
        let productDetails = await productRepository.removeProduct(id);
        res.status(200).json({
            status: true,
            data: productDetails,
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            error: err
        })
    }
}


exports.restrictUser = async(req, res, next) => {
    try {
        let reqToken = req.headers['x-access-token'];
        // console.log(jwtDecode(reqToken).id)
        const userid = jwtDecode(reqToken).id;
        let user = await userRepo.findUser({ _id: userid });
        // console.log(user);
        if (user.role === 'admin') {
            // console.log('yess')
            return next();
        }
    } catch (_err) {

        //
    }
    // console.log(req.headers['x-access-token']);


    res.status(400).json({
        Error: 'Not Authenticated for this feature!'
    })
}