const sqlite3 = require('sqlite3');
const db = new sqlite3.Database("./SiteFeCEAP.db");

db.serialize(()=>{

    db.run(`CREATE TABLE IF NOT EXISTS projetos(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            img TEXT, 
            title TEXT, 
            category TEXT,
            description TEXT, 
            url TEXT)`);

    //const query = `INSERT INTO projetos(
        //img, 
        //title, 
        //category, 
        //description, 
        //url
        //) VALUES (?,?,?,?,?)`   

    //const values = ["https://www.flaticon.com/svg/static/icons/svg/3408/3408545.svg", "O advento de battle royalle, um estudo sobre Free Fire", "Administração", "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam aliquid repellat tempora illum unde hic dolorum doloribus ipsum quibusdam", "#"]
    //db.run(query, values, function(error){
        //if(error) return console.log(error);
        //console.log(this);
    //});

    //db.all(`SELECT * FROM projetos`, (error, rows)=>{
        //if(error) return console.log(error);
        //console.log(rows);
    //});

    /*db.run("DELETE FROM projetos WHERE id = ?", [10], (error)=>{
        if(error) return console.log(error);
    });*/

    //db.all("SELECT * FROM projetos", (error, rows)=>{
        //if(error) return console.log(error);
        //console.log(rows);
    //});

});

module.exports = db;