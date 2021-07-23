const fetch = require("node-fetch");

// parameters
var parameters = {
    omlserver : "",
    tenant : "",
    database : "",
    username : "",
    password : "",
};

// functions
var getToken = async ({database, username, password, tenant, omlserver}) => {

    // set constructors
    var url = `${omlserver}/omlusers/tenants/${tenant}/databases/${database}/api/oauth2/v1/token`;
    var body = {
        "grant_type":"password",
        "username": `${username}`,
        "password": `${password}`
    };
    
    // fetch data
    var token = await fetch(url,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
    
    return await token.json();
};

// cognitive text
var mostRelevantKeywords =  async ({database, username, password, tenant, omlserver}, text, topN, languaje) => {

    const token = await getToken({database, username, password, tenant, omlserver});
    const accessToken = token["accessToken"];

    const url = `${omlserver}/omlmod/v1/cognitive-text/summary`;
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}` 
    };
    const body = {
        "textList": [text],
        "topN": topN,
        "language": languaje
    };
    
    const data = await fetch(url,{
            method:"POST",
            headers: headers,
            body:JSON.stringify(body)           
        });

    return JSON.stringify(await data.json());

};

var getSentimentTextML =  async ({database, username, password, tenant, omlserver}, text) => {

    const token = await getToken({database, username, password, tenant, omlserver});
    const accessToken = token["accessToken"];

    const url = `${omlserver}/omlmod/v1/cognitive-text/sentiment`;
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}` 
    };
    const body = {
        "textList": [textIn]
    };
    
    const jsonReq = await fetch(url, {
            method:"POST",
            headers: headers,
            body:JSON.stringify(body)           
        });

    return await jsonReq.json();

};

var predictions = async (textIn) => {
    const data = await mostRelevantKeywords(parameters, textIn, 5, "SPANISH");
    return data
};

module.exports = predictions;