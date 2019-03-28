var express = require('express')
var app = express()
var mysql = require('mysql') 

//Store database configuration
var config = require('./queries/dbconfig')
var dbOptions = {
    host:      config.database.host,
    user:       config.database.user,
    password: config.database.password,
    port:       config.database.port, 
    database: config.database.db
}
 
app.set('view engine', 'ejs')

var index = require('./routes/index')
var users = require('./routes/items')
 
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
 
app.listen(3000, function(){
    console.log('Server running at port 3000: http://127.0.0.1:3000')
})