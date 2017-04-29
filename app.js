var express = require('express');
var app = express();

var port = process.env.PORT || 5000;

app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');


app.get('/', function(req,res)
{
    res.render('index', {title: 'Hello from render', 
            nav: [{
                Link: '/Books',Text: 'Books'
            },
            {
                Link:'/Authors', Text:'Author'
            }]
        });

});
app.get('/books', function(req, res)
{
    res.send('Hello Books!');
});
app.listen(port, function(err)
{
        console.log(new Date().toLocaleTimeString() + ' The server is running on port ' + port);
    });