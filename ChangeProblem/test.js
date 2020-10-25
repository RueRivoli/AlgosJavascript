let algo = require('./cashierAlgos.js');
const { JSDOM } = require("jsdom");
const { window } = new JSDOM();
// import * as algo from './cashierAlgos.js'



let i = 0, res;
// let performancesGreedy = [];
// let resultCoinsGreedy = [];
// let resultCompositionsGreedy = [];
// while (i < 100) {
//     var t0 = window.performance.now()
//     res = algo.greedyChange(i)   // <---- The function you're measuring time for 
//     var t1 = window.performance.now()
//     performancesGreedy[i] = (t1 - t0);
//     if (res) resultCoinsGreedy[i] = res.coins;
//     else resultCoinsGreedy[i] = 0;
//     if (res) resultCompositionsGreedy[i] = res.composition
//     else resultCompositionsGreedy[i] = null
//     i++
// }

i = 0;
let performancesRecursive = [];
let resultCoinsRecursive = [];
let resultCompositionsRecursive = [];
while (i < 50) {
    console.log(i)
    var t0 = window.performance.now()
    res = algo.recursiveChange(i, 0, {'two': 0, 'five': 0, 'ten': 0})
    var t1 = window.performance.now()
    performancesRecursive[i] = (t1 - t0);
    if (res) resultCoinsRecursive[i] = res.coins;
    else resultCoinsRecursive[i] = 0;
    if (res) resultCompositionsRecursive[i] = res.composition
    else resultCompositionsRecursive[i] = null
    i++
}

// i = 0;
// let performancesDynamicProgramming = [];
// let resultCoinsDynamicProgramming = [];
// let resultCompositionsDynamicProgramming = [];
// while (i < 50) {
//     var t0 = window.performance.now()
//     res = algo.dynamicProgrammingChange(i, 0, {'two': 0, 'five': 0, 'ten': 0})   // <---- The function you're measuring time for 
//     var t1 = window.performance.now()
//     performancesDynamicProgramming[i] = (t1 - t0);
//     if (res) resultCoinsDynamicProgramming[i] = res.coins;
//     else resultCoinsDynamicProgramming[i] = 0;
//     if (res) resultCompositionsDynamicProgramming[i] = res.composition
//     else resultCompositionsDynamicProgramming[i] = null
//     i++
// }

// function displayCoins(coins) {
//     if (coins) return coins
//     else return '0'
// }

function displayCompositions(comp) {
    if (comp) return ' [' + comp.two + ', ' + comp.five + ', ' +  comp.ten + '] ';
    else return ' null'
}


// function displayResult() {
//     let i = 0;
//     console.log('i ------- GREEDY --------   RECURSIVE --------- DYNA PROG -------')
//     while (i < 100) {
//         console.log(i + ' --- ' + resultCoinsGreedy[i] + ' ---- ' + resultCoinsRecursive[i] + ' ---- ' + resultCoinsDynamicProgramming[i] );
//         console.log(' ---- ' + displayCompositions(resultCompositionsGreedy[i]) + ' ---- ' + displayCompositions(resultCompositionsRecursive[i]) + ' ---- ' + displayCompositions(resultCompositionsDynamicProgramming[i]));
//         console.log(' ---- ' + performancesGreedy[i] + ' ms ' + ' ---- ' + performancesRecursive[i] + + ' ms ' + ' ---- ' +  performancesDynamicProgramming[i] + ' ms ')
//         i++
//     }
// }

function displayResult(coins, composition, performance) {
    let i = 0;
    let sum = 0;
    console.log('i -------')
    while (i < 50) {
        console.log(i + ' --- ' + coins[i] + ' ---- ' + displayCompositions(composition[i]) + ' ---- ' + performance[i] + ' ms ');
        sum = sum + performance[i];
        i++
    }
    console.log(sum);
    console.log('Performance Moyenne ==> '  + sum / 50 + ' ms')
}

// displayResult(resultCoinsGreedy, resultCompositionsGreedy, performancesGreedy);

displayResult(resultCoinsRecursive, resultCompositionsRecursive, performancesRecursive);

// displayResult(resultCoinsDynamicProgramming, resultCompositionsDynamicProgramming, performancesDynamicProgramming);



// console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")