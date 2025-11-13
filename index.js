#!/usr/bin/env node

/**
 * 🚀 Heimage Bot - Single Entry Point
 * 
 * This file runs everything with a single command: node index.js
 * Or use: npm start
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('═══════════════════════════════════════════════════════');
console.log('  🚀 Heimage Bot - Starting Everything');
console.log('═══════════════════════════════════════════════════════\n');

// Check if server and client directories exist
const serverPath = path.join(__dirname, 'server');
const clientPath = path.join(__dirname, 'client');

if (!fs.existsSync(serverPath)) {
  console.error('❌ Error: server/ directory not found!');
  process.exit(1);
}

if (!fs.existsSync(clientPath)) {
  console.error('❌ Error: client/ directory not found!');
  process.exit(1);
}

// Check if node_modules exist
const serverNodeModules = path.join(serverPath, 'node_modules');
const clientNodeModules = path.join(clientPath, 'node_modules');

if (!fs.existsSync(serverNodeModules)) {
  console.log('⚠️  Installing server dependencies...');
  const install = spawn('npm', ['install'], {
    cwd: serverPath,
    shell: true,
    stdio: 'inherit'
  });
  install.on('close', (code) => {
    if (code !== 0) {
      console.error('❌ Failed to install server dependencies');
      process.exit(1);
    }
    startServers();
  });
} else if (!fs.existsSync(clientNodeModules)) {
  console.log('⚠️  Installing client dependencies...');
  const install = spawn('npm', ['install'], {
    cwd: clientPath,
    shell: true,
    stdio: 'inherit'
  });
  install.on('close', (code) => {
    if (code !== 0) {
      console.error('❌ Failed to install client dependencies');
      process.exit(1);
    }
    startServers();
  });
} else {
  startServers();
}

function startServers() {
  console.log('\n📦 Starting Backend Server...');
  const backend = spawn('npm', ['run', 'dev'], {
    cwd: serverPath,
    shell: true,
    stdio: 'inherit'
  });

  console.log('📦 Starting Frontend Server...\n');
  const frontend = spawn('npm', ['run', 'dev'], {
    cwd: clientPath,
    shell: true,
    stdio: 'inherit'
  });

  // Handle process exit
  const cleanup = () => {
    console.log('\n\n🛑 Stopping servers...');
    backend.kill();
    frontend.kill();
    process.exit(0);
  };

  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);

  console.log('═══════════════════════════════════════════════════════');
  console.log('  ✅ Servers Started!');
  console.log('═══════════════════════════════════════════════════════');
  console.log('  🔵 Backend:  http://localhost:5000');
  console.log('  🟢 Frontend: http://localhost:5173');
  console.log('═══════════════════════════════════════════════════════');
  console.log('\n  Press Ctrl+C to stop both servers\n');
}

