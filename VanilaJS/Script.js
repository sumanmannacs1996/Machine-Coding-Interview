// Polyfill of map

Array.prototype.myMap = function (cb) {
  const out = [];
  for (let i = 0; i < this.length; i++) {
    out.push(cb(this[i], i, this));
  }
  return out;
};

console.log([1, 2, 3, 4, 5].myMap((num, idx) => num * 2 + idx)); // [2, 5, 8, 11, 14]

// Polyfill of filter

Array.prototype.myFilter = function (cb) {
  const out = [];
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i], i, this)) {
      out.push(this[i]);
    }
  }
  return out;
};

console.log([1, 2, 3, 4, 5].myFilter((num, idx) => num % 2 === 0)); // [2, 4]

// Polyfill of Reduce
Array.prototype.myReduce = function (cb, initial) {
  let accmulator = initial;
  for (let i = 0; i < this.length; i++) {
    accmulator = accmulator ? cb(accmulator, this[i], i, this) : this[i];
  }
  return accmulator;
};

console.log([1, 2, 3, 4, 5].myReduce((acc, num, idx) => acc + num + idx, 0)); // 25

// polyfill of some

Array.prototype.mySome = function (cb) {
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i], i, this)) return true;
  }
  return false;
};

console.log([1, 2, 3, 4, 5].mySome((num, idx) => num >= 5)); // true
console.log([1, 2, 3, 4, 5].mySome((num, idx) => num > 5)); // false

// polyfil of every

Array.prototype.myEvery = function (cb) {
  for (let i = 0; i < this.length; i++) {
    if (!cb(this[i], i, this)) return false;
  }
  return true;
};

console.log([1, 2, 3, 4, 5].myEvery((num, idx) => num < 5)); // false
console.log([1, 2, 3, 4, 5].myEvery((num, idx) => num <= 5)); // true

// closer-----------------------------

/*
write a function that allow you to do this 
var addSix = createBase(6);

console.log(addSix(10)) // 16
console.log(addSix(21)) // 37
*/

function createBase(number) {
  let sum = number;
  return function (number2) {
    sum += number2;
    return sum;
  };
}

var addSix = createBase(6);

console.log(addSix(10)); // 16
console.log(addSix(21)); // 37

/// Create private counter using closer

function counter(initialValue = 0) {
  let _counter = initialValue;

  function incremnet(fraction = 1) {
    _counter += fraction;
  }

  function decremnet(fraction) {
    _counter -= fraction;
  }

  function print() {
    console.log(`Your counter value is:- ${_counter}`);
  }

  return { incremnet, decremnet, print };
}

const myCunter = counter(5);
myCunter.print(); // 5
myCunter.incremnet(5);
myCunter.print(); // 10
myCunter.decremnet(2);
myCunter.print(); // 8

const myCunter1 = counter();
myCunter1.print(); // 0

//-------------------------------------***** Good one
let countLet = 0;
(function () {
  if (countLet === 0) {
    let countLet = 1;
    console.log(countLet); // 1
  }
  console.log(countLet); // 0
})();
//--------------------------------------------- ***** good one
var count = 0;
(function () {
  if (count === 0) {
    var count = 1;
    console.log(count); // will not go inside as count = undefined so no print
  }
  console.log(count); // undefined
})();

function createBase(num) {
  return function (num1) {
    return num + num1;
  };
}

// print count every second

function printNumbers(num) {
  for (let i = 1; i <= num; i++) {
    (function (i) {
      setTimeout(() => {
        console.log(i);
      }, i * 1000);
    })(i);
  }
}
printNumbers(5);

// Module Pattern

var Module = (function () {
  function privateMethod() {
    // do someting
    console.log("Private");
  }

  return {
    publicMethod: function () {
      privateMethod(); // can only call
      console.log("Public");
    },
  };
})();

Module.publicMethod(); // Private Public

// Make a finction which call only once

function likeTheVideo() {
  let isCalled = false;
  return function () {
    if (!isCalled) {
      console.log("Done!");
      isCalled = true;
    } else {
      console.log("Already Liked!");
    }
  };
}
let isLiked = likeTheVideo();
isLiked(); // Done!
isLiked(); // Already Liked!
isLiked(); // Already Liked!

