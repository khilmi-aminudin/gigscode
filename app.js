const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const db = require('./models')
const app = express()

// use built in body-parser on express
app.use(express.json())
app.use(express.urlencoded({ extended : true }))

// use Template engine
app.engine('.hbs', exphbs({ defaultLayout : 'main', extname : '.hbs', handlebars : allowInsecurePrototypeAccess(handlebars) }))
app.set('view engine', '.hbs')

// Home Page Routes
app.get('/', (req,res) => {
    res.render('home')
})

// Gigs Router
app.use('/gigs', require('./routes/gigs'))

// use spublic folder
app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 5000

db.sequelize.sync().then((result) => {
    app.listen(PORT, () => console.log(`App is running on http://localhost:${PORT}`))
}).catch((err) => {
    
});