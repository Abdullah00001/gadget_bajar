const io = require('socket.io-client');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiVVNFUiIsInN1YiI6ImI0NzI5MTJjLTUwNzktNGJiNS1iMDU0LWUwMzg0ZjkyYWJmZSIsImlhdCI6MTc2NDYwNzA5NSwiZXhwIjoxNzY0NjkzNDk1fQ.uZVDn8vWIFrbq4DYLhGyaSp_g_Fekaiim4m4ABNtLBc';

const socket = io('https://gadget-bajar.onrender.com', {
  path: '/socket.io/',
  // Explicitly list transports to ensure WebSocket is attempted first
  transports: ['polling'],
  auth: { token }
});

socket.on('connect', () => {
  console.log('✅ CONNECTED! Socket ID:', socket.id);
  console.log('👂 Listening for updates...\n');
});

socket.on('orderUpdate', (data) => {
  console.log('🔔 ORDER UPDATE RECEIVED:');
  console.log(JSON.stringify(data, null, 2));
  console.log('---\n');
});

socket.on('connect_error', (error) => {
  console.error('❌ Connection Error:', error.message);
});

socket.on('disconnect', () => {
  console.log('🔌 Disconnected');
});

console.log('🚀 Starting Socket.IO client...');