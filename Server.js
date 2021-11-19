const express = require("express");
const server = express();
const nunjucks = require('nunjucks');
const db = require('./db.js');

server.use(express.static(__dirname + '/public'));
server.use(express.urlencoded({extended: true}));

nunjucks.configure('views', {
    express: server,
    noCache: true
});

server.get("/", function(req, res){

    let response = [];

    db.all('SELECT * FROM projetos', (error, rows)=>{
        if(error) return console.log(error);

        for(let i = rows.length - 1; i >= 0; i--){
            response.push(rows[i]);
        } 

       return res.render('index.html', {projetos: response});
    });
    
});

server.get("/projetos", function(req, res){
    db.all('SELECT * FROM projetos', (error, rows)=>{
        if(error) return console.log(error);
        return res.render('projects.html', {rows});
    });
});

server.post("/", (req, res)=>{

    let values = [req.body.title, req.body.category, req.body.image, req.body.description, req.body.link]

    db.run(`INSERT INTO projetos 
    (title, 
    category,
    img,
    description,
    url) values (?, ?, ?, ?, ?)`, values, (error)=>{
        if(error) return console.log(error);
        return console.log(req.body);
    });

    return res.redirect("/");

});

server.get("/overview", (req, res)=>{
    db.all('SELECT * FROM projetos', (error, rows)=>{
        if(error) return console.log(error);
        return res.render('overview.html', {rows});
    });
});

server.post('/delete', (req, res)=>{
    db.run('DELETE FROM projetos WHERE title = ?', req.body.projetos, (error)=>{
        if(error) return console.log(error);
        return console.log("deleted");
    });
    return res.redirect("/overview");
});

server.post('/update', (req, res)=>{

    let values = [req.body.title, req.body.category, req.body.image, req.body.description, req.body.link, req.body.projetos]

    console.log(req.body);

    db.run(`UPDATE projetos SET 
    title = ?, 
    category = ?,
    img = ?,
    description = ?,
    url = ?
    WHERE title = ?`, values, (error)=>{
        if(error) return console.log(error);
        return console.log('Updated');
    });
    return res.redirect("/overview");
});


server.listen(3001);