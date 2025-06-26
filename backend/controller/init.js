const { model } = require("mongoose");
const fs = require("fs").promises;
const path = require("path");

async function initRepo() {
    console.log("Initializing a new repository...");
    const repoPath = path.resolve(process.cwd(), ".ownGit");
    const coMmitsPath = path.join(repoPath, "commits");
    try {
      await fs.mkdir(repoPath, {recursive: true});
      await fs.mkdir(coMmitsPath, {recursive: true});
      await fs.writeFile(path.join(repoPath, "config.json"), JSON.stringify({bucket: process.env.S3_Bucket}), "utf-8")
      console.log("Repository initialized successfully at");
    }
    catch (error) {
        console.error("Error initializing repository:", error);
    }


}

module.exports = initRepo;