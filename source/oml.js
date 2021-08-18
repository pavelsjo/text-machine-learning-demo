const fetch = require("node-fetch");

class AutonomousDataBase {
    constructor({omlserver, tenant, database, username, password}) {
        this.omlserver = omlserver;
        this.tenant = tenant;
        this.database = database;
        this.username = username;
        this.password = password;
    }
    getToken = () => {

        // set constructors
        var url = `${this.omlserver}/omlusers/tenants/${this.tenant}/databases/${this.database}/api/oauth2/v1/token`;
    
        // fetch data
        var token = await fetch(url,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify( {"grant_type":"password", "username": `${this.username}`, "password": `${this.password}`} )

            });
    
        return await token.json();
    }
    mostRelevantKeywords = async ({text, topN, languaje}) => {
        
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
    }
};

module.exports = AutonomousDataBase;