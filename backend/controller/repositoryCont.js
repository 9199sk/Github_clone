const { default: mongoose } = require("mongoose");
const Repository = require("../model/repository");
var objectId = require("mongodb").ObjectId;
const Issue= require("../model/issue");


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



const fetchRepositoryForCurrentUser = async (req, res) => {
    try{
        const userId= req.user;
        const repository= await Repository.findById({owner:userId});
        if(!repository || repository.length==0){
            return res.status(404).send("no repository found")
        }

 
    }
    catch(err){
        console.log("error during fetching user repository",err);
        res.status(500).send("server error")
    }
};



const updateRepositoryByID = async(req, res) => {
    const {id}= req.params;
    const{description,content}= req.body
    try{
        const repository= await Repository.findById(id)
         if(!repository || repository.length==0){
            return res.status(404).send("no repository found")
        }

        
        repository.content.push(content);
        repository.description.push(description);


        const updateRepository= await repository.save();

        res.send({message:"repo updated successfully",updateRepository})


    }
    catch(err){
        console.log("error during updating repository",err);
        res.status(500).send("server error")
    }
}

const toggleVisibilityById = async (req, res) => {
    const{id}= req.params;
    try{
         const repository= await Repository.findById(id);

         if (!repository) {
            return res.status(404).send({ message: "Repository not found" });
        }
    
        repository.visibility= !repository.visibility

        const updatedRepository = await repository.save();
         res.send({ message: "Visibility toggled", updatedRepository });
    
    }
     catch(err){
        console.log("error during toggle repository",err);
        res.status(500).send("server error")
    }
   

   
}

const deleteRepositoryByID = async(req, res) => {
   try{
       const deleteRepository= await Repository.findByIdAndDelete(id);
        if (!deleteRepository) {
            return res.status(404).send({ message: "Repository not found" });
        }

        res.send({ message: "Repository deleted successfully", deletedRepository });
    }
     catch(err){
        console.log("error during deleting repository",err);
        res.status(500).send("server error")
    }
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