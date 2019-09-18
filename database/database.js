var fs = require('fs');
const databasePath = './database/database.json';

let existeLaBaseDeDatos = () => {
	return fs.existsSync(databasePath);
};

let saveObservation = observation => {
	let database;
	let databaseObject;

	if (existeLaBaseDeDatos()) {
		console.log('Agregando observación a la BBDD...');
		database = fs.readFileSync(databasePath);

		databaseObject = JSON.parse(database);
		databaseObject.observations.push(observation);

		database = JSON.stringify(databaseObject);
		fs.writeFileSync(databasePath, database);
	} else {
		console.log('Creando base de datos...');
		databaseObject = {
			observations: [observation]
		};

		database = JSON.stringify(databaseObject);

		fs.writeFileSync(databasePath, database);
	}
	console.log('Observación agregada exitosamente!');
};

let getObservations = () => {
	if (existeLaBaseDeDatos()) {
		database = fs.readFileSync(databasePath);
		databaseObject = JSON.parse(database);
		return databaseObject.observations;
	} else {
		return false;
	}
};

module.exports = { saveObservation, getObservations };
