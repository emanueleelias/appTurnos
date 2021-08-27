import Turnos from './clases/Turnos.js'
import InterfazUsuario from './clases/InterfazUsuario.js';

const ui = new InterfazUsuario();
const administrarTurnos = new Turnos();

let editando;

$(() => {
    $('#crearTurnos').show();
    ui.imprimirTurnos();
    inicioApp();
});

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

//Funcion que captura los datos del turno
export function datosTurno(e) {
    turnoObj[e.target.name] = e.target.value;
}

//Funcion para reiniciar el objeto
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

//Función para crear un nuevo turno, validar y editar un turno
export function nuevoTurno(e) {
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

//Funcion para eliminar un turno
export function eliminarTurno(id) {
    firebase.database().ref('turnos/' + id).remove();

    //Eliminar turno del array de turnos
    administrarTurnos.eliminarTurno(id);

    //Mostrar mensaje
    ui.imprimirAlerta('El turno se eliminó correctamente', 'correcto');

    //Volver a imprimir los turnos en el HTML
    ui.imprimirTurnos();

    agregarInfoTurnosVacios();
}

//Función que rellena el formulario cuando se vaya a editar
export function cargarEdicion(turno) {
    $('#crearTurnos').css('display', 'block');
    $('#listarTurnos').css('display', 'none');
    $('#buscarTurnos').css('display', 'none');

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

//Funcion que muestra una imagen cuandono hay turnos cargados
export function agregarInfoTurnosVacios() {
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

//Funcion para actualizar los datos en la base de datos con una edición
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

//Funcion para cuando la aplicación iniciar
function inicioApp() {
    $('#crear i').addClass("text-pink-400");
    $('#crear').addClass("border-b-2 border-pink-500");
    $('#listar i').removeClass("text-pink-400");
    $('#listar').removeClass("border-b-2 border-pink-500");
    $('#buscar i').removeClass("text-pink-400");
    $('#buscar').removeClass("border-b-2 border-pink-500");
}

//Funcion con expreción regular para validar un mail
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

//Función para mostrar la página para crear turnos
export function mostrarCrear() {
    $('#crearTurnos').css('display', 'block');
    $('#listarTurnos').css('display', 'none');
    $('#buscarTurnos').css('display', 'none');
    $('#crear i').addClass("text-pink-400");
    $('#crear').addClass("border-b-2 border-pink-500");
    $('#listar i').removeClass("text-pink-400");
    $('#listar').removeClass("border-b-2 border-pink-500");
    $('#buscar i').removeClass("text-pink-400");
    $('#buscar').removeClass("border-b-2 border-pink-500");
}

//Función para mostrar la página de listar
export function mostrarListar() {
    $('#crearTurnos').css('display', 'none');
    $('#listarTurnos').css('display', 'block');
    $('#buscarTurnos').css('display', 'none');
    $('#crear i').removeClass("text-pink-400");
    $('#crear').removeClass("border-b-2 border-pink-500");
    $('#listar i').addClass("text-pink-400");
    $('#listar').addClass("border-b-2 border-pink-500");
    $('#buscar i').removeClass("text-pink-400");
    $('#buscar').removeClass("border-b-2 border-pink-500");
}

//Función para mostrar la página de búsqueda
export function mostrarBuscar() {
    $('#crearTurnos').css('display', 'none');
    $('#listarTurnos').css('display', 'none');
    $('#buscarTurnos').css('display', 'block');
    $('#crear i').removeClass("text-pink-400");
    $('#crear').removeClass("border-b-2 border-pink-500");
    $('#listar i').removeClass("text-pink-400");
    $('#listar').removeClass("border-b-2 border-pink-500");
    $('#buscar i').addClass("text-pink-400");
    $('#buscar').addClass("border-b-2 border-pink-500");
}

//Funciones para la busqueda
export function buscar(campo, valor) {
    $('#turnosEncontrados').empty();
    let ref = firebase.database().ref("turnos");
    ref.orderByChild(campo).equalTo(valor).on("child_added", function(snapshot) {
        $('#sinResultados').fadeOut(1000);
        $('#buscarImg').fadeOut(1000);
        let nombre = snapshot.val().nombre;
        let fecha = snapshot.val().fecha;
        let hora = snapshot.val().hora;
        let tipo = snapshot.val().tipo;
        const divBusqueda= $('<div></div>');
        const p = $('<p></p>');
        p.addClass('text-center mb-2 text-sm');
        p.html(`<b>${nombre}</b> tiene turno el <b>${fecha}</b> a las ${hora} para <b>${tipo}</b>`);
        $('#turnosEncontrados').append(p);
        divBusqueda.append(p);
        $('#turnosEncontrados').prepend(divBusqueda).fadeIn(500);
    });
}

export function comprobarBusqueda() {
    if($("#turnosEncontrados").children().length != 0) {
        console.log('Yes content');
      } else {    
        $('#sinResultados').fadeIn(1000);
        $('#buscarImg').fadeIn(1000);
      }
}
