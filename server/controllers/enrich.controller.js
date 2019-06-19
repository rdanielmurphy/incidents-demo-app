const request = require('request');

const weatherAPIKey = "b18c7f1cf78ed9c5822238abeb8d5196";

/**
 * Get weather
 * @param req
 * @param res
 * @returns void
 */
export function getWeather(req, res) {
    request('https://api.darksky.net/forecast/' + weatherAPIKey + '/' + req.params.param, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            res.json(JSON.parse(body));
        }
    });
}