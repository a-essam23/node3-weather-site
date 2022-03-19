const request = require('request')
const { callbackify } = require('util')
function forecast(latitude,longitude,callback){
    const url = 'http://api.weatherstack.com/current?access_key=c06028cfb67c17ed3447b8aa99f7dcb1&query='+latitude+','+longitude+',&units=m'
    request({url:url, json:true}, (error, response)=>{
        if (error){
            callback('Unable to connect to weather service!', undefined)
        } else if(response.body.error){
            callback('Unable to find location. Please choose another.', undefined)
        }else{
        const output = response.body.current
        // console.log(output)
        callback(undefined,{
            weather: output.weather_descriptions[0]+'. Temperature is '+ output.temperature + ' degrees celsius. ' + output.precip+' % chance of raining'
            // weather_description:output.weather_descriptions[0] ,
            // temp: output.temperature,
            // precip: output.precip,
        })
        
        }
    })
}





module.exports= forecast