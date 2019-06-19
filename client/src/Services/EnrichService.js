import httpClient from './HttpClient';

const EnrichService = {
    getWeather: (lat, lon, date) => {
        const params = lat + "," + lon + "," + date;
        return httpClient.get('api/weather/' + params);
    }
}

export default EnrichService;