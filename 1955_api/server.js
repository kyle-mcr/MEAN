const express = require("express"),
    app = express(),
    flash = require("express-flash"),
    mongoose = require("mongoose"),
    UserSchema = new mongoose.Schema({
        name: { type: String, required: [true, "A name is required"] },
    }, { timestamps: true })
const User = mongoose.model('User', UserSchema);
app.use(flash());
app.use(express.static(__dirname + "/static"));
app.use(express.json());
app.get('/', (req, res) => {
    console.log(req.body)
    User.find()
        .then(userdata => res.json(userdata))
        .catch(err => res.json(err));
})
app.get('/new/:name/', (req, res) => {
    const { name } = req.params;
    const user = new User();
    user.name = name;
    user.save()
        .then(userdata => res.json(userdata))
        .catch(err => res.json(err));
})
app.get('/remove/:name/', (req, res) => {
    const { name } = req.params;
    User.remove({name: name})
        .then(userdata => res.json(userdata))
        .catch(err => res.json(err));
})
app.get('/:name/', (req, res) => {
    const { name } = req.params;
    User.find({name: name})
        .then(userdata => res.json(userdata))
        .catch(err => res.json(err));
})
app.listen(8000, () => console.log("listening on port 8000"));
mongoose.connect('mongodb://localhost/1955', { useNewUrlParser: true });
