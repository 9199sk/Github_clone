# GitHub Clone

A full-stack project to build a simplified version control system inspired by GitHub.  
This project is a learning journey to understand how core Git and GitHub features work under the hood.

## Features

- Initialize a new repository (`init`)
- Add files to a staging area (`add`)
- Commit changes (`commit`)
- Push and pull changes (`push`, `pull`)
- Revert to previous commits (`revert`)
- Command-line interface using `yargs`

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd Github_clone/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run commands:**
   ```bash
   node index.js <command>
   ```
   Example:
   ```bash
   node index.js init
   node index.js add <file>
   node index.js commit "your message"
   ```

## Folder Structure

```
backend/
  ├── controller/
  │     ├── add.js
  │     ├── commit.js
  │     ├── init.js
  │     ├── pull.js
  │     ├── push.js
  │     └── revert.js
  ├── index.js
  ├── package.json
  └── .gitignore
```

## Why this project?

- To learn about version control internals
- To practice Node.js and CLI development
- To build something fun and useful

---

**Follow my journey on [LinkedIn](https://www.linkedin.com/)!**

---

*This project is for educational purposes and not intended for production
