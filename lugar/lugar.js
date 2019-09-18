const axios = require('axios');

async function getGeolocation(place) {
  API_URL = `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${place}`;

  const ENCODED_API_URI = encodeURI(API_URL);

  const placesAPI = axios.create({
    baseURL: ENCODED_API_URI,
    headers: {
      'x-rapidapi-key': '002efbc520msh44195d95e6f10e3p115a80jsnb68b4799325c'
    }
  });

  const placeResponse = await placesAPI.get();
  const firstMatchedPlace = placeResponse.data.Results[0];

  const geolocation = {
    lat: firstMatchedPlace.lat,
    lon: firstMatchedPlace.lon
  };

  return geolocation;
}

/*
  function getGeolocation(place) {
	API_URL = `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${place}`

	const ENCODED_API_URI = encodeURI(API_URL)

	const placesAPI = axios.create({
		baseURL: ENCODED_API_URI,
		headers: { 'x-rapidapi-key': '002efbc520msh44195d95e6f10e3p115a80jsnb68b4799325c' }
	})

	return new Promise( (resolve, reject) => {
		placesAPI.get()
		.then(response => {
			const place = response.data.Results[0];

			const geolocation = {
				latitude: place.lat,
				longitude: place.lon
			}

			resolve(geolocation)
		})
		.catch(error => {
			reject(error)
		})
	})

}
*/

exports.getGeolocation = getGeolocation;
