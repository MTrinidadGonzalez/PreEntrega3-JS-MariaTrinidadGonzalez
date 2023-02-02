class Usuario{
    constructor(id,nombre,apellido,provincia,localidad,cargo,correo,descripcion){
        this.id= id;
        this.nombre= nombre.toUpperCase();
        this.apellido= apellido.toUpperCase();
        this.provincia= provincia;
        this.localidad= localidad;
        this.cargo= cargo;
        this.correo= correo;
        this.descripcion= descripcion;
    }
}    

const usuarios =[];

/*FORM CREAR CUENTA*****************************/

const formCrearCuenta = document.querySelector('#formCrearCuenta');



function agregarUsuario(){
    const id= ((usuarios.length)+1)
    const nombre= document.getElementById('nombre').value;
    const apellido= document.getElementById('apellido').value;
    const provincia= document.getElementById('provincias').value;
    const localidad= document.getElementById('localidad').value;
    const cargo= document.getElementById('cargoUsuario').value;
    const correoUsuario= document.getElementById('correoUsuario').value;
    const descripcion= document.getElementById('descripcionDeUsuario').value;
  

    const usuario= new Usuario (id,nombre, apellido, provincia, localidad, cargo, correoUsuario, descripcion);
    
    usuarios.push(usuario);
    formCrearCuenta.reset()

    
}
formCrearCuenta.addEventListener('submit', (e)=>{
    e.preventDefault();
    agregarUsuario();    
  
localStorage.setItem("ListausuariosLS", JSON.stringify(usuarios));

});

//localStorage.clear();

//*genero un div para cada usuario para q sea su perfil*/

const contenedorDeUsuarios= document.getElementById("divConCardUsuarios");
const verPerfiles= document.getElementById('btn-listaUsariosCard');

//parceo array usuarios

const listUserParseada= JSON.parse(localStorage.getItem("ListausuariosLS")) || [];

verPerfiles.onclick=(e)=>{
    
    e.preventDefault();
    muestroTodosCardsUsuarios();
}
;
function muestroTodosCardsUsuarios(){
    for(usuario of listUserParseada){
   
        cardUsuario= document.createElement('div')
       cardUsuario.innerHTML=
        `
        <div class="card cardPerfilDeUsuario">
            <h5>Nombre: ${usuario.nombre} ${usuario.apellido}</h5>
            <p>Provincia: ${usuario.provincia}</p></br>
            <p>Localidad: ${usuario.localidad}</p> </br>
            <p>Cargo:  ${usuario.cargo}</p> </br>
            <p>Correo:  ${usuario.correoUsuario}</p> </br>
            <p>Descripcion:  ${usuario.descripcion}</p> </br>
         
        </div>
        `;
        contenedorDeUsuarios.append(cardUsuario); 
    }
};


//BUSCADOR por nombre y apellido


const btnBuscarNombre= document.getElementById('btnBuscar');
let nombreBuscado= (document.getElementById('buscadorNombre').value).toUpperCase();
let apellidoBuscado= (document.getElementById('buscadorApellido').value).toUpperCase();


btnBuscarNombre.addEventListener('click',(e)=>{
    e.preventDefault();
   CreoCardEncontradosNombre()
    
});

let lisEncontradosNombre= listUserParseada.filter(function(usuario){
    if ((nombreBuscado === usuario.nombre) && (apellidoBuscado === usuario.apellido)){
      return true;
     } 
     
     //aca no me acepta el else, si lo pongo me retorna tanto el if como el else
     
})
const divEncontradosNombre= document.getElementById('divEncontradosNombre');

function CreoCardEncontradosNombre(){
    for(usuario of lisEncontradosNombre){
   
        cardUsuario= document.createElement('div')
       cardUsuario.innerHTML=
        `
        <div class="card cardPerfilDeUsuario">
            <h5>Nombre: ${usuario.nombre} ${usuario.apellido}</h5>
            <p>Provincia: ${usuario.provincia}</p></br>
            <p>Localidad: ${usuario.localidad}</p> </br>
            <p>Cargo:  ${usuario.cargo}</p> </br>
            <p>Correo:  ${usuario.correoUsuario}</p> </br>
            <p>Descripcion:  ${usuario.descripcion}</p> </br>
         
        </div>
        `;
        divEncontradosNombre.appendChild(cardUsuario); 
    }
};


//BUSCADOR por provincia
let provinciaBuscada= document.getElementById('buscoProvincia').value;

const divCardEncontradosProvincia=document.getElementById('divCardEncontradosProvincia');
const btnBuscoProvincia= document.getElementById('btnBuscoProvincia');

let listaProvinciaEncontrada= listUserParseada.filter(function(usuario){
    if(provinciaBuscada === usuario.provincia) {
        return true;
        
       } 
});
btnBuscoProvincia.onclick= (e)=>{
e.preventDefault();
creoCardEncontradosPvcia();
};

function creoCardEncontradosPvcia(){
    for(usuario of listaProvinciaEncontrada){
   
        cardUsuario= document.createElement('div')
       cardUsuario.innerHTML=
        `
        <div class="card cardPerfilDeUsuario">
            <h5>Nombre: ${usuario.nombre} ${usuario.apellido}</h5>
            <p>Provincia: ${usuario.provincia}</p></br>
            <p>Localidad: ${usuario.localidad}</p> </br>
            <p>Cargo:  ${usuario.cargo}</p> </br>
            <p>Correo:  ${usuario.correoUsuario}</p> </br>
            <p>Descripcion:  ${usuario.descripcion}</p> </br>
         
        </div>
        `;
        divCardEncontradosProvincia.appendChild(cardUsuario); 
    }
};

