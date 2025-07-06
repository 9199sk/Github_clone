const mongoose = require('mongoose');
const { Schema } = mongoose;


const repositorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,

    },
    content: [
        {
            type: String,
            
        }
    ],

    visibility:{
        boolean:true
    },

    owner:{
        type: Schema.Types.ObjectId,
        ref:"user",
        required:true
    },

    issue:[
        {
            type: Schema.Types.objectId,
            ref: "issue"
        }
    ]


})

const Repository= mongoose.model(("Repository", repositorySchema));
module.exports= Repository