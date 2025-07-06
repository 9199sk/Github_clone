const {Signup, Login} = require("./AuthController")

const getAllUser= (req, res)=>{
    res.send("all user Fetched")
}


const signup= Signup;

const login= Login;

const getUserProfile=(req, res)=>{
    res.send(" user getUserProfile")
}

const updateUserProfile=(req, res)=>{
    res.send("all user Fetched")
}

const deleteUserProfile=(req, res)=>{
    res.send("user delete")
}


module.exports={
    getAllUser,
    updateUserProfile,
    deleteUserProfile,
    getUserProfile,
    login,
    signup
}