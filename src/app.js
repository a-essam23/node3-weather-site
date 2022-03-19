const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const hbs = require('hbs')
const path = require('path')
const express = require('express')

const app = express()
const port = process.env.PORT || 3000
// Define paths
const publicPath = path.join(__dirname,'../public')


// Setup handlebars engine and views location
app.set('views',path.join(__dirname,'../templates/views'))
app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname,'../templates/partials'))


app.use(express.static(publicPath))

app.get('', (req,res)=>{
    res.render('index', {
        title: 'Weather app',
        name: 'I AM',
    })
})

app.get('/weather', (req,res)=>{
    if (!req.query.address){
        return res.send({
            error: 'Address must be provided!'
        })}
    geocode.geocode(req.query.address,(error,{latitude, longitude, location}={})=>{
        if (error){
            return res.send({error})
        }
        forecast(latitude,longitude, (error, weatherData)=>{
            if (error){
                return res.send({error})
            } 
            res.send({
                weatherData,
                location,
                'address':req.query.address,
            })
        })
})})

app.get('/about', (req,res)=>{
    res.render('about', {
        text: 'This is about page',
        title: 'ABOUT',
        name: 'I AM',
    })
})
app.get('/help', (req,res)=>{
    res.render('help', {
        helpText: 'This is some help.',
        title: 'HELP',
        name: 'I AM',
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: 'HELP 404',
        name: 'I AM',
        errorText: 'Help page not found',
    })
})

app.get('*', (req,res)=>{
    res.render('404',{
        title: '404',
        name: 'I AM',
        errorText: 'Page not found'
    })
})



app.listen(port, ()=>{
    console.log('Server started on port'+port)
})