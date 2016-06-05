var _$Budget = function (budget) {
    this.budget = budget;
};

function increaseBudget(x) {
    _$Budget.budget += parseInt(x);
}

function decreaseBudget(x) {
    _$Budget.budget -= parseInt(x);
}                     