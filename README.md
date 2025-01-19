# Create Zap App

**Create Zap App** is a CLI tool to quickly scaffold and set up a new Express.js project with optional features like TypeScript, Tailwind CSS, ESLint, and more. It provides templates for API servers and web applications, making it easy to start with a production-ready setup.

## Features ✨

- **Pre-configured Templates**:
  - **API Server**: A minimal Express.js API server.
  - **Web Application**: A full-stack Express.js app with optional Tailwind CSS support.
- **Optional Integrations**:
  - TypeScript support.
  - ESLint for code linting.
  - Tailwind CSS for styling.
  - ESM (ECMAScript Modules) support.
- **Custom Import Aliases**: Configure custom import aliases (e.g., `@/*`).
- **Interactive CLI**: Easy-to-use prompts for project setup.

## Tech stack

- EJS (Embedded JavaScript) / TypeScript
- Express
- Node.js
- NPM
- VS Code

## Prerequisites

- [NPM Account](https://www.npmjs.com/) / [Github account](https://npm.pkg.github.com)

## Folder Structure
```TS
create-zap-app/
├── bin/
│   └── main.ts            # CLI entry point
├── src/
│   ├── index.ts           # Main application logic
│   └── lib/
│       ├── templates/     # Project templates
│       │   ├── apiServer.ts
│       │   └── web.ts
│       └── utils/         # Utility functions
│           ├── fileUtils.ts
│           ├── npmUtils.ts
│           ├── tailwindUtils.ts
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── README.md              # Project documentation
└── .gitignore             # Files and directories to ignore in Git
```

## Support 💬

If you encounter any issues or have questions, [open an issue](https://github.com/thesushilsharma/zap/issues) on GitHub.

## Contributing 🤝

Contributions are welcome! If you'd like to contribute, please follow these steps:
- Fork the repository.
- Create a new branch for your feature or bug fix.
- Commit your changes.
- Submit a pull request.

Please ensure your code follows the project's coding standards and includes appropriate tests.

## License

This project is provided under the MIT License. See the [LICENSE](LICENSE) file for details.