// Polyfill of Once function

function myOnce(cb, context) {
  let ran;
  return function (...args) {
    if (cb) {
      ran = cb.apply(context || this, args);
      cb = null;
    }
    return ran;
  };
}

const printHello = myOnce(function (a, b) {
  console.log("Hello", a, b);
});
printHello(1, 2); // Hello 1 2
printHello(1, 2); // will not print
printHello(1, 2); // will not print

// Implemnet a maemoze function

function clumsySqare(num1, num2) {
  for (let i = 0; i < 99999999; i++) {}
  return num1 * num2;
}

function myMemoize(cb) {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    if (!cache[key]) {
      cache[key] = cb(...args);
    }
    return cache[key];
  };
}

const aBetterFunction = myMemoize(clumsySqare);
console.time("First Call");
console.log(aBetterFunction(234, 564)); // 131976
console.timeEnd("First Call"); // First Call: 836.5419921875 ms

console.time("Second Call");
console.log(aBetterFunction(234, 564)); // 131976
console.timeEnd("Second Call"); // Second Call: 0.14990234375 ms

// currying
// function takes one argumnet ata time and return new function expecting new argumnet
function f(a) {
  return function (b) {
    console.log(a, b);
  };
}
f(1)(2); // 1 2

// why do we use currying
// To avoid passing same variable again aand agin, to Create higher order function, to make function pure,

// implemnet sum(1)(2)(3)()

function sum(a) {
  return function (b) {
    if (b) {
      return sum(a + b);
    } else {
      return a;
    }
  };
}

console.log(sum(1)(2)(3)(4)()); // 10

/*
  evaluate("sum")(4)(2) => 6
  evaluate("multiply")(4)(2) => 8
  evaluate("devide")(4)(2) => 2
  evaluate("substract")(4)(2) => 2
*/

function evaluate(claculation) {
  return function (a) {
    return function (b) {
      if (claculation === "sum") return a + b;
      else if (claculation === "multiply") return a * b;
      else if (claculation === "devide") return a / b;
      else if (claculation === "substract") return a - b;
      else return "Invalid Operations";
    };
  };
}
console.log(evaluate("sum")(4)(2)); // 6
console.log(evaluate("multiply")(4)(2)); // 8
console.log(evaluate("devide")(4)(2)); // 2
console.log(evaluate("substract")(4)(2)); // 2

// real example of currying
function updateElmenetText(id) {
  return function (content) {
    document.querySelector("#" + id).textContent = content;
  };
}

const updateHeader = updateElmenetText("name");
updateHeader("Suman Manna");
updateHeader("Suman Manna1");

// implement normal function to curry function
function myCurry(fn) {
  return function curriedFunction(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return function (...rest) {
        return curriedFunction(...args, ...rest);
      };
    }
  };
}

function sum1(a, b, c, d) {
  return a + b + c + d;
}

const totalSum = myCurry(sum1);
console.log(totalSum(1)(2)(3)(4)); // 10

// dynamic property to object
const property = "firstName";
let user = {
  [property]: "Suman",
};

// dynamically add proery to object
let user1 = {
  ...(1 === 1 && { firstName: "Suman" }),
  ...(1 === 2 && { lastName: "Manna" }),
};
console.log(user1); // {firstName: "Suman"}

// nested destructuring
user = {
  fullName: {
    first: "Suman",
    last: "Manna",
  },
};
const {
  fullName: { first, last },
} = user;
console.log(first, last);

// copy an object recursiverly
const input = {
  name: "Mansi",
  age: 25,
  department: {
    name: "Customer Experience",
    section: "Technical",
    branch: {
      name: "Bangalore",
      timezone: "IST",
    },
  },
  company: {
    name: "SAP",
    customers: ["Ford", "Nestle"],
  },
  skills: ["javascript", "node.js", "html"],
};

