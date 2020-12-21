const userModel = require('./model');
const addUser = async(payload) => {
    const newUser = await userModel.create(payload);
    return newUser;
}
const findUser = async(payload) => {
    const user = await userModel.findOne(payload);
    return user;
}
module.exports = {
    addUser,
    findUser,

}


// exports.products = async() => {
//     const products = await Product.find();
//     return products;
// }