const request = require('request');

const geoCode = (address, callBack) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibWFuaXJhdG5hbSIsImEiOiJjazk1eWtncXcwamJiM2luMTBuNmFhbng0In0.KglfJm0ZuvrWVYtCbK0D3A'

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callBack('Unable to connect server', undefined)
        } else if (body.features.length === 0) {
            callBack('Unable to find location', undefined)
        } else {
            callBack(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1]
            })
        }
    })
}

module.exports = {
    geoCode: geoCode
}