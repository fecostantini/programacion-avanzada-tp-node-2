const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');
const database = require('./database/database');

const argv = require('yargs').options({
	nombre_ciudad: {
		alias: 'n',
		desc: 'Nombre de la ciudad de la cual desea saber la geolocalizacion',
		demand: true
	}
}).argv;

async function getObservation(placeName) {
	const placeGeolocation = await lugar.getGeolocation(placeName);
	const placeWeather = await clima.getWeather(placeGeolocation);

	const placeTemperature = {
		location: placeName,
		temp: placeWeather.main.temp,
		pressure: placeWeather.main.pressure,
		humidity: placeWeather.main.humidity
	};

	return placeTemperature;
}

getObservation(argv.nombre_ciudad).then(observation => {
	database.saveObservation(observation);

	let observations = database.getObservations();

	if (observations)
		observations.forEach((observation, index) => {
			console.log(`Observation ${index + 1}: ${JSON.stringify(observation)}`);
		});
});
