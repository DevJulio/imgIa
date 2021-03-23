const express = require('express');
const app = express();
const vision = require('@google-cloud/vision');
const path = './tst.jpg';

const client = new vision.ImageAnnotatorClient({
    keyFilename: 'APIKEY.json'
});

let response = "";

client.safeSearchDetection(path).then(results => {

    const detections = results[0].safeSearchAnnotation;

    detections.adult == "VERY_UNLIKELY" || detections.adult == "UNLIKELY" || detections.adult == "UNKNOWN" ? "" : response += "Imagem contém conteúdo adulto.\n "
    detections.medical == "VERY_UNLIKELY" || detections.medical == "UNLIKELY" || detections.medical == "UNKNOWN" ? "" : response += "Imagem contém conteúdo médico.\n "
    detections.spoof == "VERY_UNLIKELY" || detections.spoof == "UNLIKELY" || detections.spoof == "UNKNOWN" ? "" : response += "Imagem contém conteúdo enganoso.\n "
    detections.violence == "VERY_UNLIKELY" || detections.violence == "UNLIKELY" || detections.violence == "UNKNOWN" ? "" : response += "Imagem contém conteúdo de violência.\n"
    detections.racy == "VERY_UNLIKELY" || detections.racy == "UNLIKELY" || detections.racy == "UNKNOWN" ? "" : response += "Imagem contém conteúdo racista.\n"

    console.log('Safe search:');
    console.log(response);

})
    .catch(err => {
        console.error('ERROR:', err);
    });

app.listen(5000, '127.0.0.1', () => console.log('Server running'));