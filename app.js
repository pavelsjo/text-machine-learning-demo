const express = require('express');
const predictions = require('./source/oml');

// express app
const app = express();
app.listen(3000);

// view engine
app.set('view engine', 'ejs');

// middlewire & static files
app.use(express.json());
app.use(express.static('public'));

// routes
app.get('/', (req, res) => {
    res.render('index', {title:'Intro'});
});

app.post('/', (req, res) => {

    predictions(req.body.textIn).then(textOut => {
        res.send(textOut);
    });
});