const User = require("../model/user");
const createSecretToken = require("../util/SecretToken");
const bcrypt = require("bcrypt")

const Signup = async (req, res, next) => {
  try {
    
    const { email, password, username, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already Exit" });

    }

    const user = await User.create({ email, password, username, createdAt });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httponly: false,
    });

    res.status(201)
      .json({ message: "User is signin Successfully" })
    next();

  }

  catch (error) {
    console.error(error);
  }


}



const Login = async (req, res, next) => {

  try {
    const { password, email } = req.body;
    if (!password || !email) {
      return res.json("All field are required")
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json("user does not exit")
    }
    const authPass = await bcrypt.compare(password, user.password);
    if (!authPass) {
      return res.json("user pass does not match")

    }

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httponly: false
    })

    res.status(200).json({ message: "Login successful", user });
  }
  catch (error) {
    console.log(error)
  }

}


module.exports = {
  Signup,
  Login
};