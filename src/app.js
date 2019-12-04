const path = require('path')
const express = require('express')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const hbs=require('hbs')
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewspath=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')
app.set('view engine','hbs')
app.set('views',viewspath)
app.use(express.static(publicDirectoryPath))

hbs.registerPartials(partialspath)
app.get('',(req,res)=>{
    res.render('index',{
        title:"Home page",
        name:"Amisha"
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About page",
        name:"Amisha"
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        text:"This is some helpful text",
        title:"Help page",
        name:"Amisha"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:"Address is not send"
        })
    }
    else{
        geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
            if(error)
            {
               return res.send({error})
            }
            
            forecast(longitude,latitude,(error,dataf)=>{
               if(error)
               {
                return res.send({error})
               }
              return res.send({
                  forecast:dataf,
                  location
              })
            })
         })
        
    }
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:"404 ",
        name:"Amisha",
        error:"Help article not found"
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:"404 ",
        name:"Amisha",
        error:"Page not found"
    })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})