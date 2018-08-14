const express = require('express');
const path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, html) => {
    res.send(html);
})

app.listen(3000, () => {
    console.log('Node app running on port 3000');
});
