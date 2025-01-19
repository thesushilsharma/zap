import fs from "fs";
import path from "path";
import chalk from "chalk";
import { createWebTemplate } from "../templates/web";
import { createApiServerTemplate } from "../templates/apiServer";
import ora from "ora";

export const createProjectFiles = async (
  projectName: string,
  template: string,
  useTypeScript: boolean,
  useTailwindcss: boolean,
) => {
 try {
  console.log(chalk.blue("\nCreating project folders..."));
  const spinner = ora(`Creating project files...${projectName}`).start();
  // const srcDir = path.join(process.cwd(), "src");
  // const configDir = path.join(process.cwd(), "config");
  // const servicesDir = path.join(process.cwd(), "services");
  // shell.mkdir(srcDir);
  // shell.mkdir(configDir);
  // shell.mkdir(servicesDir);

  // Create config files/
  // await createConfigFiles(configDir, useTypeScript);

  // Create service files
  // await createServiceFiles(servicesDir, useTypeScript);

  // Create template files
  // await createTemplateFiles(srcDir, template, useTypeScript);

  // Create template files
  if (template === "Hello World") {
    await createWebTemplate(projectName, useTypeScript, useTailwindcss);
  } else if (template === "API Server") {
    await createApiServerTemplate(projectName, useTypeScript);
  }


  // Update package.json scripts
  const packageJsonPath = path.join(process.cwd(), "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
  packageJson.scripts = {
    dev: useTypeScript
      ? "nodemon --watch 'src/**' --exec tsx src/index.ts"
      : "nodemon --watch 'src/**' --exec node src/index.js",
    build: useTypeScript ? "tsc" : undefined,
    start: useTypeScript ? "node dist/index.js" : "node src/index.js",
  };
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  spinner.succeed(chalk.green("Folder setup complete!"));
 } catch (error) {
  console.error(chalk.red("\nFailed to create Project Files."));
  // console.error(error);
   process.exit(1);
 }
};


export const setupAbsoluteImports = (alias: string) => {
  console.log(chalk.blue("Setting up absolute imports..."));
  const tsconfigPath = path.join(process.cwd(), "tsconfig.json");

  try {
    // Read and parse the tsconfig.json file
    const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, "utf-8"));

    // Update the tsconfig.json with the new alias
    tsconfig.compilerOptions = {
      ...tsconfig.compilerOptions,
      baseUrl: ".",
      paths: {
        [alias]: ["src/*"],
      },
    };

    // Write the updated tsconfig.json back to the file
    fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
    console.log(chalk.green("\nImport alias configured successfully!"));
  } catch (error) {
    console.error(chalk.red("\nFailed to configure absolute imports."));
   // console.error(error);
    process.exit(1);
  }
};
