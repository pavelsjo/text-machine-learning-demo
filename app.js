const express = require('express');
const AutonomousDataBase = require('./source/oml');

const adb =  new AutonomousDataBase({
    omlserver : process.env.OMLSERVER,
    tenant : process.env.TENANT,
    database : process.env.DATABASENAME,
    username : process.env.USERNAME,
    password : process.env.PASSWORD,
});

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
    res.send({"msg":adb.mostRelevantKeywords({text:req.body, topN:5, languaje:"SPANISH"})});
    
});

// 404
app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', {root: __dirname})
});