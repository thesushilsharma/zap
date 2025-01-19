import fs from "fs";
import path from "path";
import chalk from "chalk";

export const createApiServerTemplate = async (
  projectName: string,
  useTypeScript: boolean
) => {
  const srcDir = path.join(process.cwd(), "src");

  // Create directories
  fs.mkdirSync(srcDir, { recursive: true });

  // Create index.ts file
  const indexContent = `import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API Server' });
});

app.listen(port, () => {
  console.log(\`Server is running on http://localhost:\${port}\`);
});
`;
  const indexFile = useTypeScript ? "index.ts" : "index.js";
  fs.writeFileSync(path.join(srcDir, indexFile), indexContent);

  console.log(chalk.green("\nAPI Server template created successfully!"));
};
