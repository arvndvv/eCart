const userModel = require('./model');
const addUser = async(payload) => {
    // console.log('repo    ',payload)
    const newUser = await userModel.create(payload);
    // console.log(newUser);
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