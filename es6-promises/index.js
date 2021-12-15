const takeAChance = require('./take-a-chance');

const luck = takeAChance('Jonathan');
luck.then(value => {
  console.log(value);
}).catch(e => {
  console.log(e.message);
});