function objectCloneSimple(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function objectCloneRecrsive(obj) {
  if (typeof obj !== "object" || !obj) return obj;
  const cloneObj = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (typeof obj[key] === "object") {
      cloneObj[key] = objectCloneRecrsive(obj[key]);
    } else {
      cloneObj[key] = obj[key];
    }
  }
  return cloneObj;
}

console.log(objectCloneRecrsive(input));

// flatning object
function flaten(inpObj) {
  if (typeof inpObj !== "object" || !inpObj) return inpObj;
  const outObject = {};
  for (let key in inpObj) {
    const value = inpObj[key];
    if (typeof value === "object" && !Array.isArray(value)) {
      const nested = flaten(value);
      for (let innerKey in nested) {
        outObject[`${key}_${innerKey}`] = nested[innerKey];
      }
    } else {
      outObject[key] = value;
    }
  }
  return outObject;
}
console.log(flaten(input));

// flatning array

function flatningArray(inptArray) {
  if (!Array.isArray(inptArray)) return inptArray;
  const outArray = [];
  inptArray.forEach((el) => {
    if (Array.isArray(el)) {
      outArray.push(...flatningArray(el));
    } else {
      outArray.push(el);
    }
  });
  return outArray;
}
console.log(
  flatningArray([1, [1, 2, [1, 2, 3, [1, 2, 3, 4, [1, 2, 3, 4, 5]]]]])
);

// Output based on this

let user2 = {
  name: "Suman",
  age: 28,
  childObject: {
    newName: "Suman Manna",
    getName() {
      console.log(`Hello ${this.newName} and ${this.name}`);
    },
  },
};
user2.childObject.getName(); // Hello Suman Manna undefined

user2 = {
  name: "Suman",
  printDetails() {
    function printAgian() {
      console.log(`Hello ${this.name}`);
    }
    printAgian();
  },
};
user2.printDetails(); // Hello  this refer to window object

user2 = {
  name: "Suman",
  printDetails() {
    printAgian = () => {
      console.log(`Hello ${this.name}`);
    };
    printAgian();
  },
};
user2.printDetails(); // Hello Suman

function makeUser() {
  return {
    name: "John",
    ref: this,
  };
}
user2 = makeUser();
console.log(user2.ref.name); //    this point to window object

function makeUser1() {
  return {
    name: "John",
    ref() {
      return this;
    },
  };
}
user2 = makeUser1();
console.log(user2.ref().name); // John

user2 = {
  name: "Jonny",
  printName() {
    console.log(`Hello ${this.name}`);
  },
};

setTimeout(user2.printName, 0); // Hello this points to window
setTimeout(() => {
  user2.printName(); // Hello Jonny
}, 0);

//------------
var length = 4;
function callback() {
  console.log(this.length);
}

let object = {
  length: 5,
  method(fn) {
    fn();
  },
};
object.method(callback); // 4

object = {
  length: 5,
  method() {
    arguments[0]();
  },
};
object.method(callback, 2, 4); // 3 because here argumnet refer to array and its length is 3

//--------------
function checkPassword(success, failed) {
  // let password = prompt("password?", "");
  // if (password === "Suman Manna") success();
  // else failed();
}

user = {
  name: "Suman Manna",
  loginSuccess() {
    console.log(`${this.name} logged in`);
  },
  loginFailed() {
    console.log(`${this.name} failed to login`);
  },
};

checkPassword(user.loginSuccess, user.loginFailed); // logged in
checkPassword(user.loginSuccess.bind(user), user.loginFailed.bind(user)); // Suman Manna logged in

// apend an array to anoter array
const array = ["a", "b", "c"];
const elemenet = [1, 2, 3, 4];
array.push.apply(array, elemenet);
console.log(array); // ['a', 'b', 'c', 1, 2, 3, 4]

// call apply bind

let obj = {
  name: "Suman Manna",
};
function greet(city, state, country) {
  console.log(`Hello ${this.name} from ${city} ${state} ${country}`);
}

greet.call(obj, "Medinipur", "West Bengal", "India"); // Hello Suman Manna from Medinipur West Bengal India
greet.apply(obj, ["Medinipur", "West Bengal", "India"]); // Hello Suman Manna from Medinipur West Bengal India
greet.bind(obj, "Medinipur", "West Bengal")("India"); // Hello Suman Manna from Medinipur West Bengal India

