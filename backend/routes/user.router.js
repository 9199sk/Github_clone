const express = require("express");
const userRouter = express.Router();

const userController = require('../controller/userCont');
const { getAllUser,login,signup, getUserProfile,updateUserProfile,deleteUserProfile } = userController

userRouter.get("/allUser", getAllUser)
userRouter.post("/login", login)
userRouter.post("/signup", signup)
userRouter.get("user/:id", getUserProfile)
userRouter.put("/updateUserProfile/:id", updateUserProfile);
userRouter.delete("/deleteUserProfile/:id", deleteUserProfile)


module.exports = userRouter;