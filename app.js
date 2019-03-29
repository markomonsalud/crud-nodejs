var express = require('express')
var app = express()
var mysql = require('mysql')

var myConnection  = require('express-myconnection')

//Store database configuration
var config = require('./queries/dbconfig')
var dbOptions = {
    host:      config.database.host,
    user:       config.database.user,
    password: config.database.password,
    port:       config.database.port,
    database: config.database.db
}

app.use(myConnection(mysql, dbOptions, 'pool'))

app.set('view engine', 'ejs')

var index = require('./routes/index')
var items = require('./routes/items')

var expressValidator = require('express-validator')
app.use(expressValidator())

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var flash = require('express-flash')
var session = require('express-session')
app.use(flash())
app.use(session({
    secret: 'ninja',
    resave: false,
    saveUninitialized: true,
}))
app.use('/', index)
app.use('/items', items)

app.listen(3000, '0.0.0.0', function(){
    console.log('Server running at port 3000: http://0.0.0.0:3000')
})
