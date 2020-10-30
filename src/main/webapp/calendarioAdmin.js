let self;

function viewModel() {
	self = this;
	self.listaReunionesL = ko.observableArray([]);
	self.listaReunionesM = ko.observableArray([]);
	self.listaReunionesX = ko.observableArray([]);
	self.listaReunionesJ = ko.observableArray([]);
	self.listaReunionesV = ko.observableArray([]);

	const url = 'ws://' + window.location.host + '/SIGETEquipo1';
	self.sws = new WebSocket(url);

	self.sws.onopen = function() {
		const msg = {
			type: 'ready'
		};
		self.sws.send(JSON.stringify(msg));
	};

	self.sws.onmessage = function(event) {
		let data = event.data;
		data = JSON.parse(data);

		// Listar usuarios
		const reuniones = data.actividades;

		for (let i = 0; i < reuniones.length; i++) {
			const reunion = reuniones[i];
			const horaIn = reunion.HoraI.split(':');
			const horaFi = reunion.HoraF.split(':');
			let posTop = 0;
			let length = 0;
			const px = 50.3;
			const nmediaHora = 2;
			const mediaHora = 0.5;

			//Si los minutajes son distintos
			if (horaIn[1] !== horaFi[1]) {
				if (horaIn[1] < horaFi[1]) {
					length = (parseInt(horaFi[0], 10) - parseInt(horaIn[0], 10) + mediaHora) * nmediaHora * px;
				} else {
					length = (parseInt(horaFi[0], 10) - parseInt(horaIn[0], 10) - mediaHora) * nmediaHora * px;
				}
			} else {
				length = (parseInt(horaFi[0], 10) - parseInt(horaIn[0], 10)) * nmediaHora * px;
			}


			if ('30' === horaIn[1]) {

				posTop = (parseInt(horaIn[0], 10) + mediaHora) * nmediaHora * px;

			} else {
				posTop = (parseInt(horaIn[0], 10)) * nmediaHora * px;
			}
			aniadirReunion(posTop, length, reunion, horaIn, horaFi);



		}
	};

	function aniadirReunion(posTop, length, reunion, horaIn, horaFi) {

		switch (reunion.dia) {
			case 'LUNES':

				if (self.listaReunionesL().some(r => r.name === reunion.name) === false) {
					self.listaReunionesL.push(new Reunion(reunion.name, reunion.dia, horaIn[0], horaIn[1], horaFi[0], horaFi[1]));
				}

				estilizarLI(posTop, length, reunion);


				break;

			case 'MARTES':
				if (self.listaReunionesM().some(r => r.name === reunion.name) === false) {
					self.listaReunionesM.push(new Reunion(reunion.name, reunion.dia, horaIn[0], horaIn[1], horaFi[0], horaFi[1]));
				}

				estilizarLI(posTop, length, reunion);



				break;


			case 'MIERCOLES':
				if (self.listaReunionesX().some(r => r.name === reunion.name) === false) {
					self.listaReunionesX.push(new Reunion(reunion.name, reunion.dia, horaIn[0], horaIn[1], horaFi[0], horaFi[1]));
				}

				estilizarLI(posTop, length, reunion);

				break;


			case 'JUEVES':
				if (self.listaReunionesJ().some(r => r.name === reunion.name) === false) {
					self.listaReunionesJ.push(new Reunion(reunion.name, reunion.dia, horaIn[0], horaIn[1], horaFi[0], horaFi[1]));
				}

				estilizarLI(posTop, length, reunion);

				break;

			case 'VIERNES':

				if (self.listaReunionesV().some(r => r.name === reunion.name) === false) {
					self.listaReunionesV.push(new Reunion(reunion.name, reunion.dia, horaIn[0], horaIn[1], horaFi[0], horaFi[1]));
				}

				estilizarLI(posTop, length, reunion);

				break;

			default:
				break;


		}

	}

	function estilizarLI(posTop, length, reunion) {
		const ulL = document.getElementById(reunion.dia.toLowerCase());
		const itemsL = ulL.getElementsByTagName('li');
		for (let n = 0; n < itemsL.length; n++) {
			if (itemsL[n].innerText === reunion.name) {
				itemsL[n].style.top = posTop.toString() + 'px';
				itemsL[n].style.height = length.toString() + 'px';
			}
		}

	}

	class Reunion {
		constructor(name, dia, horaI, minutosI, horaF, minutosF) {
			this.name = name;
			this.dia = dia;
			this.horaI = horaI;
			this.minutosI = minutosI;
			this.horaF = horaF;
			this.minutosF = minutosF;
		}
	}

}
const vm = new viewModel();
ko.applyBindings(vm);
