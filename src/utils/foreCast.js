const request = require('request');

const foreCast = (latitude, longitude, callBack) => {
    const url = 'https://api.darksky.net/forecast/24fef8bcba7eecc7318a8441ec9e4c7c/' + latitude + ',' + longitude;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callBack('Unable to connect server', undefined)
        } else if (body.error) {
            callBack('Unable to find wheather', undefined)
        } else {
            callBack(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.');
        }
    })
}

module.exports = foreCast