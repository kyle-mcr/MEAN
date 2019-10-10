const express = require("express"),
    app = express(),
    flash = require("express-flash"),
    mongoose = require("mongoose"),
    TaskSchema = new mongoose.Schema({
        title: { type: String, required: [true, "A title is required"] },
        description: { type: String, required: [true, "A description is required"] },
        completed: { type: Boolean, default: false, required: [true, "A confirmation is required"] },
    }, { timestamps: true })
const Task = mongoose.model('Task', TaskSchema);
app.use(flash());
app.use(express.static(__dirname + "/static"));
app.use(express.json());
app.get('/task', (req, res) => {
    Task.find()
        .then(taskdata => res.json(taskdata))
        .catch(err => res.json(err));
})
app.get('/task/:id', (req, res) => {
    const { id } = req.params;
    Task.find({ _id: id })
        .then(taskdata => res.json(taskdata))
        .catch(err => res.json(err));
})
app.post('/task', (req, res) => {
    const task = new Task(req.body);
    task.save()
        .then(taskdata => res.json(taskdata))
        .catch(err => res.json(err));
})
app.put('/task/:id', (req, res) => {
    console.log(req.body)
    const { id } = req.params;
    Task.findByIdAndUpdate({ _id: id }, req.body)
        .then(taskdata => res.json(taskdata))
        .catch(err => res.json(err));
})
app.delete('/task/:id', (req, res) => {
    const { id } = req.params;
    Task.remove({ _id: id })
        .then(taskdata => res.json(taskdata))
        .catch(err => res.json(err));
})
app.listen(8000, () => console.log("listening on port 8000"));
mongoose.connect('mongodb://localhost/task', { useNewUrlParser: true });