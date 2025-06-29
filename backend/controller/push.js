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

                const { error } = await supabase.storage
                    .from("githubclone")
                    .upload(`commits/${commit}/${file}`, fileBuffer, {
                        contentType: 'text/plain',
                        upsert: true,
                    });

                if (error) {
                    console.error("❌ Upload failed:", error);
                } else {
                    console.log(`✅ File ${file} from commit ${commit} pushed successfully.`);
                }
            }
        }
    } catch (error) {
        console.error("❌ Error pushing changes:", error);
    }
}

module.exports = { push };
