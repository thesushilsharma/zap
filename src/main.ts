import { input, select, confirm } from "@inquirer/prompts";
import chalk from "chalk";
import { initializeProject, setupProject } from "./lib/utils/npmUtils.js";
import { createProjectFiles, setupAbsoluteImports } from "./lib/utils/fileUtils.js";
import process from "node:process";

export const startGenerator = async () => {
  try {
    
  console.log(chalk.blue("Welcome to the Express.js (Zap)!"));

  // Prompt for project name
  const projectName = await input({
    message: "What is your project named?",
    default: "my-app",
  });

  // Prompt for template choice
  const template = await select({
    message: "Choose a template:",
    choices: [
      { name: "API Server", value: "API Server" },
      { name: "Hello World", value: "Hello World" },
    ],
  });

  let useTailwindcss = false;

  if (template === "Hello World") {
    const answer = await confirm({
      message: "Would you like to use Tailwind CSS?",
      default: false,
    });
    useTailwindcss = answer ?? false; // Use `false` if `answer` is undefined
  }

  // Prompt for TypeScript
  const useTypeScript = await confirm({
    message: "Would you like to use TypeScript?",
    default: true,
  });

  // Prompt for ESLint
  const useESLint = await confirm({
    message: "Would you like to use ESLint?",
    default: true,
  });

  // Prompt for ESM
  const useESM = await confirm({
    message: "Would you like to use ESM (ECMAScript Modules)?",
    default: true,
  });

  // Prompt for custom import alias
  const customizeAlias = await confirm({
    message: "Would you like to customize the import alias (`@/*` by default)?",
    default: false,
  });

  let alias = "@/"; // Default alias
  if (customizeAlias) {
    alias = await input({
      message: "What import alias would you like configured? (e.g., `@/*`)",
      default: "@/",
      validate: (value: string) => {
        if (!value.endsWith("/*")) {
          return "Import alias must follow the pattern <prefix>/*";
        }
        return true;
      },
    });
  }

  console.log(chalk.green(`Creating a new Express.js app in ${projectName}.`));
  console.log(chalk.yellow("Using npm.\n"));

  // Initialize project
  await initializeProject(projectName);

  // Set up project dependencies
  await setupProject(projectName, template, useTypeScript, useTailwindcss, useESLint, useESM);

  // Create project files
  await createProjectFiles(
    projectName,
    template,
    useTypeScript,
    useTailwindcss,
  );

  if (customizeAlias) {
    setupAbsoluteImports(alias); // Call the function to set up absolute imports
  }

  console.log(chalk.green("\nProject setup complete!"));
  console.log(chalk.yellow(`cd ${projectName} && npm run dev`));
  } catch (error) {
    console.error(chalk.red("\nAn error occurred during project setup:"));
    console.log(chalk.red("\nProcess aborted by the user (Ctrl+C). Exiting..."));
    //console.error(error);
    process.exit(1); // Exit with a non-zero code to indicate an error
  }
};

