const axios = require('axios');

async function getWeather(geoLocation) {
	const UNIT_TYPE = 'metric';
	const API_KEY = '438bb6e763a1efc0d729770ca5186754';
	const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${geoLocation.lat}&lon=${geoLocation.lon}&appid=${API_KEY}&units=${UNIT_TYPE}`;
	const ENCODED_API_URI = encodeURI(API_URL);

	const instance = axios.create({
		baseURL: ENCODED_API_URI
	});

	response = await instance.get();
	placeData = response.data;

	return placeData;
}

module.exports = { getWeather };
