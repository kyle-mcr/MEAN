const mongoose = require('mongoose');
const mainController = require("../controllers/mainController.js")
const secondController = require("../controllers/SecondController.js")

module.exports = function (app) {
    app.get('/api/findAll', (req, res) => {
        mainController.find_all(req, res);
    })
    app.get('/api/findOne/:id', (req, res) => {
        mainController.find_by_id(req, res);
    })
    app.post('/api/create', (req, res) => {
        mainController.create(req, res);
    })
    app.put('/api/edit/:id', (req, res) => {
        mainController.update_by_id(req, res);
    })
    app.delete('/api/delete/:id', (req, res) => {
        mainController.delete_by_id(req, res);
    })
    app.get('/rating/findAll', (req, res) => {
        secondController.find_all(req, res);
    })
    app.get('/rating/findOne/:id', (req, res) => {
        secondController.find_by_id(req, res);
    })
    app.post('/rating/create', (req, res) => {
        secondController.create(req, res);
    })
    app.put('/rating/edit/:id', (req, res) => {
        secondController.update_by_id(req, res);
    })
    app.delete('/rating/delete/:id', (req, res) => {
        secondController.delete_by_id(req, res);
    })
}
