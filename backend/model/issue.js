const mongoose = require('mongoose');
const { type } = require('os');
const { required } = require('yargs');
const { Schema } = mongoose


const IssueSchema = new Schema({
    title: {
        type: String,
                required: true

    },
    description: {
        type: String

    },
    status:{
        type: String,
        enum:['open', 'closed'],
        default: 'open'
    },

    repository:{
        type: Schema.type.objectId,
        ref: "Repository",
        required: true
    }
})