"use strict";
const http = require("http");
const url = require("url");
const fs = require('fs');

function webserver(req,res){
  let filepath = (req.url === "/")? "index.html" : __dirname + req.url;
  let fstream = fs.createReadStream(filepath);
  fstream.on('open', function(){
    if(req.url==='/data.js'){
      res.writeHead(200,{'content-type':'application/json'})
    }else{
        res.writeHead(200, {'content-type':'text/html'});
    }
    fstream.pipe(res);
  });
  fstream.on('error', function(){
    res.writeHead(500, {'content-type':'text/html'});
    res.end("Server Error! File cannot be read!!");
  });
}
http.createServer(webserver).listen(3000, () => console.log("Server Running on port 3000"));
