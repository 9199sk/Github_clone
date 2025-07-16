const { default: mongoose } = require("mongoose");
const Repository = require("../model/repository");
var objectId = require("mongodb").ObjectId;
const Issue= require("../model/issue")


const createRepository = async (req, res) => {

    const { owner, name, issue, description, content, visibility } = req.body;
    try {
       const existingRepo=  await Repository.findOne({name});
       if(existingRepo){
        return res.status(400).json({ error: "Repository name already exists" });
       }

        if(!name){
        return res.status(400).json({ error: "repository name should must" });

        }

       
        if (!mongoose.Types.ObjectId.isValid(owner)) {
            return res.status(400).json({ error: "invalid user id" });
        }

        const newRepository = new Repository({
            owner,
            name,
            issue,
            description,
            content,
            visibility
        })

        const result = await newRepository.save();

        res.status(400).send({

            message: 'repository created',
            repositoryId: result._id
        })


    }
    catch (err) {
        console.log(err)
        res.status(500).send("Server error")
    }


};

const getAllRepository =  async (req, res) => {
    try{
    const allRepository= await  Repository.find({}).populate("owner").populate("issue")
    res.json(allRepository)

    }
    catch(err){
        console.log(err)
        res.status(400).json({message:'no user find'})
    }

}

const fetchRepositoryById = async(req, res) => {
    const currentId=  req.params.id;
    const repository= await Repository.findById({_id: new objectId(currentId)}).populate("owner").populate("issue")
    if(!repository){
       return  res.status(400).json({message:"no repository found"})
    }
    res.send({repository, message: "fetchRepository successfully"});
};

const fetchRepositoryByName = async (req, res) => {
  const { name } = req.params;
  try {
    const repo = await Repository.findOne({ name }).populate("owner").populate("issue");

    if (!repo) {
      return res.status(404).json({ error: "Repository not found" });
    }

    res.status(200).json(repo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};



const fetchRepositoryForCurrentUser = (req, res) => {
    res.send("fetchRepository by name");
};



const updateRepositoryByID = (req, res) => {
    res.send("repo updated")
}

const toggleVisibilityById = (req, res) => {
    res.send("toggleVisibilityById")
}

const deleteRepositoryByID = (req, res) => {
    res.send("repo updated")
}




module.exports = {
    createRepository,
    getAllRepository,
    fetchRepositoryById,
    fetchRepositoryByName,
    fetchRepositoryForCurrentUser,
    updateRepositoryByID,
    toggleVisibilityById,
    deleteRepositoryByID
}