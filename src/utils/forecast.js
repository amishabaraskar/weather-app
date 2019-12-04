const request=require("request")
const forecast=(longitude,latitude,callback)=>{
    const url="https://api.darksky.net/forecast/1f924b4a41b8bf480cbfbfd6b5c3c41d/"+encodeURIComponent(latitude)+","+encodeURIComponent(longitude)+ "/?units=si&lang=mr"
    request({url, json:true},(error,{body})=>{
    if(error)
    {
       callback("Unable to connect to the weather server")
    }
    else if(body.error)
    {
       callback(body.error)
    }
    else
       callback(undefined,body.daily.data[0].summary+"It is currently "+body.currently.temperature+"degrees out. There is a "+body.currently.precipProbability+"% chance of rain")
 })
 }
 module.exports=forecast