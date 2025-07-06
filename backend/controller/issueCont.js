const createIssue= (req, res) => {
    res.send("issue controller")
}

const deleteIssue= (req, res) => {
    res.send("delete issue controller")
}

const updateIssue= (req, res) => {
    res.send("update issue controller")
}

const fetchIssueById= (req, res) => {
    res.send("fetch issue by id controller")
}

const fetchAllIssues= (req, res) => {
    res.send("fetch all issues controller")
}


module.exports = {
    createIssue,
    deleteIssue,
    updateIssue,
    fetchIssueById,
    fetchAllIssues
}
