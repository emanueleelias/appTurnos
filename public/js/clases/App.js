import { datosTurno, nuevoTurno, mostrarCrear, mostrarListar, mostrarBuscar } from '../funciones.js';


class App {

    constructor() {
        this.initApp();
    }

    initApp() {
        
        //inputs y datos de la aplicación
        $('#nombre').on('input', datosTurno);
        $('#plan').on('input', datosTurno);
        $('#telefono').on('input', datosTurno);
        $('#mail').on('input', datosTurno);
        $('#fecha').on('input', datosTurno);
        $('#hora').on('input', datosTurno);
        $('#tipo').on('input', datosTurno);
        $('#comentarios').on('input', datosTurno);

        //Formulario para nuevos turnos
        $('#formulario').on('submit', nuevoTurno);

        //Para mostrar las diferentes areas de la página
        $('#crear').click(mostrarCrear);
        $('#listar').click(mostrarListar);
        $('#buscar').click(mostrarBuscar);

/*         $('#buscarNombre').on('input', e => {
            let nombre = datosBusqueda.nombre = e.target.value;
            filtrarTurno(nombre);
        });
        $('#buscarFecha').on('change', e => {
            datosBusqueda.fecha = e.target.value;
            console.log(datosBusqueda);
        });
        $('#buscarTipo').on('change', e => {
            datosBusqueda.tipoConsulta = e.target.value;
            console.log(datosBusqueda);
        }); */
    }
}

export default App;