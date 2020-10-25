// Knapsack problem
// weakly NP-hard
// NP difficile

// const coins = [10, 5, 2];

const INFINITY = 1000000000000;
const stringCoins = ['x', 'y', 'z'];

function greedyChange(number, coins) {
    let biggest_coin = coins[0];
    let middle_coin = coins[1];
    let smallest_coin = coins[2];
    let quot_biggest_coin = Math.trunc(number / biggest_coin);
    let min_sum = -1;
    let x_min, y_min, z_min; 
    while (quot_biggest_coin >= 0) {
        let rest_biggest_coin = number - quot_biggest_coin * biggest_coin;
        let quot_middle_coin = Math.trunc(rest_biggest_coin / middle_coin);
        while (quot_middle_coin >= 0) {
            let rest_middle_coin = rest_biggest_coin - quot_middle_coin * middle_coin;
            let quot_smallest_coin = Math.trunc(rest_middle_coin / smallest_coin);
            let rest_smallest_coin = rest_middle_coin - quot_smallest_coin * smallest_coin;
            if (rest_smallest_coin === 0) {
                let sum = quot_biggest_coin + quot_middle_coin + quot_smallest_coin;
                  if (min_sum === -1 || sum < min_sum) {
                    z_min = quot_smallest_coin;
                    y_min = quot_middle_coin;
                    x_min = quot_biggest_coin;
                    min_sum = sum;
                  }
            }
            quot_middle_coin--;
        }
        quot_biggest_coin--;
    }
    if (min_sum !== -1) return {
        coins: min_sum,
        composition: {
            x: x_min,
            y: y_min,
            z: z_min,
        }
    }
    return null
}


function recursiveChange(number, composition, coins) {
    let minTotal = INFINITY;
    let minComposition = null;
    let newComposition = null;
    let minCoins = 0;
    if (number === 0) return composition
    else {
        let i = 0;
        while (coins[i]) {
            if (number - coins[i] >= 0) {
                newComposition = JSON.parse(JSON.stringify(composition));
                newComposition[stringCoins[i]]++;
                let rec = recursiveChange(number - coins[i], newComposition, coins)
                if (rec) {
                    let k = 0
                    while (coins[k]) {
                        minCoins += rec[stringCoins[k]]
                        k++
                    }
                    if (minCoins < minTotal) {
                        minTotal = minCoins;
                        minComposition = rec;
                    }
                }
            }
            i++;
        }

        return minComposition
    }
}

function addCompositions(firstComposition, secondComposition) {
    let composition = {}
    firstComposition.x = firstComposition.x + secondComposition.x
    firstComposition.y = firstComposition.y + secondComposition.y
    firstComposition.z = firstComposition.z + secondComposition.z
    return composition
}

function sumValues(composition) {
    if (composition) return composition.x + composition.y + composition.z 
    else return INFINITY
}

function recursiveChangeWithMemorisation(number, composition, coins, knownResults) {
    let minTotal = INFINITY;
    let minComposition = null;

    if (number === 0) {
        let totalCoins = composition.x + composition.y + composition.z;
        return { composition: composition, coins: totalCoins}
    }
    else if (knownResults[number]) {
        let result_comp = addCompositions(composition, knownResults[number])
        return { composition: result_comp, coins: sumValues(result_comp)}
    }
    else {
        let i = 0;
        while (coins[i]) {
            if (number - coins[i] >= 0) {
                let newComposition = JSON.parse(JSON.stringify(composition));
                newComposition[stringCoins[i]]++;
                let rec = recursiveChangeWithMemorisation(number - coins[i], newComposition, coins, knownResults)
                // let result_comp = rec.composition
                let minCoins = rec.coins
                if (rec) {
                    if (minCoins < minTotal) {
                        minTotal = minCoins;
                        minComposition = rec.composition;
                    }
                }
            }
            i++;
        }
        knownResults[number] = minComposition;
        return { composition: minComposition, coins: sumValues(minComposition)}
    }
}


function dynamicProgrammingChange(number, coins) {
    let minNumCoins = [0];
    let compositions = [{ 'x': 0, 'y': 0, 'z': 0 }];
    let money = 1;
    while (money <= number) {
        minNumCoins[money] = INFINITY
        compositions[money] = null
        let i = 0, numCoins;
        while (coins[i]) {
            if (money >= coins[i]) {
                numCoins = minNumCoins[money - coins[i]] + 1
                if (numCoins < minNumCoins[money]) {
                    minNumCoins[money] = numCoins
                    compositions[money] = JSON.parse(JSON.stringify(compositions[money - coins[i]]));
                    compositions[money][stringCoins[i]]++;
                }
            }
            i++
        }
        money++
    }
    return  { coins: minNumCoins[number], composition: compositions[number] };
}