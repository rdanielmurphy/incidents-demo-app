const dataFolder = './data/';
const fs = require('fs');

/**
 * Get all incidents
 * @param req
 * @param res
 * @returns void
 */
export function getIncidents(req, res) {
    // todo search data dir to get list of all incidents
    readData().then((result) => {
        res.json(result);
    });
}

const getFilesList = (dir) => {
    let files = [];

    return new Promise(function (resolve, reject) {
        fs.readdirSync(dir).forEach(file => {
            files.push({ fileName: file.split("/").pop(), filePath: dir + file });
        });

        resolve(files);
    });
}

const getContents = (fileName) => {
    return new Promise(function (resolve, reject) {
        fs.readFile(fileName, 'utf8', (err, data) => {
            err ? reject(err) : resolve(data);
        });
    });
}

const readData = async () => {
    let data = {};

    const files = await getFilesList(dataFolder);

    for (var i = 0; i < files.length; i++) {
        const filePath = files[i].filePath;
        const fileName = files[i].fileName;
        const content = await getContents(filePath);
        data[fileName] = JSON.parse(content);
    }

    return data;
}