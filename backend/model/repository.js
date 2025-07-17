const mongoose = require('mongoose');
const { boolean } = require('yargs');
const { Schema } = mongoose;


const repositorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description:[ {
        type: String,

    }],
    content: [
        {
            type: String,

        }
    ],

    visibility: {
        type: Boolean,
        default: true
    },

    owner: [{
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    }],

    issue: [
        {
            type: Schema.Types.ObjectId,
            ref: "issue"
        }
    ]


})

const Repository = mongoose.model("Repository", repositorySchema);
module.exports = Repository