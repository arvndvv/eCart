const userRepo = require('./repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const regUser = async(req, res) => {
    // console.log(req.body)
    try {
        let payload = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        }
        let userExist = await userRepo.findUser({ email: req.body.email });
        if (!userExist) {
            let user = await userRepo.addUser({...payload });
            res.status(200).json({
                status: true,
                data: user,
            });

        } else {
            throw 'User already Exist!'
        }

    } catch (err) {
        // console.log(err)
        res.status(400).json({
            error: err,
            status: false,
        })
    }

}
const authUser = async(req, res) => {
    // console.log(req.body)
    try {
        let user = await userRepo.findUser({ email: req.body.email });

        if (user) {
            // console.log(user);
            // console.log(bcrypt.compareSync(req.body.password, user.password))
            if (bcrypt.compareSync(req.body.password, user.password)) {
                const token = jwt.sign({ id: user._id }, req.app.get('secretKey'), { expiresIn: '1h' })
                res.json({ status: "success", message: "user found!!!", data: { user: user, token: token } });
            } else {
                throw new Error('Incorrect Username/Password');
            }
        } else {
            throw new Error('Incorrect Username/Password');
        }

    } catch (err) {
        res.status(400).json({
            error: err.message,
            status: false,
        })
    }

}


module.exports = {
    regUser,
    authUser,
}