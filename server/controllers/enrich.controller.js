const request = require('request');

const weatherAPIKey = "b18c7f1cf78ed9c5822238abeb8d5196";
const geocodingAPIKey = "9805915b9fa7414f83a20e7030c90204";
//AIzaSyCK5sQlZuEPZB1ftAL3DhYBNN5jhy0lUHg

const icon_mapping = {
    "clear-day": "01d.png",
    "clear-night": "01n.png",
    "partly-cloudy-day": "02d.png",
    "partly-cloudy-night": "02n.png",
    "rain": "09d.png",
    "snow": "13d.png",
    "sleet": "50d.png",
    "wind": "50d.png",
    "fog": "50d.png",
    "cloudy": "03d.png"
}

/**
 * Get weather
 * @param req
 * @param res
 * @returns void
 */
export function getWeather(req, res) {
    request('https://api.darksky.net/forecast/' + weatherAPIKey + '/' + req.params.param, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            const json = JSON.parse(body);
            json.icon = "http://openweathermap.org/img/w/" + icon_mapping[json.currently.icon];
            res.json(json);
        }
    });
}

export function getGeocoding(req, res) {

}