const { Signup, Login } = require("./AuthController")
const User = require("../model/user");
var objectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt")


const getAllUser = async (req, res) => {
    try{
    const user = await User.find({}).populate("owner").populate("issue")
    res.json(user)

    }

    catch(err){
        console.log(err)
    }
}


const signup = Signup;

const login = Login;

const getUserProfile = async (req, res) => {
    const currentId = req.params.id;
    try {
        const user = await User.findById({ _id: new objectId(currentId) })
        if (!user) {
            return res.status(500).json({ message: 'user not found invalid credentials' })
        }

        res.send({ user, message: "profile fetched" })


    }
    catch (err) {
        console.error(err)
    }


}

const updateUserProfile = async (req, res) => {
    const { email, password } = req.body;
    const currentId = req.params.id;
    try {
        let updatedField = { email };
        if(password){
            const salt= await bcrypt.genSalt(12);
            const hashPassword= await bcrypt.hash(password, salt);
            updatedField.password= hashPassword
        }
        

        const result = await User.findByIdAndUpdate({
            _id: new objectId(currentId)
        },
            { $set: updatedField },
            { returnDocument: "after" }

        )
        if (!result) {
            return res.status(400).send({ message: 'credentials invalid' })
        }

      

        res.send({ result, message: 'update successfully' })


    }
    catch (err) {
        console.log(err)

    }

}

const deleteUserProfile = async (req, res) => {
    const currentId = req.params.id;
    try {
        const result = await User.deleteOne({ _id: new objectId(currentId) });
    

          if(result.deletedCount===0){
            return res.status(400).send({message: 'user not found'})
        }
        res.send({ result, message: 'update successfully' })

    }

    catch (err) {
        console.error(err);
    }



}


module.exports = {
    getAllUser,
    updateUserProfile,
    deleteUserProfile,
    getUserProfile,
    login,
    signup
}