const express      = require("express");
const app          = express();
const flash        = require('express-flash');
const mongoose     = require("mongoose");
const session      = require("express-session");
const DoodleSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2 },
    breed: { type: String, required: true, minlength: 2 },
    sex: { type: String, required: true, minlength: 1 },
    rank: { type: Number, required: true, minlength: 1 },
}, { timestamps: true });
const Doodle = mongoose.model('Doodle', DoodleSchema);
app.use(express.static(__dirname + "/static"));
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.get('/', (request, response) => {
    console.log(request.body)
    Doodle.find()
        .then(doodles => {
            response.render('index', { doodles: doodles });
        })
        .catch(err => res.json(err));
})
app.get('/add', (request, response) => {
    response.render('add', { title: "add something" });
});

app.post('/process', (req, res) => {
    req.session.myobject = req.body
    const doodle = new Doodle(req.body);
    doodle.save()
        .then(() => res.redirect('/'))
        .catch(err => {
            console.log("We have an error!", err);
            // adjust the code below as needed to create a flash message with the tag and content you would like
            for (var key in err.errors) {
                req.flash('registration', err.errors[key].message);
            }
            res.redirect('/add');
        });
});
app.get('/edit/:id', (req, res) => {
    const {id} = req.params;
    Doodle.findById({_id: id})
        .then(doodledata => {
            res.render('edit', { doodle: doodledata });
        })
        .catch(err => res.json(err));
})
app.post('/process_edit/:id', (req, res) => {
    const {id} = req.params;
    Doodle.updateOne({_id: id},req.body)
        .then(() => res.redirect('/'))
        .catch(err => {
            console.log("We have an error!", err);
            // adjust the code below as needed to create a flash message with the tag and content you would like
            for (var key in err.errors) {
                req.flash('registration', err.errors[key].message);
            }
            res.redirect('/edit/:id');
        });
});
app.get("/about/:id", (req, res) => {
    const {id} = req.params;
    Doodle.findById({_id: id})
        .then(doodledata => {
            res.render('about', { doodle: doodledata });
        })
        .catch(err => res.json(err));
})
app.get("/delete/:id", (req, res) => {
    const {id} = req.params;
    Doodle.findByIdAndDelete({_id: id})
        .then(doodledata => {
            res.redirect('/');
        })
        .catch(err => res.json(err));
})
app.listen(8000, () => console.log("listening on port 8000"));
mongoose.connect('mongodb://localhost/doodles', { useNewUrlParser: true });