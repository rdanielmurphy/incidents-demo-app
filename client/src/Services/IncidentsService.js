import httpClient from './HttpClient';

let incidents = null;

function fetchIncidents() {
    return httpClient.get('api/incidents').then((response) => {
        incidents = response;
    });
}

const IncidentsService = {
    getIncidents: () => {
        return new Promise((resolve, reject) => {
            if (incidents !== null) {
                resolve(incidents);
            } else {
                fetchIncidents().then((response) => {
                    resolve(incidents);
                }).catch((e) => {
                    reject(null);
                });
            }
        });
    },
    getIncident: (id) => {
        return new Promise((resolve, reject) => {
            if (incidents !== null) {
                resolve(incidents[id]);
            } else {
                fetchIncidents().then(() => {
                    resolve(incidents[id]);
                }).catch((e) => {
                    reject(null);
                });
            }
        });
    }
}

export default IncidentsService;