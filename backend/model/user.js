const mongoose = require("mongoose");
const { type } = require("os");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");


const UserSchema = new Schema(
    {

        username: {
            type: String,
            required: true,
            unique: true

        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String

        },

        repositories: [
            {
                default: [],
                type: Schema.Types.ObjectId,
                ref: "Repository"
            }
        ],

        starRepository: [
            {
                default: [],
                type: Schema.Types.ObjectId,
                ref: "Repository"
            }
        ],

        followedUser: [
            {
                type: Schema.Types.ObjectId,
                default: [],
                ref: "User"

            }
        ],

        createdAt: {
            type: Date,
            default: new Date(),
        },
    }
)

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // skip if not changed

    try {
        this.password = await bcrypt.hash(this.password, 12);
        next();
    } catch (err) {
        next(err);
    }
});

const User = mongoose.model("user", UserSchema)
module.exports = User;