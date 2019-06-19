const HttpClient = {
    get: (url) => {
        return fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(`Request rejected with status ${response.status}`);
            }
        });
    }
}

export default HttpClient;