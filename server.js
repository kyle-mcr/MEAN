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
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.get('/', (req, res) => {
    console.log("Value of name in session: ", req.session.count);
    if(!req.session.count){
        req.session.count = 0
    } 
    req.session.count += 1
    res.render('count', {count: req.session.count});
});

 app.listen(8000, () => console.log("listening on port 8000"));
