const request = require('request')
function geocode(address,callback){
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiYmxveHg3Nzc3IiwiYSI6ImNsMHM1aGoycTBhMWgzbG41bTJ1N2VvbDQifQ.G17JQTD6LYz1VOGoNhMkCw"   
    request({url:url, json:true}, (error,response)=>{
        if (error) {
            callback("Unable to connect to location serivces!",undefined)
        } else if(response.body.features.length === 0 ){
            callback("Unable to find location. Try another search.",undefined)
        }else {
            callback(undefined,{
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}


module.exports = {
    geocode:geocode,
}