const express = require("express");
const issueRouter = express.Router();
const issueController = require('../controller/issueCont');
const { createIssue, deleteIssueById, updateIssueById, fetchIssueById, fetchAllIssues } = issueController;

issueRouter.get('/all', fetchAllIssues);
issueRouter.post('/create/:id', createIssue);
issueRouter.delete('/delete/:id', deleteIssueById);
issueRouter.put('/update/:id', updateIssueById);
issueRouter.get('/:id', fetchIssueById);


module.exports = issueRouter;