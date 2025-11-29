#!/usr/bin/env node
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get current directory in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Use Node.js to run vite directly, bypassing shell permission issues
const vitePath = join(__dirname, 'node_modules', 'vite', 'bin', 'vite.js');
const child = spawn('node', [vitePath, 'build'], {
  stdio: 'inherit',
  cwd: __dirname
});

child.on('close', (code) => {
  process.exit(code);
});