import fs from "fs";
import path from "path";
import chalk from "chalk";
import { execa } from "execa";
import ora from "ora";

export const setupTailwindCSS = async (projectName: string) => {
    const spinner = ora("Setting up Tailwind CSS...").start();

    try {
        // Install Tailwind CSS
        await execa("npm", ["install", "-D", "tailwindcss"]);
        await execa("npx", ["tailwindcss", "init"]);

        // Generate tailwind.config.js
        const tailwindConfigPath = path.join(process.cwd(), "tailwind.config.js");
        const tailwindConfigContent = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,ejs}"],
  theme: {
    extend: {},
  },
  plugins: [],
}`;
        fs.writeFileSync(tailwindConfigPath, tailwindConfigContent);
        const srcDir = path.join(process.cwd(), 'src');
        const publicDir = path.join(srcDir, "public");
        fs.mkdirSync(srcDir, { recursive: true });
        fs.mkdirSync(publicDir, { recursive: true });

        // Create input.css file
        const inputCssPath = path.join(publicDir, "input.css");
        const inputCssContent = `@tailwind base;
@tailwind components;
@tailwind utilities;`;
        fs.writeFileSync(inputCssPath, inputCssContent);

        // Update package.json scripts to include Tailwind CSS build process
        const packageJsonPath = path.join(
            process.cwd(),
            "package.json"
        );
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
        packageJson.scripts = {
            ...packageJson.scripts,
            "build:tailwind":
                "npx tailwindcss -i ./src/public/input.css -o ./src/public/styles.css --watch",
        };
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

        spinner.succeed(chalk.green("Tailwind CSS configured successfully!"));
    } catch (error) {
        spinner.fail(chalk.red("Failed to set up Tailwind CSS."));
        //console.error(error);
        process.exit(1);
    }
};


