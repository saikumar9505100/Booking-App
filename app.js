const express = require('express');
const app = express();
app.get('/', (req, res) => {
res.json({
service: 'Bank Service',
status: 'running'
});
});
app.get('/accounts', (req, res) => {
res.json({
accounts: ['Savings', 'Current', 'FD', 'RD']
});
});
app.listen(3000, () => {
console.log('Bank Service running on port 3000');
});
