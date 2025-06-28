const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const initRepo = require('./controller/init');
const { add } = require('./controller/add');
const { commit } = require('./controller/commit');
const { push } = require('./controller/push');
const { revert } = require('./controller/revert');
const { pull } = require('./controller/pull');
const { arch } = require('os');
const { argv } = require('process');

yargs(hideBin(process.argv))
    .command("init", "initialize a new repository",{}, initRepo)
    .command("add <file>", "add a file to the repository", (yargs) => {
        yargs.positional("file", {
            describe: " file to add",
            type: "string",

        }
        )
    }, (argv)=>{
        add(argv.file);
    })

    .command("commit <message>", "commit changes to the repository", (yargs) => {
        yargs.positional("message", {
            describe: "commit message",
            type: "string",
        })
  
    }, (argv)=>{commit(argv.commit)} )

    .command("push", "push changes to the remote repository", {},
   // Implement push logic here  
   push)

    .command("revert <commitId>", "revert changes to a specific commit", (yargs) => {
        yargs.positional("commitId", {
            describe: "ID of the commit to revert",
            type: "string",
        })

    }, revert)

    .command("pull", "pull changes from the remote repository", {}, pull)

    .demandCommand(1, "you need at least one command before moving on").help().argv;


