import fs from "fs";
import path from "path";
import chalk from "chalk";

export const createWebTemplate = async (
  projectName: string,
  useTypeScript: boolean,
  useTailwindcss: boolean
) => {
  const srcDir = path.join(process.cwd(), "src");
  const viewsDir = path.join(srcDir, "views");
  const publicDir = path.join(srcDir, "public");

  // Create directories
  fs.mkdirSync(srcDir, { recursive: true });
  fs.mkdirSync(viewsDir, { recursive: true });
  fs.mkdirSync(publicDir, { recursive: true });

  // Create index.ts file
  const indexContent = `import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', { title: 'Welcome to the Web App' });
});

app.listen(port, () => {
  console.log(\`Server is running on http://localhost:\${port}\`);
});
`;

  const configFile = useTypeScript ? "index.ts" : "index.js";

  fs.writeFileSync(path.join(srcDir, configFile), indexContent);

  // Create index.ejs file
  const ejsContent = `<!DOCTYPE html>
  <html>
  <head>
      <title><%= title %></title>
      <link rel="stylesheet" type="text/css" href="/output.css" />
  </head>
  <body class="${useTailwindcss ? "bg-gray-100 text-center p-10" : ""}">
      <h1 class="${
        useTailwindcss ? "text-3xl font-bold text-blue-600" : ""
      }"><%= title %></h1>
      <p class="${
        useTailwindcss ? "mt-4 text-gray-700" : ""
      }">This is a web application built with Express.js and EJS.</p>
  </body>
  </html>
  `;

  fs.writeFileSync(path.join(viewsDir, "index.ejs"), ejsContent);

  // Create styles.css file (if Tailwind CSS is not used)
  if (!useTailwindcss) {
    const cssContent = `body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  text-align: center;
  padding: 50px;
}
`;

    fs.writeFileSync(path.join(publicDir, "styles.css"), cssContent);
  }

  console.log(chalk.green("\nWeb template created successfully!"));
};
