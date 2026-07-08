const express=require("express");

const cors=require("cors");

const bcrypt=require("bcrypt");

const jwt=require("jsonwebtoken");

const db=require("./baseDatos");


const app=express();

const multer = require("multer");

const path = require("path");

const storage = multer.diskStorage({

destination:(req,file,cb)=>{

cb(null,"uploads/imagenes-juegos");

},


filename:(req,file,cb)=>{

cb(null,
Date.now()+path.extname(file.originalname)
);

}

});


const upload = multer({
storage:storage
});
app.use(cors());

app.use(express.json());


const SECRET="CLAVE_SUPER_SEGURA_CAMBIAR";



/*
REGISTRO
*/

app.post("/registro",
async(req,res)=>{


let {
nombre,
email,
password
}=req.body;



let hash=await bcrypt.hash(
password,
10
);



db.run(

`
INSERT INTO usuarios
(nombre,email,password)
VALUES(?,?,?)
`,

[nombre,email,hash],

function(err){


if(err){

return res.json({
error:"Usuario ya existe"
});

}


res.json({
mensaje:"Cuenta creada",
id:this.lastID
});


});


});


function verificarAdmin(req,res,next){

let rol=req.headers.rol;


if(rol !== "administrador"){

return res.status(403).json({

error:"No tienes permisos"

});

}


next();

}
(req,res)=>{


let juego={

nombre:req.body.nombre,

imagen:req.file.filename,

categoria:req.body.categoria,

descripcion:req.body.descripcion,

requisitos:req.body.requisitos

};



db.run(

`

INSERT INTO juegos

(nombre,imagen,categoria,descripcion,requisitos)

VALUES(?,?,?,?,?)

`,

[

juego.nombre,
juego.imagen,
juego.categoria,
juego.descripcion,
juego.requisitos

],


()=>{

res.json({

mensaje:"Juego publicado correctamente"

});


});


});


/*
LOGIN
*/

app.post("/login",

(req,res)=>{


let {
email,
password
}=req.body;



db.get(

`
SELECT * FROM usuarios
WHERE email=?

`,

[email],

async(err,user)=>{


if(!user){

return res.json({
error:"Usuario no encontrado"
});

}



let correcto=
await bcrypt.compare(
password,
user.password
);



if(!correcto){

return res.json({
error:"Contraseña incorrecta"
});

}



let token=jwt.sign(

{
id:user.id,
nombre:user.nombre

},

SECRET,

{
expiresIn:"7d"
}

);



res.json({

mensaje:"Bienvenido",

token

});


});


});





/*
LISTAR JUEGOS
*/


app.get("/juegos",

(req,res)=>{


db.all(

"SELECT * FROM juegos",

[],
(err,data)=>{

res.json(data);

}

);


});





