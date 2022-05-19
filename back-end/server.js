const { json } = require("express/lib/response");

const express = require("express");
const server = express();
const { append } = require('express/lib/response');
const https = require("https");
const res = require("express/lib/response");
var cors = require('cors')
var bodyParser = require('body-parser')

server.use(express.json());
server.use(cors());

const port = 9000;
const SUBSCRIPTION_KEY = 'd530b9ea26674bb7aaa039028afe9db8'


server.post("/search", (req, response) => {

    const query = req.body.query;
    var options = {
      host: "api.bing.microsoft.com",
      path: `/v7.0/search?q=` + encodeURI(query),
      method: "GET",
      headers: {
        "Ocp-Apim-Subscription-Key" : SUBSCRIPTION_KEY
      }
    }
  
    let results = "";
  
    https.request(options,(res) =>{
      res.on("data", (data) =>{
         results += data;
      })
      res.on("end", () =>{
        const jsonResults = JSON.parse(results);
        response.send(jsonResults);
      })
    })
    .end();
    
  })

  server.listen(port, () => {
    console.log("Started server on port: " + port);
  })