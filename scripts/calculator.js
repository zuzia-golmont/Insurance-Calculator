function trivialCalculator(body) {
    if(body.age>=16 && body.age<25) return 800;
    if(body.age>=25 && body.age<50) return 500;
    if(body.age>=50 && body.age<70) return 700;
    else return 1000;
}

module.exports = {trivialCalculator};