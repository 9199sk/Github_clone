const express = require("express");
const mainRouter = express.Router();
const userRouter = require("../routes/user.router")
const repositoryRouter = require("../routes/repo.router");
const issueRouter = require("../routes/issue.router");
const { UserVerification } = require("../middleware/authmiddleware");



mainRouter.use('/', userRouter)
mainRouter.use("/repo", repositoryRouter);
mainRouter.use("/issues", issueRouter);


mainRouter.get('/', UserVerification);



module.exports = mainRouter