const fs = require('fs');
const path = require('path');
const supabase = require('../config/supabase');

async function push() {
    const repoPath = path.resolve(process.cwd(), ".ownGit");
    const commitsPath = path.join(repoPath, "commits");

    try {
        const commitDirs = await fs.promises.readdir(commitsPath);
        for (const commit of commitDirs) {
            const commitPath = path.join(commitsPath, commit);
            const files = await fs.promises.readdir(commitPath);
            for (const file of files) {
                const filePath = path.join(commitPath, file);
                const fileBuffer = await fs.promises.readFile(filePath);

                const { data, error } = await supabase
                    .storage
                    .from("githubclone")
                    .upload(`commits/${commit}/${file}`, fileBuffer, {
                        contentType: 'application/octet-stream',
                        upsert: true
                    });

                if (error) {
                    console.error("❌ Upload failed:", error);
                } else {
                    console.log("✅ Upload success:", file);
                }
            }
        }

    } catch (error) {
        console.error("❌ Error pushing changes:", error);
    }
}

module.exports = { push };
