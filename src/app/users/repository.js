const userModel = require('./model');
const addUser = async(payload) => {
    const newUser = await userModel.create(payload);
    return newUser;
}
const findUser = async(payload) => {
    const products = await userModel.findOne(payload);
    return products;
}
module.exports = {
    addUser,
    findUser
}

exports.products = async() => {
    const products = await Product.find();
    return products;
}