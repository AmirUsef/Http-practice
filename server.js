const http = require('http');
const fs = require('fs');
const users = require("./users");

http.createServer(function(request, response) {
    if (request.url === '/' && request.method === 'GET') {
        fs.readFile("./public/index.html", "utf8", (err, html) => {
            if (err) console.log(err.message);
            response.setHeader('Content-Type', 'text/html');
            response.write(html);
            response.end();
        })
    } else if (request.url === '/css/style.css' && request.method === 'GET') {
        fs.readFile("./public/css/style.css", "utf8", (err, css) => {
            if (err) console.log(err.message);
            response.write(css);
            response.end();
        })
    } else if (request.url === '/js/main.js' && request.method === 'GET') {
        fs.readFile("./public/js/main.js", "utf8", (err, js) => {
            if (err) console.log(err.message);
            response.write(js);
            response.end();
        })
    } else if (request.url === '/css/persian-gulf.jpg' && request.method === 'GET') {
        fs.readFile("./public/css/persian-gulf.jpg", (err, data) => {
            if (err) console.log(err.message);
            response.writeHead(200, { 'Content-Type': 'image/jpeg' })
            response.end(data);
        })
    } else if (request.url === '/' && request.method === 'POST') {
        let body = [];
        request.on('error', (err) => {
            console.error(err);
        }).on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = JSON.parse(Buffer.concat(body).toString());
            let user = users.find(item => item.userName == body.userName)
            if (user === undefined)
                response.write("wrong username");
            else if (user.password != body.password)
                response.write("wrong pass");
            else
                response.write("successful");
            response.end();
        });
    } else {
        response.write("bad request");
        response.end();
    }
}).listen(5005);