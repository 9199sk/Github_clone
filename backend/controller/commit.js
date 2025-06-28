const fs= require("fs").promises;
const { timeStamp } = require("console");
const path=require("path");
const { json } = require("stream/consumers");
const { v4: uuidv4 } = require('uuid');



async function commit(message) {
  const repoPath= path.resolve(process.cwd(), ".ownGit");
  const stagingPath= path.join(repoPath, "staging");
  const commitsPath = path.join(repoPath, "commits");


  try{
   const commitId= uuidv4();
   const commitDir=  path.join(commitsPath, commitId);
   await fs.mkdir(commitDir, {recursive: true});
   const files=  await fs.readdir(stagingPath);
   for(const file of files){
    await fs.copyFile(
        path.join(stagingPath, file),
        path.join(commitDir, file)
    );
   }
    

   await fs.writeFile(
    path.join(commitDir, "commit.json"),
         JSON.stringify({
        id:commitId,
        message: message,
        timeStamp: new Date().toISOString(),

    })),
   
    console.log(`Changes committed with ID: ${commitId} and message: "${message}"`);

  }
  catch(error){
    console.error("Error committing changes:", error);
    return;
  }
}

module.exports = {
    commit,
};