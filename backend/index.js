require('dotenv').config();
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const initRepo = require('./controller/init');
const { add } = require('./controller/add');
const { commit } = require('./controller/commit');
const { push } = require('./controller/push');
const { revert } = require('./controller/revert');
const { pull } = require('./controller/pull');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const http = require('http')
const mongoose = require('mongoose');
const { Server } = require("socket.io");
const mainRouter = require("../backend/routes/main.router")

app.use(express.urlencoded({ extended: true }));



yargs(hideBin(process.argv))
    .command('start', "start a server", () => { startServer() })
    .command("init", "initialize a new repository", {}, initRepo)
    .command("add <file>", "add a file to the repository", (yargs) => {
        yargs.positional("file", {
            describe: " file to add",
            type: "string",

        }
        )
    }, (argv) => {
        add(argv.file);
    })

    .command("commit <message>", "commit changes to the repository", (yargs) => {
        yargs.positional("message", {
            describe: "commit message",
            type: "string",
        })

    }, (argv) => { commit(argv.message) })

    .command("push", "push changes to the remote repository", {}, push)

    .command("revert <commitId>", "revert changes to a specific commit", (yargs) => {
        yargs.positional("commitId", {
            describe: "ID of the commit to revert",
            type: "string",
        })

    }, (argv) => { revert(argv.commitId) })

    .command("pull", "pull changes from the remote repository", {}, () => { pull() })

    .demandCommand(1, "you need at least one command before moving on").help().argv;




async function startServer() {
    try {

        const Port = process.env.PORT || 3000
        const url = process.env.MONGODB_URI;

        app.use(bodyParser.json());
        app.use(express.json());
        app.use(cors({ origin: '*' }))

        app.use("/", mainRouter)



        await mongoose.connect(url).then(() => {
            console.error("connection successful mgd")
        }).catch((err) => { console.log(err) })


        const httpServer = http.createServer(app);
        const io = new Server(httpServer, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST']
            }
        })


        io.on('connection', (socket) => {
            socket.on("joinRoom", (userId) => {
                let user = userId;
                console.log("====")
                console.log(user)
                console.log("====");
                socket.join(userId)

            });
        })
        const db = mongoose.connection;
        db.once("open", () => {
            console.log("MongoDB connection is open");
            // your logic here
        });

        httpServer.listen(Port, () => {
            console.log('Server is listening on port', Port);
        });


    } catch (err) {
        console.error('Failed to start server:', err);
    }



}