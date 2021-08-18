const express = require('express');

// express app
const app = express();
app.listen(3000);

// middlewire & static files
app.use(express.json());
app.use(express.static('public'));

// routes
app.get('/', (req, res) => {
    res.sendFile('./views/index.html', {root: __dirname})
});

app.post('/', (req, res) => {

    console.log(req.body);
    // predictions(req.body.textIn).then(textOut => {
    //     res.send(textOut);
    // });
});

// 404
app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', {root: __dirname})
});