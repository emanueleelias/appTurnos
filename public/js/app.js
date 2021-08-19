//      VARIABLES GLOBALES
let editando;
let DB;

const crear = document.querySelector('#crear');
const listar = document.querySelector('#listar');
const buscar = document.querySelector('#buscar');
const crearTurnos = document.querySelector('#crearTurnos');
const listarTurnos = document.querySelector('#listarTurnos');
const buscarTurnos = document.querySelector('#buscarTurnos');
const btnGuardar = document.getElementById('btn');


//Cuando el documento este listo se crea la conexión a la base de datos
//IndexDB y tambien se ejecuta el código para la creación de la misma una única vez
$(() => {
    $('#crearTurnos').show();
    ui.imprimirTurnos();
    inicioApp();
});


//      CLASES
class Turnos {
    constructor() {
        this.turnos = [];
    }

    agregarTurno(turno) {
        this.turnos = [...this.turnos, turno];
    }

    turnosVacio() {
        let resultado = false;
        if (this.turnos < 0) {
            resultado = true;
        } else {
            resultado = false; //const contenedorTurnos = document.querySelector('#turnos');
            const contenedorTurnos = $('#turnos');

        }
        return resultado;
    }

    editarTurno(turnoActualizado) {
        this.turnos = this.turnos.map(turno => turno.id === turnoActualizado.id ? turnoActualizado : turno);
    }

    eliminarTurno(id) {
        this.turnos = this.turnos.filter(turno => turno.id !== id);
    }
}

class InterfazUsuario {

    imprimirAlerta(mensaje, tipo) {

        const divMensaje = $('<div style="display: none"></div>');
        divMensaje.addClass('text-center m-1');

        //Agregando clase según el tipo de error
        if (tipo === 'error') {
            divMensaje.addClass('error mx-0 col-start-1 col-end-3');
        } else {
            divMensaje.addClass('correcto mx-0');
        }

        //Agregando el mensaje
        divMensaje.prepend(mensaje);

        //Agregando al DOM
        $('#formulario').prepend(divMensaje);

        divMensaje.fadeIn(1000).delay(1500).fadeOut(1000);
    }

    imprimirTurnos() {
        agregarInfoTurnosVacios();
        this.limpiarHTML();

        let userDataRef = firebase.database().ref("turnos").orderByKey();
        userDataRef.once("value").then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                let turno = childSnapshot.val();
                let id = childSnapshot.key;
                let nombre = childSnapshot.val().nombre;
                let plan = childSnapshot.val().plan;
                let telefono = childSnapshot.val().telefono;
                let mail = childSnapshot.val().mail;
                let fecha = childSnapshot.val().fecha;
                let hora = childSnapshot.val().hora;
                let tipo = childSnapshot.val().tipo;
                let comentarios = childSnapshot.val().comentarios;

                //const divTurno = document.createElement('div');
                const divTurno = $('<div style="display: none"></div>');

                //divTurno.classList.add('turno', 'p-3', 'ml-5');
                divTurno.addClass('border-3 border-azulSuave bg-gray-200 flex flex-col turno mt-5 border-2 rounded-lg border-gray-200 p-2 shadow-xl');
                divTurno.attr('data-id', id);

                //Scripting de los elementos del turno
                const nombreParrafo = $('<h2></h2>');
                nombreParrafo.addClass('text-lg font-bold inline-flex items-center mb-5');
                nombreParrafo.html(`<svg class="mr-1 w-6 h-6" fill="#fff" stroke="rgba(244, 114, 182, var(--tw-bg-opacity))" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> ${nombre}`);

                const planParrafo = $('<p></p>');
                planParrafo.html(`<span class="font-bold">Obra Social:</span> ${plan}`);

                const telefonoParrafo = $('<p></p>');
                telefonoParrafo.html(`<span class="font-bold">Telefono:</span> ${telefono}`);

                const mailParrafo = $('<p></p>');
                mailParrafo.html(`<span class="font-bold">E-mail:</span> ${mail}`);

                const fechaParrafo = $('<p></p>');;
                fechaParrafo.html(`<span class="font-bold">Fecha del turno:</span> ${fecha}`);

                const horaParrafo = $('<p></p>');
                horaParrafo.html(`<span class="font-bold">Hora del turno:</span> ${hora}`);

                const tipoParrafo = $('<p></p>');
                tipoParrafo.html(`<span class="font-bold">Tipo de turno:</span> ${tipo}`);

                const comentariosParrafo = $('<p></p>');
                comentariosParrafo.html(`<span class="font-bold">Comentarios:</span> ${comentarios}`);

                //div
                const elDiv = $('<div></div>');
                elDiv.addClass('flex h-full');
                //Boton eliminar turno
                const btnEliminar = $('<button></button>');
                btnEliminar.addClass('h-10 self-end btnEliminar inline-flex justify-center items-center py-2 px-2 shadow-sm text-sm font-medium rounded-full text-white bg-azul hover:bg-azulClaro hover:shadow-xl w-32 mr-2 text-center');
                btnEliminar.html('Eliminar<svg class="ml-2 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>');

                btnEliminar.click(function () {
                    eliminarTurno(id);
                });


                //Boton editar turno
                const btnEditar = $('<button></button>');
                btnEditar.addClass('h-10 self-end inline-flex justify-center items-center py-2 px-2 shadow-sm text-sm font-medium rounded-full text-white bg-azul hover:bg-azulClaro hover:shadow-xl w-32 font-bold');
                btnEditar.html('Editar T.<svg class="ml-2 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>');
                btnEditar.click(function () {
                    cargarEdicion(turno);
                });
                
                //Agregando los parrafos al divTurno
                divTurno.append(nombreParrafo);
                divTurno.append(planParrafo);
                divTurno.append(telefonoParrafo);
                divTurno.append(mailParrafo);
                divTurno.append(fechaParrafo);
                divTurno.append(horaParrafo);
                divTurno.append(tipoParrafo);
                divTurno.append(comentariosParrafo);
                elDiv.append(btnEliminar);
                elDiv.append(btnEditar)
                divTurno.append(elDiv);
                //divTurno.append(btnEliminar);
                //divTurno.append(btnEditar);

                $('#turnos').prepend(divTurno);
                divTurno.fadeIn(500);
            });
        });

    }

    limpiarHTML() {
        $('#turnos').empty();
    }
}


