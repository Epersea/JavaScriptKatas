const coins = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.10,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100,
};

export function checkCashRegister(price, cash, cid) {
    let change = { status: "", change: [] };
    let changeAmount = normalize(cash - price);

    const amountInDrawer = calculateAmountInDrawer(cid);

    if (changeAmount > amountInDrawer) {
        change.status = "INSUFFICIENT_FUNDS";
    }

    if (changeAmount === amountInDrawer) {
        change.status = "CLOSED";
        change.change = cid.reverse();
    }

    if (changeAmount < amountInDrawer) {
        change.status = "OPEN";
        change.change = calculateChange(changeAmount, cid);
    }

    return change;
}

function normalize(operation) {
    return Number((operation).toFixed(2));
}

function calculateAmountInDrawer(cid) {
    let amountInDrawer = 0;

    for (let coin of cid) {
        amountInDrawer += coin[1];
    }

    return amountInDrawer;
}

function calculateChange(changeAmount, cid) {
    let change = [];
    const coinsInDrawer = cid.length - 1

    if (changeAmount > 0) {
        for (let i = coinsInDrawer; i >= 0; i--) {

            const coinName = cid[i][0];
            const coinValue = coins[coinName];
            const coinAmount = cid[i][1];

            if (changeAmount >= coinValue) {
                const numOfCoins = calculateNumOfCoins(coinAmount, coinValue, changeAmount);
                const changeInCoins = normalize(numOfCoins * coinValue);

                change.push([coinName, changeInCoins]);

                changeAmount = normalize(changeAmount - changeInCoins);
            }
        }
    }
    return change;
}

function calculateNumOfCoins(coinAmount, coinValue, changeAmount) {
    const coinsAvailable = Math.floor(coinAmount / coinValue);
    const coinsNeeded = Math.floor(changeAmount / coinValue);
    const numOfCoins = Math.min(coinsAvailable, coinsNeeded);
    
    return numOfCoins;
}