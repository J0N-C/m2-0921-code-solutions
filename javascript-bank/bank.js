/* exported Bank */
function Bank() {
  this.nextAccountNumber = 1;
  this.accounts = [];
}

Bank.prototype.openAccount = function (holder, balance) {
  if (!(balance) || typeof balance !== 'number' || !(Number.isInteger(balance)) || balance < 0) return null;
  const newAccount = new Account(this.nextAccountNumber, holder);
  newAccount.deposit(balance);
  this.accounts.push(newAccount);
  this.nextAccountNumber++;
  return newAccount.number;
};

Bank.prototype.getAccount = function (number) {
  for (let i = 0; i < this.accounts.length; i++) {
    if (this.accounts[i].number === number) {
      return this.accounts[i];
    }
  }
  return null;
};

Bank.prototype.getTotalAssets = function () {
  let totalAssets = 0;
  this.accounts.forEach(acc => {
    totalAssets += acc.getBalance();
  });
  return totalAssets;
};
