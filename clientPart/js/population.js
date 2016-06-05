var _$Population = function (population, impot) {
    this.population = population;
    this.impot = impot;
};

function increasePopulation(x) {
    _$Population.population += parseInt(x);
}

function decreasePopulation(x) {
    _$Population.population -= parseInt(x);
}        

function increaseImpot() {
    if(_$Population.impot<20){
        _$Population.impot +=1;
    }
}

function decreaseImpot() {
    if(_$Population.impot>0){
        _$Population.impot -=1;
    }
}