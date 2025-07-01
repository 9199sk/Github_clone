const fs = require('fs').promises;
const path = require('path');
const supabase = require('../config/supabase');
const { commandDir } = require('yargs');


async function pull() {
    console.log("Pull function called");
    const repoPath = path.resolve(process.cwd(), ".ownGit");
    const commitsPath = path.join(repoPath, "commits");

    try {
        const { data: commitFolder, error: listError } = await supabase.storage.from('githubclone').list('commits');

           if (listError) {
            console.log("Error Listing commits", listError);
            return;
        }

        for (const commit of commitFolder) {
            const commitId = commit.name;
            const commitDir = path.join(commitsPath, commitId);
            await fs.mkdir(commitDir, { recursive: true })

            const { data: files, error: fileListError } = await supabase.storage.from('githubclone').list(`commits/${commitId}`);
              if (fileListError) {
                console.error(`❌ Error listing files for commit ${commitId}:`, fileListError);
                continue;
            }


            for(const file of files){
                  const filePathOnStorage = `commits/${commitId}/${file.name}`;

                // Step 4: Download the file from Supabase
                const { data: downloadedFile, error: downloadError } = await supabase
                    .storage
                    .from("githubclone")
                    .download(filePathOnStorage);

                if (downloadError) {
                    console.error(`❌ Error downloading ${file.name}:`, downloadError);
                    continue;
                }

                 // Step 5: Local path where we should save files

                const localFilePath = path.join(commitDir, file.name);
                const fileBuffer = await downloadedFile.arrayBuffer();

                // Step 6: Save file locally
                await fs.writeFile(localFilePath, Buffer.from(fileBuffer));
                console.log(`✅ Pulled file: ${file.name} from commit ${commitId}`);
            }

        }




      


    } catch (error) {
        console.error("Error pulling changes:", error);
    }
}


module.exports = {
    pull,
};