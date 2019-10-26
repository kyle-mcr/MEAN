const mongoose = require('mongoose');

const PrimaryObjectSchema = new mongoose.Schema({
    rating: { type: String, required: [true, "A rating is required"] },
    comment: { type: String, required: [true, "A comment is required"] },
}, { timestamps: true })

const SecondaryObjectSchema = new mongoose.Schema({
    baker: { type: String, required: [true, "A baker is required"] },
    url: { type: String, required: [true, "A image is required"] },
    ratings: [PrimaryObjectSchema]
}, { timestamps: true })

mongoose.model('PrimaryObject', PrimaryObjectSchema);
mongoose.model('SecondaryObject', SecondaryObjectSchema);