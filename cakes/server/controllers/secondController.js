const mongoose = require('mongoose');
const SecondaryObject = mongoose.model('SecondaryObject');

module.exports = {
    find_all: (req, res) => {
        SecondaryObject.find()
            .then(data => res.json(data))
            .catch(err => res.json(err));
    },
    find_by_id: (req, res) => {
        SecondaryObject.findById({ _id: req.params.id })
            .then(data => res.json(data))
            .catch(err => res.json(err));
    },
    create: (req, res) => {
        SecondaryObject.create(req.body)
            .then(data => res.json(data))
            .catch(err => res.json(err));
    },
    update_by_id: (req, res) => {
        SecondaryObject.findByIdAndUpdate({ _id: req.params.id }, req.body)
            .then(data => res.json(data))
            .catch(err => res.json(err));
    },
    delete_by_id: (req, res) => {
        SecondaryObject.findByIdAndDelete({ _id: req.params.id })
            .then(data => res.json(data))
            .catch(err => res.json(err));
    }
};