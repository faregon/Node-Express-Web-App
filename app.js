var express = require('express');
var app = express();
var sql = require('mssql');
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

var port = process.env.PORT || 5000;
var nav =
        [{
    Link: '/Books',Text: 'Book'
},
    {
    Link:'/Authors', Text:'Author'
}];

var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);

app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');



app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);

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