#!/usr/bin/env node
const { spawn } = require('child_process');
const path = require('path');

// Use Node.js to run vite directly, bypassing shell permission issues
const vitePath = path.join(__dirname, 'node_modules', 'vite', 'bin', 'vite.js');
const child = spawn('node', [vitePath, 'build'], {
  stdio: 'inherit',
  cwd: __dirname
});

child.on('close', (code) => {
  process.exit(code);
});