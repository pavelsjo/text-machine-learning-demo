const express = require('express');
const data = require('./source/db/db.json');
const adb = require('./source/node-oml/node-oml/adb');

const parameters = {
    omlserver : process.env.OMLSERVER,
    tenant : process.env.TENANT,
    database : process.env.DATABASENAME,
    username : process.env.USERNAME,
    password : process.env.PASSWORD,
};

const oml = new adb.AutonomousDataBase(parameters);

// data
let jobArray = new Array();
const jobs = data.searchResults.hits.hits;
jobs.forEach( job => jobArray.push(job["_source"]["JobInformation"]["Title"]) );

// express app
const app = express();
app.listen(3000);

// middlewire & static files
app.use(express.json());
app.use(express.static('public'));

// routes
app.get('/', (req, res) => {
    res.sendFile('./views/index.html', {root: __dirname});    
});

app.post('/', (req, res) => {

    console.log(req.body);
    oml.semanticSimilarities(
        {
            languaje:"SPANISH",
            probe: req.body.probe,
            sortDirection:"DESC",
            textList: jobArray,
            treshold:0.05,
        }
    ).then( resp => res.send({ "msg": resp}))
    .catch( err => console.log(err));
});

// data
app.get('/data', (req, res) => {
    res.send( { "msg": data}) 
});

// 404
app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', {root: __dirname})
});