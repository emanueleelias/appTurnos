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

export default Turnos;