const sqlite3 = require("sqlite3").verbose();


const db = new sqlite3.Database(
"gamerhub.db"
);


db.serialize(()=>{


db.run(`

CREATE TABLE IF NOT EXISTS usuarios(

id INTEGER PRIMARY KEY AUTOINCREMENT,

nombre TEXT,

email TEXT UNIQUE,

password TEXT,

nivel INTEGER DEFAULT 1

)

`);



ddb.run(`

CREATE TABLE IF NOT EXISTS juegos(

id INTEGER PRIMARY KEY AUTOINCREMENT,

nombre TEXT,

imagen TEXT,

categoria TEXT,

descripcion TEXT,

requisitos TEXT,

fecha DATETIME DEFAULT CURRENT_TIMESTAMP

)

`);


module.exports=db;
db.run(`

CREATE TABLE IF NOT EXISTS perfiles(

id INTEGER PRIMARY KEY AUTOINCREMENT,

usuario_id INTEGER,

avatar TEXT,

descripcion TEXT,

nivel INTEGER DEFAULT 1,

xp INTEGER DEFAULT 0,

puntos INTEGER DEFAULT 0

)

`);
db.run(`

CREATE TABLE IF NOT EXISTS comentarios(

id INTEGER PRIMARY KEY AUTOINCREMENT,

usuario TEXT,

juego_id INTEGER,

mensaje TEXT,

fecha DATETIME DEFAULT CURRENT_TIMESTAMP

)

`);
db.run(`

CREATE TABLE IF NOT EXISTS publicaciones(

id INTEGER PRIMARY KEY AUTOINCREMENT,

usuario TEXT,

titulo TEXT,

contenido TEXT,

fecha DATETIME DEFAULT CURRENT_TIMESTAMP

)

`);
CREATE TABLE requisitos_juegos(

id INTEGER PRIMARY KEY,

juego_id INTEGER,

cpu TEXT,

ram INTEGER,

gpu TEXT,

nivel TEXT

);