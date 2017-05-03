var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongodb = require('mongodb').MongoClient;

module.exports = function () {
    passport.use(new LocalStrategy({
            usernameField: 'userName',
            passwordField: 'password'
        },
        function (username, password, done) {
            var url =
                'mongodb://localhost:27017/booksApp';

            mongodb.connect(url, function (err, db) {
                var collection = db.collection('users');
                //checking database if user is there
                collection.findOne({
                        username: username
                    },
                    function (err, results) {
                        //checking if user exists
                        if (results) {
                            //checking if the user typed the right password
                            if (results.password === password) {
                                var user = results;
                                done(null, user);
                            } else {
                                done(null, false, {message: 'Bad password'});
                            }
                        }else {
                            done(null, false, {message: 'No user'});
                        }

                    }
                );
            });
        }));
};