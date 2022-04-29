const express = require('express');
const app = express();
const fs = require('fs');
const calc = require('./scripts/calculator.js');
let insurance = 0;

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded( {extended: true} ));


app.get('/', (req, res) => {
    const carTypes = ['sedan', 'kombi', 'coupe', 'kabriolet', 'hatchback', 'van'];
    const carBrands = ['BMW', 'Toyota', 'SEAT', 'Porsche', 'Suzuki', 'Opel', 'Volvo']
    app.render('index', {carTypes: carTypes, carBrands: carBrands, insurance: insurance}, function(err, html){
        res.send(html);
    });
});

app.post('/', (req, res) => {
    insurance = calc.trivialCalculator(req.body);
    res.redirect('/');
});

app.get('/extended', (req, res) => {
    const carTypes = ['sedan', 'kombi', 'coupe', 'kabriolet', 'hatchback', 'van'];
    const carBrands = ['BMW', 'Toyota', 'SEAT', 'Porsche', 'Suzuki', 'Opel', 'Volvo'];
    insurance = 0;
    app.render('extended.ejs',  {carTypes: carTypes, carBrands: carBrands }, function(err,html){
        res.send(html);
    });
});

app.post('/extended', (req, res) => {
    const currentRequests = JSON.parse(fs.readFileSync("./requests.json", "utf8"));
    currentRequests.push(req.body);
    fs.writeFileSync("./requests.json", JSON.stringify(currentRequests));
    res.redirect('/')
});

app.listen('8000');