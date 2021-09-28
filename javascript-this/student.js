/* exported student */
var student = {
  firstName: 'Jonathan',
  lastName: 'Chiang',
  subject: 'javaScript',
  getFullName: function () {
    return this.firstName + ' ' + this.lastName;
  },
  getIntroduction: function () {
    return `Hello, my name is ${this.getFullName()} and I am studying ${this.subject}.`;
  }
};
