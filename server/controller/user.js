const axios = require('axios');
const github = axios.create({
    baseURL: 'https://api.github.com'
})

github.defaults.headers.common['Authorization'] = 'token '+ process.env.GITHUB_TOKEN;

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
            .then(result => {
                res.status(201).json(result)
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
}

module.exports = UserController;