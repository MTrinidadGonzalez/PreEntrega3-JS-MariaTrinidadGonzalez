class Usuario{
    constructor(id,nombre,apellido,provincia,municipio,localidad,cargo,correo,descripcion){
        this.id= id;
        this.nombre= nombre.toUpperCase();
        this.apellido= apellido.toUpperCase();
        this.provincia= provincia;
        this.municipio= municipio;
        this.localidad= localidad;
        this.cargo= cargo;
        this.correo= correo;
        this.descripcion= descripcion;
    }
}    

const usuarios =[
preUser1= {id: "1",
nombre: ("Trinidad").toUpperCase(),
apellido: ("Gonzalez").toUpperCase(),
provincia: "Córdoba",
municipio: "Capital",
localidad: "zona norte",
cargo: "docente",
corro: "lala@gmail.com",
descripcion: "probando probando"},

preUser2={id: "2",
nombre: ("Lolo").toUpperCase(),
apellido: ("Graf").toUpperCase(),
provincia: "Córdoba",
municipio: "Capital",
localidad: "zona norte",
cargo: "docente",
corro: "lolo@gmail.com",
descripcion: "probando probando2"},

preUser3={id: "3",
nombre: ("Luna").toUpperCase(),
apellido: ("Sosa").toUpperCase(),
provincia: "Córdoba",
municipio: "Capital",
localidad: "zona norte",
cargo: "docente",
corro: "luna@gmail.com",
descripcion: "probando probando3"},

preUser4={id: "4",
nombre: ("Samira").toUpperCase(),
apellido: ("Crespo").toUpperCase(),
provincia: "Chubut",
municipio: "Capital",
localidad: "Radatilli",
cargo: "docente",
corro: "luna@gmail.com",
descripcion: "probando probando3"},

preUser5={id: "5",
nombre: ("Samira").toUpperCase(),
apellido: ("Perroti").toUpperCase(),
provincia: "Córdoba",
municipio: "Capital",
localidad: "zona sur",
cargo: "docente",
corro: "lolop@gmail.com",
descripcion: "probando probando5"}];

 


/*FORM CREAR CUENTA*****************************/

const formCrearCuenta = document.querySelector('#formCrearCuenta');

//tutorial api de provincias para perfil

const selectPvcia= document.getElementById('selectPvcia');
const selecMunicipio= document.getElementById('selectMunisipio');
const selectLocalidad= document.getElementById('selectLocalidad');
const btnMuestroUbi= document.getElementById('btnMuestroUbi');
let divMuestroUbi= document.getElementById('divMuestroUbi');

//con esta funcion capto el valor de pvcia y lo añado al select
function provinciaFn(){
    fetch("http://apis.datos.gob.ar/georef/api/provincias")
    .then(res => res.ok? res.json(): Promise.reject(res))
    .then(json =>{
        let opcionPvcia= `
        <option value="Elige una provincia">Elige una provincia</option>
        `
json.provincias.forEach(element => opcionPvcia+= `<option value="${element.nombre}">${element.nombre}</option>`);
selectPvcia.innerHTML= opcionPvcia;
})
.catch(error => console.log("capturp que paso un error de la api"));
}
provinciaFn()


