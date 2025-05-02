const APIKEY = '3ccbefca10638013a412a84aca3ba820';
const url = 'https://api.weatherstack.com/forecast?access_key={PASTE_YOUR_API_KEY_HERE}&query=New York&forecast_days=7';
const options = {
	method: 'GET'
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}
