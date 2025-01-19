import chalk from "chalk";
import { execa } from "execa";
import ora from "ora";
import { setupTailwindCSS } from "./tailwindUtils";
import fs from "fs";
import path from "path";

// Initialize a new project
export const initializeProject = async (projectName: string) => {
  const spinner = ora("Creating project directory...").start();

  try {
    await execa("mkdir", [projectName]); // Create project directory
    process.chdir(projectName); // Change to the project directory

    spinner.text = "Initializing npm project...";
    await execa("npm", ["init", "-y"]); // Initialize npm project

    spinner.succeed(chalk.green("Project initialized successfully!"));
  } catch (error) {
    spinner.fail(
      chalk.red("\nFailed to create project directory or initialize npm project.")
    );
    //console.error(error);
    process.exit(1);
  }
};

// Set up project dependencies
export const setupProject = async (
  projectName: string,
  template: string,
  useTypeScript: boolean,
  useTailwindcss: boolean,
  useESLint: boolean,
  useESM: boolean
) => {
  const spinner = ora(`Setting up project...${projectName}`).start();

  try {
    spinner.text = "Installing dependencies: express";
    await execa("npm", ["install", "express"]);

    if (template === "Hello World") {
      spinner.text = "Installing dependencies: ejs";
      await execa("npm", ["install", "ejs"]);

      if (useTailwindcss) {
        await setupTailwindCSS(projectName);
      }
    }

    if (useTypeScript) {
      spinner.text =
        "Installing devDependencies: typescript, @types/node, @types/express, tsx";
      await execa("npm", [
        "install",
        "--save-dev",
        "typescript",
        "@types/node",
        "@types/express",
        "tsx",
      ]);
      spinner.text = "Initializing TypeScript configuration...";
      const tsconfig = {
        "compilerOptions": {
          "target": "es2016",
          "module": "commonjs",
          "sourceMap": true,
          "outDir": "dist",
          "strict": true,
          "skipLibCheck": true,
          "esModuleInterop": true,
          "importHelpers": true,
          "baseUrl": ".",
          "paths": {
            "#/*": [
              "src/*"
            ]
          },
          "types": ["node"],
          "typeRoots": ["node_modules/@types"]
        },
        "include": ["src/**/*.ts"],
        "exclude": ["node_modues"]
      };

      fs.writeFileSync(
        path.join(process.cwd(), "tsconfig.json"),
        JSON.stringify(tsconfig, null, 2)
      );
      console.log(chalk.green("\ntsconfig.json created successfully!"));
      //await execa("npx", ["tsc", "--init"]);
    }

    if (useESLint) {
      // Install ESLint locally
      spinner.text =
        "Installing devDependencies: eslint, globals, @eslint/js, typescript-eslint";
      await execa("npm", [
        "install",
        "--save-dev",
        "eslint",
        "globals",
        "@eslint/js",
        "typescript-eslint",
      ]);
      //spinner.stop();

      // console.log(chalk.blue("\nConfiguring ESLint..."));
      // Automate ESLint configuration
      // await execa("npm", ["init", "@eslint/config@latest"], {
      //   stdio: "inherit",
      // });

      // Create eslint.config.mjs
      spinner.text = "Creating eslint.config.mjs...";
      const eslintConfig = `
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
{ files: ["**/*.{js,mjs,cjs,ts}"] },
{ languageOptions: { globals: { ...globals.browser, ...globals.node } } },
pluginJs.configs.recommended,
...tseslint.configs.recommended,
];
 `;

      fs.writeFileSync(
        path.join(process.cwd(), "eslint.config.mjs"),
        eslintConfig
      );

      console.log(chalk.green("\nESLint configured successfully!"));
    }

    if (useESM) {
      spinner.text = "Installing ESM support: esm";
      await execa("npm", ["install", "esm"]);
    }

    spinner.succeed(chalk.green("Project setup complete!"));
  } catch (error) {
    spinner.fail(chalk.red("Failed to set up project dependencies."));
    //console.error(error);
    process.exit();
  }
};
