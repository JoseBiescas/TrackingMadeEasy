const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Card Schema
const CardSchema = new Schema(
    {
        user: {
            type: String, //Might be just "Object" type: Schema.Types.ObjectId
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        labels: {
            type: [String],
            required: false
        }
    },
    {
        timestamps: true,
    }
);

module.exports = Card = mongoose.model("cards", CardSchema);