const express = require("express");
const repositoryRouter = express.Router();
const repositoryController = require('../controller/repositoryCont');
const { createRepository, getAllRepository, fetchRepositoryById, fetchRepositoryByName, fetchRepositoryForCurrentUser, updateRepositoryByID, toggleVisibilityById, deleteRepositoryByID } = repositoryController;

repositoryRouter.post('/create', createRepository);
repositoryRouter.get('/all', getAllRepository);
repositoryRouter.get('/:id', fetchRepositoryById);
repositoryRouter.get('/:name', fetchRepositoryByName);
repositoryRouter.get('/user/:userId', fetchRepositoryForCurrentUser);
repositoryRouter.put('/:id', updateRepositoryByID);
repositoryRouter.patch('/:id/toggle', toggleVisibilityById);
repositoryRouter.delete('/:id', deleteRepositoryByID);

module.exports = repositoryRouter;