//      INSTANCIAS DE LAS CLASES
const ui = new InterfazUsuario();
const administrarTurnos = new Turnos();


//      EVENT LISTENERS
eventListeners();

function eventListeners() {

    $('#nombre').on('input', datosTurno);
    $('#plan').on('input', datosTurno);
    $('#telefono').on('input', datosTurno);
    $('#mail').on('input', datosTurno);
    $('#fecha').on('input', datosTurno);
    $('#hora').on('input', datosTurno);
    $('#tipo').on('input', datosTurno);
    $('#comentarios').on('input', datosTurno);

    $('#formulario').on('submit', nuevoTurno);

    crear.addEventListener('click', mostrarCrear);
    listar.addEventListener('click', mostrarListar);
    buscar.addEventListener('click', mostrarBuscar);
}

//      OBJETO CON INFORMACIÓN DE LA CLASE
const turnoObj = {
    nombre: '',
    plan: '',
    telefono: '',
    mail: '',
    fecha: '',
    hora: '',
    tipo: '',
    comentarios: ''
}

//      FUNCIONES
//Funcion que captura los datos del turno
function datosTurno(e) {
    turnoObj[e.target.name] = e.target.value;
}

function reiniciarObjeto() {
    turnoObj.nombre = '';
    turnoObj.plan = '';
    turnoObj.telefono = '';
    turnoObj.mail = '';
    turnoObj.fecha = '';
    turnoObj.hora = '';
    turnoObj.tipo = '';
    turnoObj.comentarios = '';
}

function nuevoTurno(e) {
    e.preventDefault();

    //Extraer información del objeto turno con destructuring
    const {
        nombre,
        plan,
        telefono,
        mail,
        fecha,
        hora,
        tipo,
        comentarios
    } = turnoObj;


    //Validando los campos del formularios
    if (nombre === '' || plan === '' || telefono === '' || mail === '' || fecha === '' || hora === '' || tipo === '' || comentarios === '') {
        ui.imprimirAlerta("Todos los campos son obligatorios", "error");
        return;
    } else {
        if (validarEmail(mail) === false){
            return;
        } 
    }

    if (editando) {

        //Pasar el objeto de la cita a edición
        administrarTurnos.editarTurno({
            ...turnoObj
        });

        escribirDatos(turnoObj);

        console.log(turnoObj);
        ui.imprimirAlerta('Editado correctamente', 'correcto');

        //Regresar el texto del boton al estado original
        $('#formulario button[type="submit"]').html('Crear Turno <svg class="ml-2 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>');
        $('#h2').html('Cargue un nuevo Turno');
        $('#span').html('Listar Turnos');
        $('#icono').removeClass('fas fa-user-edit');
        $('#icono').addClass('fas fa-list-ul');
        mostrarListar();

        //Quitando modo edición
        editando = false;
    } else {
        //Agregar un id unico al objeto para poder modificar un turno o eliminarlo
        turnoObj.id = Date.now();

        //Creando un nuevo turno
        administrarTurnos.agregarTurno({
            ...turnoObj
        });

        var turnoId = turnoObj.id;
        firebase.database().ref('turnos/' + turnoId).set(turnoObj);


        //Mensaje de turno agregado correctamente
        ui.imprimirAlerta('El turno se agrego correctamente', 'correcto');

        $('#turnosImg').hide();
        $('#turnosP').hide();
    }

    //Reiniciar Objeto
    reiniciarObjeto();

    //Resetear formulario
    document.querySelector('#formulario').reset();

    //Mostrar el HTML de los turnos
    ui.imprimirTurnos();
}