// Polyfill of call

Function.prototype.myCall = function (context = {}, ...args) {
  if (typeof this !== "function") throw new Error(this + " It's not callable");
  context.fn = this;
  context.fn(...args);
};
greet.myCall(obj, "Medinipur", "West Bengal", "India"); // Hello Suman Manna from Medinipur West Bengal India

//Polyfill of apply

Function.prototype.myApply = function (context = {}, list) {
  if (typeof this !== "function") throw new Error(this + " It's not callable");
  context.fn = this;
  context.fn(...list);
};
greet.myApply(obj, ["Medinipur", "West Bengal", "India"]); // Hello Suman Manna from Medinipur West Bengal India

// Polyfill of Bind

Function.prototype.myBind = function (context = {}, ...arg1) {
  return (...arg2) => {
    if (typeof this !== "function")
      throw new Error(this + " It's not callable");
    context.fn = this;
    context.fn(...arg1, ...arg2);
  };
};
greet.myBind(obj, "Medinipur", "West Bengal")("India"); // Hello Suman Manna from Medinipur West Bengal India

// Promise

function doSumAsync(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 1000);
  });
}

doSumAsync(1, 2)
  .then((res) => {
    console.log(res);
    return doSumAsync(res, 3);
  })
  .then((res) => {
    console.log(res);
    return doSumAsync(res, 4);
  })
  .then((res) => {
    console.log(res);
    return doSumAsync(res, 5);
  })
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.log(error);
  });

// with async await

async function execute() {
  try {
    const out1 = await doSumAsync(1, 2);
    console.log(out1);
    const out2 = await doSumAsync(out1, 3);
    console.log(out2);
    const out3 = await doSumAsync(out2, 4);
    console.log(out3);
    const out4 = await doSumAsync(out3, 5);
    console.log(out4);
  } catch (error) {
    console.log(error);
  }
}
execute();

// create a function which solve promise recursively

function promiseRecursive(promiseList) {
  if (promiseList.length === 0) return;
  const currentPromise = promiseList.shift();
  currentPromise
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
  promiseRecursive(promiseList);
}

promiseRecursive([
  doSumAsync(1, 2),
  doSumAsync(1, 2),
  doSumAsync(1, 2),
  doSumAsync(1, 2),
]);

// Generators

// generator function

function* gen1() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
}

let generatorObject = gen1();
console.log("*********", generatorObject.next().value); // 1
console.log("*********", generatorObject.next().value); // 2
console.log("*********", generatorObject.next().value); // 3
console.log("*********", generatorObject.next().value); // 4
console.log("*********", generatorObject.next()); // {value: undefined, done: true}

// run infinite loop using generator

function* genInfinite() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

generatorObject = genInfinite();
console.log(generatorObject.next()); //{value: 1, done: false}
console.log(generatorObject.next()); //{value: 2, done: false}
console.log(generatorObject.next()); //{value: 3, done: false}
console.log(generatorObject.next()); //{value: 4, done: false}
console.log(generatorObject.return()); //{value: undefined, done: true}
//---------------------------
function* genInfinite1(start = 0, stop = Infinity, steps = 1) {
  for (let i = start; i <= stop; i += steps) {
    yield i;
  }
}

generatorObject = genInfinite1(0, 20, 2);
for (let value of generatorObject) {
  console.log(value); // this will print 0 2 4 6 .... 20
}

// event deligation

document.getElementById("products").addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    console.dir(event.target);
    console.log(`You clicked on ${event.target.attributes["name"].value}`); // You clicked on desktop
    console.log(`You clicked on ${event.target.textContent}`); // You clicked on desktop
    console.log(`You clicked on ${event.target.innerHTML}`); // // You clicked on desktop
  }
});

// polyfill of pipe

const addFive = (a) => a + 5;
const substractTwo = (a) => a - 2;
const multplyFour = (a) => a * 4;

function myPipe(...args) {
  let result;
  return (initalValue) => {
    result = initalValue;
    args.forEach((currentFn) => {
      result = currentFn(result);
    });
    return result;
  };
}

