const io = require('socket.io-client');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiVVNFUiIsInN1YiI6IjU0OWZjN2RmLThiMWUtNGQzNS1iNjNhLTg0ZmQyYjc4ZDU1YyIsImlhdCI6MTc2NDUxNDY2NiwiZXhwIjoxNzY0NjAxMDY2fQ.WP8_bv6P1TM8qTZtzOMXnH25tyflzU8LndUwKSfjTmo';

const socket = io('http://localhost:5000', {
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