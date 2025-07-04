const mongoose = require("mongoose");
const { type } = require("os");
const { string } = require("yargs");
const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        email: {
            type: string
        },
        password: {
            default:[],
            type: Schema.Types.ObjectId,
            ref: "Repository"
        },

        repositories:{
            default:[],
            type: Schema.Types.ObjectId,
            ref: "Repository"
        },
        starRepository:{
            default:[],
            type: Schema.Types.ObjectId,
            ref: "Repository"
        }
    }
)

const User= mongoose.model("User", UserSchema)
export default  User;