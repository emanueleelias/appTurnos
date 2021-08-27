import { 
    datosTurno, 
    nuevoTurno, 
    mostrarCrear, 
    mostrarListar, 
    mostrarBuscar, 
    buscar, 
    comprobarBusqueda } from '../funciones.js';

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

        //Eventos para la busqueda según el tipo de consulta o la fecha
        $('#buscarTipo').on('change', e => {
            $("#buscarFecha[type=date]").val("");
            let tipo = e.target.value;
            buscar('tipo', tipo);
            setTimeout(() => {
                comprobarBusqueda();
            }, 2500);
        }); 
        $('#buscarFecha').on('change', e => {
            let fecha = e.target.value;
            $('#buscarTipo').val('0');
            buscar('fecha', fecha);
            setTimeout(() => {
                comprobarBusqueda();
            }, 2500);
        }); 
    }
}

export default App;