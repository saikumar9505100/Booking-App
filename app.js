const express = require('express');
const app = express();
app.get('/', (req, res) => {
res.json({
service: 'Movie Service',
status: 'running'
});
});
app.get('/movies', (req, res) => {
res.json({
movies: ['Baahubali', 'RRR', 'KGF']
});
});
app.listen(3000, () => {
console.log('Movie Service running on port 3000');
});
