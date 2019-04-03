const express = require('express');
const router = express.Router();
const userController = require('../controller/user');

// GET /user/repos - List repositories that the authenticated user has explicit permission (:read, :write, or :admin) to access.
router.get('/repos', userController.getMyRepos);
// POST /user/repos - Create a new repository for the authenticated user.
router.post('/repos', userController.createRepo);
// GET /users/:username/repos - List public repositories for the specified user.
router.get('/:username/repos', userController.getRepos);
// GET /users/:username/starred - List repositories being starred by a user.
router.get('/:username/starred', userController.getStarredRepos);
// GET /user/starred - List repositories being starred by the authenticated user.
router.get('/starred', userController.getMyStarredRepos);//
// PUT /user/starred/:owner/:repo - Star a repository - Requires for the user to be authenticated.
router.put('/starred/:username/:repo', userController.starARepo);
// DELETE /user/starred/:owner/:repo - Unstar a repository - Requires for the user to be authenticated.
router.delete('/starred/:username/:repo', userController.unstarRepo)
module.exports = router;