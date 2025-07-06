const express = require("express");
const userRouter = express.Router();

const userController = require('../controller/userCont');
const { getAllUser,login,signup, getUserProfile,updateUserProfile,deleteUserProfile } = userController

userRouter.get("/allUser", getAllUser)
userRouter.post("/login", login)
userRouter.post("/signup", signup)
userRouter.get("/getUserProfile", getUserProfile)
userRouter.post("/updateUserProfile", updateUserProfile);
userRouter.delete("/deleteUserProfile", deleteUserProfile)


module.exports = userRouter;