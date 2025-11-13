const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Backend and Frontend...\n');

// Start backend
const backend = spawn('npm', ['run', 'dev'], {
  cwd: path.join(__dirname, 'server'),
  shell: true,
  stdio: 'inherit'
});

// Start frontend
const frontend = spawn('npm', ['run', 'dev'], {
  cwd: path.join(__dirname, 'client'),
  shell: true,
  stdio: 'inherit'
});

// Handle process exit
process.on('SIGINT', () => {
  console.log('\n🛑 Stopping servers...');
  backend.kill();
  frontend.kill();
  process.exit();
});

console.log('✅ Backend: http://localhost:5000');
console.log('✅ Frontend: http://localhost:5173');
console.log('\nPress Ctrl+C to stop both servers\n');

