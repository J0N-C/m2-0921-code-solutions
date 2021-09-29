/* exported Account */
function Account(number, holder) {
  this.number = number;
  this.holder = holder;
  this.transactions = [];
}

Account.prototype.deposit = function (amount) {
  if (!(amount) || typeof amount !== 'number' || !(Number.isInteger(amount)) || amount < 0) return false;
  this.transactions.push(new Transaction('deposit', amount));
  return true;
};

Account.prototype.withdraw = function (amount) {
  if (!(amount) || typeof amount !== 'number' || !(Number.isInteger(amount)) || amount < 0) return false;
  this.transactions.push(new Transaction('withdrawal', amount));
  return true;
};

Account.prototype.getBalance = function () {
  let balance = 0;
  this.transactions.forEach(t => {
    if (t.type === 'deposit') {
      balance += t.amount;
    } else {
      balance -= t.amount;
    }
  });
  return balance;
};
