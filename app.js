// var sql = require('mssql');
var express = require('express');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');

var app = express();

var port = process.env.PORT || 5000;
var config = {
    user:'minko',
    password: 'Parola1234',
    server: 'nodejs.database.windows.net',
    database: 'nodejs',

    options: {
        encrypt: true // for azure
    }
};

// sql.connect(config, function(err){
//     console.log(err);
// })


var nav =
        [{
    Link: '/Books',Text: 'Book'
},
    {
    Link:'/Authors', Text:'Author'
}];

var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);

//middleware
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({secret: 'books'}));
require('./src/config/passport')(app);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

app.get('/', function(req,res)
{
    res.render('index',
    {
            title: 'Hello from render',
            nav: nav
        });

});

app.listen(port, function(err)
{
        console.log(new Date().toLocaleTimeString() + ' The server is running on port ' + port);
    });