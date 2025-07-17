const { describe } = require("yargs");
const Issue = require("../model/issue")

const createIssue = async (req, res) => {
    const { title, description } = req.body;
    const repoId = req.params;
    try {
        const issue = new Issue({
            title,
            description,
            repository: repoId
        })

        await issue.save();
        res.status(201).json(issue)
    }
    catch (err) {
        console.log("error during create issue", err);
        res.status(500).send("server error")
    }
}

const deleteIssueById = async (req, res) => {
    const { id } = req.params
    try {
        const issue = Issue.findByIdAndDelete(id);
        res.send("issue deleted successfully", issue)

    }
    catch (err) {
        console.log("error during delete issue", err);
        res.status(500).send("server error")
    }
}


const updateIssueById = async (req, res) => {
    const { id } = req.params;
    const { title, description, open } = req.body

    try {
        const issue = await Issue.findById(id);
        if (!issue) {
            return res.send("issue not found")
        }
        issue.title = title;
        issue.description = description;
        issue.status = open;

        await issue.save();
        res.send("issue updated successfully")

    }
    catch (err) {
        console.log("error during updating issue", err);
        res.status(500).send("server error")
    }
}

const fetchIssueById = async (req, res) => {
    const { id } = req.params;
    try {
        const issue = await Issue.findById(id).populate('repository');
        if (!issue) {
           return res.status(400).json("not found any issue")
        }
        res.status(201).json(issue)

    }
    catch (err) {
        console.log("error during fetch issue", err);
        res.status(500).send("server error")
    }
}

const fetchAllIssues = async (req, res) => {
    try {
        const allIssue = await Issue.find({});
        if (!allIssue) {
            return res.send("no issue found")
        }
        res.send({ message: 'all issue', allIssue })

    }
    catch (err) {
        console.log("error during fetching all issue", err);
        res.status(500).send("server error")
    }
}


module.exports = {
    createIssue,
    deleteIssueById,
    updateIssueById,
    fetchIssueById,
    fetchAllIssues
}
