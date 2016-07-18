// server.js

// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var forceDomain    = require('node-force-domain');

// configuration ===========================================



// set our port
var port = process.env.PORT || 3002;

var router = express.Router({
    caseSensitive: app.get('case sensitive routing'),
    strict       : app.get('strict routing')
});
// mongoose.connect(db.url);

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(forceDomain({
    hostname: 'www.javacup.io'
}));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

app.use('/js', express.static(__dirname + '/js', { redirect : false }));
app.use('/bower_components', express.static(__dirname + '/bower_components', { redirect : false }));
app.use('/css', express.static(__dirname + '/css', { redirect : false }));
app.use('/views', express.static(__dirname + '/views' , { redirect : false }));
app.use('/assets', express.static(__dirname + '/assets', { redirect : false }));


// routes ==================================================
require('./routes')(app); // configure our routes

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);

// shoutout to the user                     
console.log('Running the server at port: ' + port);

// expose app           
exports = module.exports = app;