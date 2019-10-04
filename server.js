const express = require("express");
const app = express();
const session = require('express-session');
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
    res.redirect('/result')
})
app.get("/result", (req, res) => {
    console.log(req.body)
    res.render('result', {myobject: req.session.myobject});
})
 app.listen(8000, () => console.log("listening on port 8000"));
