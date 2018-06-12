const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const mongo = require('mongodb');

let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("game");
  

    const app = express();
    app.engine('handlebars', exphbs({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }))

    // parse application/json
    app.use(bodyParser.json())

    app.get('/game', function (req, res) {
        res.render('game', {});
    });

    app.post('/game', function (req, res) {
        let userNumber1 = parseInt(req.body.userNumber1);
        let userNumber2 = parseInt(req.body.userNumber2);
        let computerNumber = parseInt(Math.random()*100);
        dbo.collection("plays").insertOne({player1:userNumber1,player2:userNumber2,computer:computerNumber},function(err, respo) {
            if (err) throw err;
            let winningUser = (Math.abs(userNumber1 - computerNumber) <
            Math.abs(userNumber2 - computerNumber)) ? "User 1" : "User 2";
            res.render('game', {post:true, userNumber1: userNumber1, userNumber2: userNumber2, computerNumber: computerNumber, winningUser: winningUser});        
          });
    });

    app.get('/results', function (req, res) {
        dbo.collection("plays").find({}).toArray(function(err, result) {
            if (err) throw err;
            res.render('result', {games:result});
          });
    });


    app.get('/:users', function (req, res) {
        res.render('home', {users:req.params.users.split(",")});
    });
    app.get('/mysecret', (req, res) => res.send('Tu ne devrais pas être là!!!'));



    app.use(express.static('client'));

    app.listen(3000, () => console.log('Example app listening on port 3000!'));
});


