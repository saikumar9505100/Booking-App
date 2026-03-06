const express = require('express');
const app = express();
app.get('/', (req, res) => {
res.json({
service: 'Bus Service',
status: 'running'
});
});
app.get('/buses', (req, res) => {
res.json({
buses: ['Hyderabad-Bangalore', 'Hyderabad-Chennai', 'Hyderabad-Mumbai']
});
});
app.listen(3000, () => {
console.log('Bus Service running on port 3000');
});
