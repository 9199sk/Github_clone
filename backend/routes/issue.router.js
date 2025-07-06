const express = require("express");
const issueRouter = express.Router();
const issueController = require('../controller/issueCont');
const { createIssue, deleteIssue, updateIssue, fetchIssueById, fetchAllIssues } = issueController;

issueRouter.get('/all', fetchAllIssues);
issueRouter.post('/create', createIssue);
issueRouter.delete('/delete/:id', deleteIssue);
issueRouter.put('/update/:id', updateIssue);
issueRouter.get('/:id', fetchIssueById);


module.exports = issueRouter;