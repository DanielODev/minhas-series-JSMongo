const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
//declarar e usar lá em baixo
const pages = require('./routes/pages')
const series = require('./routes/series')


const port = process.env.PORT || 3000
const mongo = process.env.MONGODB || 'mongodb://localhost/minhas-series'

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

//process request body ---> usado para fazer o post
app.use(bodyParser.urlencoded({extended: true}))

//assets
app.use(express.static('public'))

// view engine -EJS
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//usando as rotas
app.use('/', pages)
app.use('/series', series)

mongoose
    .connect(mongo, { useNewUrlParser: true})
    .then(()=>{
        app.listen(port, () => {
            console.log('O servidor está conectado na porta: ' +port)
      })  
    })
    .catch(e =>{
        console.log(e)
    })
