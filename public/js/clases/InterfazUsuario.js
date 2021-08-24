import { eliminarTurno, cargarEdicion, agregarInfoTurnosVacios } from '../funciones.js';

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

        //Trabajando con firebase
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

                $('#turnos').prepend(divTurno);
                divTurno.fadeIn(500);
            });
        });
    }

    limpiarHTML() {
        $('#turnos').empty();
    }
}

export default InterfazUsuario;