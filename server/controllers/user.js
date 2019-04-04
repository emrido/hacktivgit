const { client, CLIENT_ID } = require('../helper/google-login');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const github = axios.create({
    baseURL: 'https://api.github.com'
})

github.defaults.headers.common['Authorization'] = 'token ' + process.env.GITHUB_TOKEN;

class UserController {
    static getMyRepos(req, res) {
        github
            .get(`/user/repos`)
            .then(({ data }) => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }

    static getRepos(req, res) {
        github
            .get(`/users/${req.params.username}/repos`)
            .then(({ data }) => {
                if (req.query.search) {
                    data = data.filter(repo => RegExp(req.query.search, 'i').test(repo.name))
                }
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }

    static getStarredRepos(req, res) {
        github
            .get(`/users/${req.params.username}/starred`)
            .then(({ data }) => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }

    static getMyStarredRepos(req, res) {
        github
            .get(`/user/starred`)
            .then(({ data }) => {
                if (req.query.search) {
                    data = data.filter(repo => RegExp(req.query.search, 'i').test(repo.name))
                }
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }

    static createRepo(req, res) {
        github
            .post('/user/repos', {
                name: req.body.name,
                description: req.body.description,
                homepage: req.body.homepage
            })
            .then(({ data }) => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }

    static starARepo(req, res) {
        github
            .put(`/user/starred/${req.params.username}/${req.params.repo}`)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: err.message })
            })
    }

    static unstarRepo(req, res) {
        github
            .delete(`/user/starred/${req.params.username}/${req.params.repo}`)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }

    static verify(req, res) {
        let payload;
        let token;

        client
            .verifyIdToken({
                idToken: req.body.token,
                audience: CLIENT_ID,
            })
            .then(ticket => {
                payload = ticket.getPayload();
                const userid = payload['sub'];

                return User.findOne({ email: payload.email})
            })
            .then(user => {
                if (!user) {
                    return User.create({ name: payload.name, email: payload.email, avatar: payload.picture})
                } else {
                    return user
                }
            })
            .then(newUser => {
                token = jwt.sign({ id: newUser.id, name: newUser.name }, process.env.JWT_SECRET)
                res.status(200).json(token)
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
}

module.exports = UserController;