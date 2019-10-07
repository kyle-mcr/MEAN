const express = require("express");
const app = express();
const flash = require('express-flash');
const mongoose = require("mongoose");
const session = require("express-session");
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2 },
    quote: { type: String, required: true, minlength: 6 },
}, { timestamps: true });
const User = mongoose.model('User', UserSchema);
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
app.use(express.static(__dirname + "/static"));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.get('/', (request, response) => {
    response.render('index', { title: "my root route" });
});
app.use(flash());
app.post('/process', (req, res) => {
    req.session.myobject = req.body
    const user = new User(req.body);
    user.save()
        .then(() => res.redirect('/quotes'))
        .catch(err => {
            console.log("We have an error!", err);
            // adjust the code below as needed to create a flash message with the tag and content you would like
            for (var key in err.errors) {
                req.flash('registration', err.errors[key].message);
            }
            res.redirect('/');
        });
});
app.get("/quotes", (req, res) => {
    console.log(req.body)
    User.find()
    .then(users => {
        res.render('quotes', {users: users});       
    })
    .catch(err => res.json(err));
})
app.listen(8000, () => console.log("listening on port 8000"));
mongoose.connect('mongodb://localhost/name_of_your_DB', { useNewUrlParser: true });