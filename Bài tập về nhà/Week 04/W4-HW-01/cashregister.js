function checkCashRegister(price, cash, cid) {
  const currencyUnits = [
    ["ONE HUNDRED", 100],
    ["TWENTY", 20],
    ["TEN", 10],
    ["FIVE", 5],
    ["ONE", 1],
    ["QUARTER", 0.25],
    ["DIME", 0.1],
    ["NICKEL", 0.05],
    ["PENNY", 0.01]
  ];

  let changeDue = cash - price;
  let totalCID = 0;
  for (let i = 0; i < cid.length; i++) {
    totalCID += cid[i][1];
  }
  totalCID = totalCID.toFixed(2);

  if (Number(totalCID) < changeDue) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }
  else if (Number(totalCID) === changeDue) {
    return { status: "CLOSED", change: cid };
  }
  else {
    let changeArr = [];

    for (let i = 0; i < currencyUnits.length; i++) {
      const coinName = currencyUnits[i][0];
      const coinValue = currencyUnits[i][1];
      let coinAvailable = cid[cid.length - 1 - i][1]; 
      let amountToReturn = 0;

      while (changeDue >= coinValue && coinAvailable > 0) {
        changeDue -= coinValue;
        changeDue = Math.round(changeDue * 100) / 100; 
        coinAvailable -= coinValue;
        amountToReturn += coinValue;
      }

      if (amountToReturn > 0) {
        changeArr.push([coinName, amountToReturn]);
      }
    }

    if (changeDue > 0) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }

    return { status: "OPEN", change: changeArr };
  }
}

console.log(
  checkCashRegister(19.5, 20, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
  ])
);
// ➜ {status: "OPEN", change: [["QUARTER", 0.5]]}

console.log(
  checkCashRegister(3.26, 100, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
  ])
);
// ➜ {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}

console.log(
  checkCashRegister(19.5, 20, [
    ["PENNY", 0.01],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
  ])
);
// ➜ {status: "INSUFFICIENT_FUNDS", change: []}

console.log(
  checkCashRegister(19.5, 20, [
    ["PENNY", 0.5],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
  ])
);
// ➜ {status: "CLOSED", change: [["PENNY", 0.5], ...]}
