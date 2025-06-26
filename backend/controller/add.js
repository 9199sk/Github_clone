const fs= require("fs").promises;
const { error } = require("console");
const path = require("path");



async function add(filePath) {
    const repoPath= path.resolve(process.cwd(), ".ownGit");
    const stagingPath= path.join(repoPath, "staging");
    try{
      await fs.mkdir(stagingPath, {recursive: true});
      const fileName=  path.basename(filePath);
      await fs.copyFile(filePath, path.join(stagingPath, fileName));
      console.log(`File ${fileName} added to staging area.`);

    }
    catch(error){
        console.error("Error adding file:", error);
    }

}

module.exports ={
    add,

};