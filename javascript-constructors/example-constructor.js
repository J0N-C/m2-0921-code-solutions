function ExampleConstructor() {

}

console.log('value of exampleConstructor', ExampleConstructor);
console.log('typeof exampleConstructor', ExampleConstructor);

var anExampleConstructor = new ExampleConstructor();

console.log('value of anExampleConstructor', anExampleConstructor);
console.log('typeof anExampleConstructor', anExampleConstructor);
console.log('instanceof ExampleConstructor?', anExampleConstructor instanceof (ExampleConstructor));
