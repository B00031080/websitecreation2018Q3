const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');

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
    let winningUser = (Math.abs(userNumber1 - computerNumber) <
        Math.abs(userNumber2 - computerNumber)) ? "User 1" : "User 2";

    res.render('game', {post:true, userNumber1: userNumber1, userNumber2: userNumber2, computerNumber: computerNumber, winningUser: winningUser});
});


app.get('/:users', function (req, res) {
    res.render('home', {users:req.params.users.split(",")});
});
app.get('/mysecret', (req, res) => res.send('Tu ne devrais pas être là!!!'));



app.use(express.static('client'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));