app.listen(
3000,
()=>{

console.log(
"Servidor Gamer iniciado en puerto 3000"
);

});
app.post("/subir-juego",

(req,res)=>{


let {
nombre,
imagen,
categoria,
descripcion,
requisitos

}=req.body;



db.run(

`

INSERT INTO juegos

(nombre,imagen,categoria,descripcion,requisitos)

VALUES(?,?,?,?,?)

`,

[
nombre,
imagen,
categoria,
descripcion,
requisitos
],


function(err){


if(err){

return res.json({
error:"Error al guardar"
});

}



res.json({

mensaje:"Juego publicado",

id:this.lastID

});


});


});
function soloAdmin(req,res,next){

if(req.headers.rol !== "administrador"){

return res.status(403).json({

error:"Acceso bloqueado"

});

}

next();

}
app.post(
"/admin/juegos",
soloAdmin,
(req,res)=>{

// guardar juego en base de datos

res.json({

mensaje:"Juego agregado"

});

});
app.use(

"/uploads",

express.static("uploads")

);
app.post("/crear-perfil",

(req,res)=>{


let {

usuario_id,

avatar,

descripcion

}=req.body;



db.run(

`

INSERT INTO perfiles

(usuario_id,avatar,descripcion)

VALUES(?,?,?)

`,

[

usuario_id,
avatar,
descripcion

],


()=>{


res.json({

mensaje:"Perfil creado"

});


});


});
app.post("/comentario",

(req,res)=>{


let {

usuario,

juego_id,

mensaje

}=req.body;



db.run(

`

INSERT INTO comentarios

(usuario,juego_id,mensaje)

VALUES(?,?,?)

`,

[

usuario,
juego_id,
mensaje

],


()=>{


res.json({

mensaje:"Comentario publicado"

});


});


});
app.get("/comentarios/:id",

(req,res)=>{


db.all(

`

SELECT *

FROM comentarios

WHERE juego_id=?

`,

[req.params.id],

(err,data)=>{


res.json(data);


});


});
function darXP(usuario_id){

db.run(

`

UPDATE perfiles

SET xp = xp + 10,

puntos = puntos + 10

WHERE usuario_id=?

`,

[usuario_id]

);

}
function calcularNivel(xp){

if(xp>=500)
return 4;

if(xp>=250)
return 3;

if(xp>=100)
return 2;


return 1;

}
CREATE TABLE IF NOT EXISTS favoritos(

id INTEGER PRIMARY KEY AUTOINCREMENT,

usuario_id INTEGER,

juego_id INTEGER

)
app.post("/favorito",

(req,res)=>{


let {

usuario_id,

juego_id

}=req.body;



db.run(

`

INSERT INTO favoritos

(usuario_id,juego_id)

VALUES(?,?)

`,

[usuario_id,juego_id],


()=>{


res.json({

mensaje:"Añadido a favoritos"

});


});


});
CREATE TABLE IF NOT EXISTS valoraciones(

id INTEGER PRIMARY KEY AUTOINCREMENT,

usuario_id INTEGER,

juego_id INTEGER,

estrellas INTEGER

)
app.post("/valorar",

(req,res)=>{


let {

usuario_id,

juego_id,

estrellas

}=req.body;



db.run(

`

INSERT INTO valoraciones

(usuario_id,juego_id,estrellas)

VALUES(?,?,?)

`,

[
usuario_id,
juego_id,
estrellas
],


()=>{


res.json({

mensaje:"Valoración guardada"

});


});


});
app.post("/valorar",

(req,res)=>{


let {

usuario_id,

juego_id,

estrellas

}=req.body;



db.run(

`

INSERT INTO valoraciones

(usuario_id,juego_id,estrellas)

VALUES(?,?,?)

`,

[
usuario_id,
juego_id,
estrellas
],


()=>{


res.json({

mensaje:"Valoración guardada"

});


});


});
PORT=3000

SECRET_TOKEN=pon_una_clave_larga_y_segura

DATABASE=gamerhub.db
db.run(`

CREATE TABLE IF NOT EXISTS publicaciones(

id INTEGER PRIMARY KEY AUTOINCREMENT,

usuario TEXT,

titulo TEXT,

contenido TEXT,

fecha DATETIME DEFAULT CURRENT_TIMESTAMP

)

`);
app.get("/foro",

(req,res)=>{


db.all(

`

SELECT *

FROM publicaciones

ORDER BY fecha DESC

`,

[],


(err,data)=>{


res.json(data);


});


});
db.run(`

CREATE TABLE IF NOT EXISTS mensajes(

id INTEGER PRIMARY KEY AUTOINCREMENT,

remitente TEXT,

destinatario TEXT,

mensaje TEXT,

fecha DATETIME DEFAULT CURRENT_TIMESTAMP

)

`);
CREATE TABLE IF NOT EXISTS notificaciones(

id INTEGER PRIMARY KEY AUTOINCREMENT,

usuario TEXT,

mensaje TEXT,

leido INTEGER DEFAULT 0

)
CREATE TABLE noticias(

id INTEGER PRIMARY KEY AUTOINCREMENT,

titulo TEXT,

imagen TEXT,

contenido TEXT,

autor TEXT,

fecha DATETIME DEFAULT CURRENT_TIMESTAMP

);
function verificarAdmin(req,res,next){

let rol=req.headers.rol;


if(rol !== "administrador"){

return res.status(403).json({

error:"No tienes permisos"

});

}


next();

}
CREATE TABLE reportes(

id INTEGER PRIMARY KEY AUTOINCREMENT,

usuario TEXT,

contenido TEXT,

motivo TEXT,

estado TEXT DEFAULT 'pendiente'

);