const evaluateValue = myPipe(addFive, substractTwo, multplyFour);
console.log("#######", evaluateValue(1)); // 16
console.log("#######", evaluateValue(0)); // 12

// polyfill of compose
function myCompose(...args) {
  let result;
  return (initialValue) => {
    result = initialValue;
    for (let i = args.length - 1; i >= 0; i--) {
      const currentFunction = args[i];
      result = currentFunction(result);
    }
    return result;
  };
}

const evaluateCompose = myCompose(addFive, substractTwo, multplyFour);
console.log("#######", evaluateCompose(1)); // 7
console.log("#######", evaluateCompose(0)); // 3

// polyfill of pipe and reduce using reduce

function myPipeUsingReduce(...args) {
  return (initalValue) =>
    args.reduce((acc, currentFunction) => currentFunction(acc), initalValue);
}
const evaluateValuePipe = myPipeUsingReduce(addFive, substractTwo, multplyFour);
console.log("#######1", evaluateValuePipe(1)); // 16
console.log("#######1", evaluateValuePipe(0)); // 12
//---------------
function myComposeUsingReduce(...args) {
  return (initalValue) =>
    args.reduceRight(
      (acc, currentFunction) => currentFunction(acc),
      initalValue
    );
}
const evaluateValuReduce = myComposeUsingReduce(
  addFive,
  substractTwo,
  multplyFour
);
console.log("#######1", evaluateValuReduce(1)); // 7
console.log("#######1", evaluateValuReduce(0)); // 3

// polyfill of Promise.all

function sumAsync(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 1000);
  });
}

Promise.myPromseAll = function (promiseList) {
  const finalResult = [];
  return new Promise((resolve, reject) => {
    promiseList.forEach((pr, idx) => {
      pr.then((result) => {
        finalResult.push(result);
        if (idx === promiseList.length - 1) {
          resolve(finalResult);
        }
      }).catch((err) => {
        reject(err);
      });
    });
  });
};

Promise.myPromseAll([
  sumAsync(1, 2),
  sumAsync(2, 3),
  sumAsync(3, 4),
  sumAsync(4, 5),
])
  .then((res) => {
    console.log(res); // [3, 5, 7, 9]
  })
  .catch((err) => {
    console.log(err);
  });

// Debounce

function myDebounce(cb, delay) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

const handelChange = myDebounce((e) => {
  console.log(`Fetching data for ${e.target.value}`);
}, 500);

document.getElementById("myInput").addEventListener("keyup", handelChange);

/// this keyword tricky questions

user = {
  name: "Piyush",
  age: 24,
  getDetails() {
    const nestedArrow = () => console.log(this.name); //Piyush
    nestedArrow();
  },
};

user.getDetails();

user = {
  name: "Piyush",
  age: 24,
  getDetails() {
    function nestedArrow() {
      console.log(this.name);
    } // undefined here this refer to window object
    nestedArrow();
  },
};

user.getDetails();

/// append an attar to another array

arr = ["a", "b", "c"];
arr1 = [1, 2, 3];

arr.push.apply(arr, arr1);
console.log(arr); // [ 'a', 'b', 'c', 1, 2, 3 ]

/// another
let age = 10;
var person = {
  name: "Piyush",
  age: 20,
  getAgeArro: () => {
    return this.age;
  },
  getAge: function () {
    return this.age;
  },
};

var person2 = { age: 24 };
console.log(person.getAgeArro.call(person2)); // undefined
console.log(person.getAge.call(person2)); // 24

/// create a first promise which will return first and then create a second promise which reolve our first promise  then print then solve the fitst promisr by the second promise

const myPr1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("First");
  }, 1000);
});

const myPr2 = new Promise((reslove, reject) => {
  setTimeout(() => {
    reslove(myPr1);
  }, 1000);
});

// using normal promise
// myPr2.then((res) => {
//   console.log("%%%%%%%%%%%%%%", res);
// });

// using promise chain
myPr2
  .then((res) => {
    return res;
  })
  .then((res1) => {
    console.log(res1);
  });
