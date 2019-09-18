const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');

const argv = require('yargs').options({
  nombre_ciudad: {
    alias: 'n',
    desc: 'Nombre de la ciudad de la cual desea saber la geolocalizacion',
    demand: true
  }
}).argv;

async function getPlaceTemperature(placeName) {
  const placeGeolocation = await lugar.getGeolocation(placeName);
  const placeWeather = await clima.getWeather(placeGeolocation);
  const placeTemperature = placeWeather.main.temp;
  return placeTemperature;
}

getPlaceTemperature(argv.nombre_ciudad).then(placeTemperature =>
  console.log(placeTemperature)
);