function eliminarTurno(id) {

    firebase.database().ref('turnos/' + id).remove();

    //Eliminar turno del array de turnos
    administrarTurnos.eliminarTurno(id);

    //Mostrar mensaje
    ui.imprimirAlerta('El turno se eliminó correctamente', 'correcto');

    //Volver a imprimir los turnos en el HTML
    ui.imprimirTurnos();

    agregarInfoTurnosVacios();
}

function cargarEdicion(turno) {
    crearTurnos.style.display = "block";
    listarTurnos.style.display = "none";
    buscarTurnos.style.display = "none";

    //Desctructuring del objeto
    const {
        nombre,
        plan,
        telefono,
        mail,
        fecha,
        hora,
        tipo,
        comentarios,
        id
    } = turno;

    //Llenar los inputs
    $('#nombre').val(nombre);
    $('#plan').val(plan);
    $('#telefono').val(telefono);
    $('#mail').val(mail);
    $('#fecha').val(fecha);
    $('#hora').val(hora);
    $('#tipo').val(tipo);
    $('#comentarios').val(comentarios);

    //Llenar el objeto 
    turnoObj.id = id;
    turnoObj.nombre = nombre;
    turnoObj.plan = plan;
    turnoObj.telefono = telefono;
    turnoObj.mail = mail;
    turnoObj.fecha = fecha;
    turnoObj.hora = hora;
    turnoObj.tipo = tipo;
    turnoObj.comentarios = comentarios;

    //Cambiar el texto del boton y del h2
    $('#formulario button[type="submit"]').html('Guardar Cambios <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>');
    $('#h2').html('Modificar el turno');
    $('#span').html('Modificar Turno');
    $('#icono').removeClass('fas fa-list-ul');
    $('#icono').addClass('fas fa-user-edit');

    editando = true;
}

function agregarInfoTurnosVacios() {
    //Acceder a servicio
    const data = firebase.database();
    //Obtener una referencia a la raíz de la base de datos
    let dataRef = data.ref("turnos");
    //Obtener una console.log de todos los datos 
    dataRef.once('value', snapshot => {
        if (snapshot.val() === null) {
            $('#turnosImg').fadeIn(1500);
            $('#turnosP').show(1500);
        } else {
            $('#turnosImg').hide();
            $('#turnosP').hide();
        }
    });
}

function escribirDatos(turno) {
    firebase.database().ref('turnos/' + turno.id).update({
        nombre: turno.nombre,
        plan: turno.plan,
        telefono: turno.telefono,
        mail: turno.mail,
        fecha: turno.fecha,
        hora: turno.hora,
        tipo: turno.tipo,
        comentarios: turno.comentarios
    });
}

function inicioApp() {
    $('#crear i').addClass("text-pink-400");
    $('#crear').addClass("border-b-2 border-pink-500");
    $('#listar i').removeClass("text-pink-400");
    $('#listar').removeClass("border-b-2 border-pink-500");
    $('#buscar i').removeClass("text-pink-400");
    $('#buscar').removeClass("border-b-2 border-pink-500");
}

function validarEmail(campo) {
    const mensaje = campo;

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if( re.test(mensaje.toLowerCase()) ) {
         return true;
    } else {
         ui.imprimirAlerta("El e-mail no es valido", "error");
         return false;
    }
}

function mostrarCrear() {
    crearTurnos.style.display = "block";
    listarTurnos.style.display = "none";
    buscarTurnos.style.display = "none";
    $('#crear i').addClass("text-pink-400");
    $('#crear').addClass("border-b-2 border-pink-500");
    $('#listar i').removeClass("text-pink-400");
    $('#listar').removeClass("border-b-2 border-pink-500");
    $('#buscar i').removeClass("text-pink-400");
    $('#buscar').removeClass("border-b-2 border-pink-500");
}

function mostrarListar() {
    crearTurnos.style.display = "none";
    listarTurnos.style.display = "block";
    buscarTurnos.style.display = "none";
    $('#crear i').removeClass("text-pink-400");
    $('#crear').removeClass("border-b-2 border-pink-500");
    $('#listar i').addClass("text-pink-400");
    $('#listar').addClass("border-b-2 border-pink-500");
    $('#buscar i').removeClass("text-pink-400");
    $('#buscar').removeClass("border-b-2 border-pink-500");
}

function mostrarBuscar() {
    crearTurnos.style.display = "none";
    listarTurnos.style.display = "none";
    buscarTurnos.style.display = "block";
    $('#crear i').removeClass("text-pink-400");
    $('#crear').removeClass("border-b-2 border-pink-500");
    $('#listar i').removeClass("text-pink-400");
    $('#listar').removeClass("border-b-2 border-pink-500");
    $('#buscar i').addClass("text-pink-400");
    $('#buscar').addClass("border-b-2 border-pink-500");
}
