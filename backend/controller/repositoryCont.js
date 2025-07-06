const createRepository= (req, res) => {
    res.send("createRepository")
};

const getAllRepository = (req, res) => {
    res.send("getAllRepository")
}

const fetchRepositoryById =(req, res) => {
    res.send("fetchRepository");
};

const fetchRepositoryByName =(req, res) => {
    res.send("fetchRepository by name");
};


const fetchRepositoryForCurrentUser =(req, res) => {
    res.send("fetchRepository by name");
};



const updateRepositoryByID=  (req, res)=>{
    res.send("repo updated")
}

const toggleVisibilityById=(req,res)=>{
res.send("toggleVisibilityById")
}

const deleteRepositoryByID=  (req, res)=>{
    res.send("repo updated")
}




module.exports={
    createRepository,
    getAllRepository,
    fetchRepositoryById,
    fetchRepositoryByName,
    fetchRepositoryForCurrentUser,
    updateRepositoryByID,
    toggleVisibilityById,
    deleteRepositoryByID
}