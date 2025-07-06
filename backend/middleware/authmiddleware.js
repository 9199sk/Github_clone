const { error } = require("node:console");
const User = require("../model/user");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.UserVerification = async (req, res,) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.json({ status: false })
        }
        jwt.verify(token, process.env.TOKEN_KEY, async (error, data) => {
            if (err) {
                return res.json({ status: false })
            }
            else {
                const user = await User.findById(data.id)
                if (user) return res.json({ status: true, user: user.username })
                else return res.json({ status: false })

            }
        })
    }

    catch (error) {
        console.log(error)
    }


}