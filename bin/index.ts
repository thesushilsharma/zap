#!/usr/bin/env node

import { startGenerator } from '../src/main.js';
import chalk from 'chalk';

(async () => {
    try {
        await startGenerator();
    } catch (error) {
        console.error(chalk.red('Unexpected Error:'));
        process.exit(1);
    }
})();