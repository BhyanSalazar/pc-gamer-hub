function guardar(){


let datos=new FormData();


datos.append(
"nombre",
nombre.value
);


datos.append(
"categoria",
categoria.value
);


datos.append(
"imagen",
imagen.files[0]
);


datos.append(
"descripcion",
descripcion.value
);


datos.append(
"requisitos",
requisitos.value
);



fetch(

"http://localhost:3000/subir-juego",

{

method:"POST",

body:datos

}

)

.then(r=>r.json())

.then(res=>{

alert(res.mensaje);

});


}
if("serviceWorker" in navigator){

navigator.serviceWorker.register(
"service-worker.js"
);

}
function analizar(){

let pc={

ram:ram.value,

gpu:gpu.value,

cpu:cpu.value

};


fetch(
"http://localhost:3000/recomendar",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:
JSON.stringify(pc)

}

)

.then(r=>r.json())

.then(data=>{

resultado.innerHTML=data;

});

}