//con esta función tomo la pvcia como parametro para asi poder captal el municip
//le agregue capital porque no sale
function municipio(provincia){
    fetch(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${provincia}`)
    .then(res => res.ok? res.json(): Promise.reject(res))
    
    .then(json=>{
        let opcionMunicipio= `<option value="Elige un municipio">Elige un municipio</option>`;
        json.municipios.forEach(elemento=> opcionMunicipio += `<option value="${elemento.nombre}">${elemento.nombre}</option>
        <option value="capital">Capital</option>`);

        selecMunicipio.innerHTML= opcionMunicipio;
    })
    .catch(error => console.log("capturp que paso un error de la api"));
}

municipio();
//capto el evento change o cambio del select de provincia y le pongo la fn de muni

selectPvcia.addEventListener("change", e=>{
    municipio(e.target.value); 
})

//funcion para localidad
function localidad(municipio){
    fetch(`https://apis.datos.gob.ar/georef/api/localidades?municipio=${municipio}`)
    .then(res => res.ok? res.json(): Promise.reject(res))
    
    .then(json=>{
        let opcionLocalidad= `<option value="Elige una localidad">Elige una localidad</option>`;
        json.localidades.forEach(elemento=> opcionLocalidad += `<option value="${elemento.nombre}">${elemento.nombre}</option>
        <option value="capital">Capital</option>`);

        selectLocalidad.innerHTML= opcionLocalidad;
    })
    .catch(error => console.log("capturo que paso un error de la api"));
}

selecMunicipio.addEventListener("change", e=>{
    localidad(e.target.value);
    //console.log(e.target.value);
})
localidad(municipio);

function agregarUsuario(){
    const id= ((usuarios.length)+1)
    const nombre= document.getElementById('nombre').value;
    const apellido= document.getElementById('apellido').value;
    const provincia= selectPvcia.value;
    const municipio= selecMunicipio.value;
    const localidad= selectLocalidad.value;
    const cargo= document.getElementById('cargoUsuario').value;
    const correoUsuario= document.getElementById('correoUsuario').value;
    const descripcion= document.getElementById('descripcionDeUsuario').value;
  
    const usuario= new Usuario (id,nombre, apellido, provincia,municipio ,localidad, cargo, correoUsuario, descripcion);
    
    usuarios.push(usuario);
    formCrearCuenta.reset();    
}

formCrearCuenta.addEventListener('submit', (e)=>{
    e.preventDefault();
    Swal.fire({
        title: 'Crear?',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'La próxima',
       }).then((resultado)=>{
        if(resultado.isConfirmed){
            
            agregarUsuario();    
            localStorage.setItem("ListausuariosLS", JSON.stringify(usuarios));
            
                
            Swal.fire({
                title: 'Añadido con éxito',
                showCancelButton: false,
                showConfirmButton: false,
                timer: 2000
               })
        }
       })
    
});

//SECCION AÑADIR TAREA

const formTareas=document.getElementById('formTareas');
const tablaTareas=document.getElementById('tablaTareas');
const arrayDeTareas= JSON.parse(localStorage.getItem('arrayDeTareas'))||[];


function agregarTareaTabla(tarea){
    const tr= document.createElement('tr');
    tr.innerHTML= `
    <td>${tarea.fecha}</td>
    <td>${tarea.nuevaTarea}</td>
    <td>${tarea.asignatura}</td>
    <td>${tarea.descripcion}</td>
    `
   const btnBorrarTarea= document.createElement('td') ;
  btnBorrarTarea.innerHTML= '<button>X</button>'
  btnBorrarTarea.className= "btnBorrarTarea"
  
  
  btnBorrarTarea.onclick=()=>{
    Swal.fire({
        title: 'Seguro quiere borrar tarea?',
        showCancelButton: true,
        confirmButtonText: 'Si, borrar',
        cancelButtonText: 'No',
       }).then((resultado)=>{
        if(resultado.isConfirmed){
            tr.remove();
            const tareaAborrar= arrayDeTareas.find((elemento)=> elemento.nuevaTarea=== tarea.nuevaTarea);
            const indice= arrayDeTareas.indexOf(tareaAborrar);
            arrayDeTareas.splice(indice,1);
            localStorage.setItem('arrayDeTareas',JSON.stringify(arrayDeTareas));
            console.log(arrayDeTareas);
        }
       })
 
    
   }  
  tr.append(btnBorrarTarea);
   tablaTareas.append(tr);
}

for (tarea of arrayDeTareas){
    agregarTareaTabla(tarea);
}

formTareas.addEventListener('submit', (e)=>{
    e.preventDefault();

    const tarea={
        fecha: (e.target[0]).value,
        nuevaTarea: (e.target[1]).value,
        asignatura: (e.target[2]).value,
        descripcion: (e.target[3]).value,
    }
arrayDeTareas.push(tarea);
console.log(arrayDeTareas);
//aqui
agregarTareaTabla(tarea);
localStorage.setItem("arrayDeTareas", JSON.stringify(arrayDeTareas)) ; 
for(const input of e.target){
    input.value= " ";
  }

 Swal.fire({
    title: 'Tarea añadida!',
    showConfirmButton: false,
    timer: 2000
 })

});






//BUSCADORESSSSSS

//parceo array usuarios

const listUserParseada= JSON.parse(localStorage.getItem("ListausuariosLS")) || [];
//console.log(listUserParseada)

/*busco por nombre */
const formBuscoNombre= document.getElementById('formBuscoNombre');
const btnBuscoNyA= document.getElementById('btnBuscoNyA');
const buscoNombreInput=(document.getElementById('buscoNombreInput').value).toUpperCase();
const buscoApellidoInput=(document.getElementById('buscoApellidoInput').value).toUpperCase()
const btnvolverAbuscarName= document.getElementById("btnvolverAbuscarName");
const divEncontrados= document.getElementById('divEncontradosNyA');


btnBuscoNyA.addEventListener("click", (e)=>{
    e.preventDefault()
    encontradosNamefn()
 });   
 /*
 btnvolverAbuscarName.addEventListener('click', ()=>{
    formBuscoNombre.reset();
     cardUsuario.remove();
 })*/
 function encontradosNamefn(){
   for (persona of listUserParseada){
    if(persona.nombre === buscoNombreInput && (persona.apellido === buscoApellidoInput)){
        hagoCard();
        divEncontradosNyA.append(cardUsuario);
    }
   }
 }


/*busco por provincia*/
const selectPvciaBusco= document.getElementById('selectPvciaBusco');
const optionPvciaBusco= document.getElementById('optionPvciaBusco');
const btnBuscoPvcia=document.getElementById('btnBuscoPvcia');

//con esta funcion capto el valor de pvcia y lo añado al select de buscador
function provinciaFn(){
    fetch("http://apis.datos.gob.ar/georef/api/provincias")
    .then(res => res.ok? res.json(): Promise.reject(res))
    .then(json =>{
        let opcionPvcia= `
        <option value="Elige una provincia">Elige una provincia</option>
        `
json.provincias.forEach(element => opcionPvcia+= `<option value="${element.nombre}">${element.nombre}</option>`);
selectPvciaBusco.innerHTML= opcionPvcia;
})
.catch(error => console.log("capturp que paso un error de la api"));
}

provinciaFn()

const divEncontradosPvcia=document.getElementById('divEncontradosPvcia')

function hagoCard(){
    cardUsuario= document.createElement('div')
              cardUsuario.innerHTML=
               `
               <div class="card cardPerfilDeUsuario">
                  <p>Nombre: ${persona.nombre}</p>
                  <p>Apellido: ${persona.apellido}</p>
                  <p>Provincia: ${persona.provincia}</p>
                  <p>Municipio: ${persona.municipio}</p>
                  <p>Localidad: ${persona.localidad}</p>
                  <p>Cargo: ${persona.cargo}</p>
                  <p>Descrición: ${persona.descripcion}</p>
               </div>
               `;
}

btnBuscoPvcia.addEventListener("click",(e)=>{
    e.preventDefault();
    buscarPvcia()
})

function buscarPvcia(){
    for (persona of listUserParseada){
        if(persona.provincia === selectPvciaBusco.value){
            hagoCard()
            divEncontradosPvcia.append(cardUsuario)
        }
    }
}
