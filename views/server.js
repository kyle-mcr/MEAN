const express = require("express");
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    comment: String,

   })
   // create an object to that contains methods for mongoose to interface with MongoDB
   const User = mongoose.model('User', UserSchema);
app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))
app.use(express.static(__dirname + "/static"));
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.get('/', (request, response) => {
   response.render('index', {title:"my root route"});
});
app.post("/process", (req, res) => {
    console.log(req.body)
    req.session.myobject = req.body
    const user = new User();
    myobject = req.body;
    user.save()
    .then(newUserData => console.log('user created: ', newUserData))
    .catch(err => console.log(err));
    res.redirect('/result')
})
app.get("/result", (req, res) => {
    console.log(req.body)
    res.render('result', {myobject: req.session.myobject});
})
 app.listen(8000, () => console.log("listening on port 8000"));
 mongoose.connect('mongodb://localhost/name_of_your_DB', {useNewUrlParser: true});

