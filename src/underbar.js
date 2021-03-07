/* eslint-disable func-names */
/* eslint-disable prefer-rest-params */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
(function () {
  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = (value) => value;

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = (array, n) => {
    if (n === undefined) {
      return array[0];
    }
    return array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = (array, n) => {
    if (n === undefined) {
      return array[array.length - 1];
    } if (n === 0) {
      return [];
    }
    return array.slice(-n);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = (collection, iterator) => {
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i += 1) {
        iterator(collection[i], i, collection);
      }
    } else {
      const arr = Object.entries(collection);
      for (let j = 0; j < arr.length; j += 1) {
        iterator(arr[j][1], arr[j][0], collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = (array, target) => {
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    let index = -1;

    _.each(array, (item, key) => {
      if (item === target && index === -1) {
        index = key;
      }
    });

    return index;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = (collection, test) => {
    const filtered = [];

    _.each(collection, (value) => {
      if (test(value)) {
        filtered.push(value);
      }
    });

    return filtered;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = (collection, test) => _.filter(collection, (value) => !test(value));

  // Produce a duplicate-free version of the array.
  _.uniq = (array, isSorted, iterator = _.identity) => {
    const hash = {};

    _.each(array, (value) => {
      const transformed = iterator(value);
      if (hash[transformed] === undefined) {
        hash[transformed] = value;
      }
    });

    return Object.values(hash);
  };

  // Return the results of applying an iterator to each element.
  _.map = (collection, iterator) => {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    const mapped = [];

    _.each(collection, (value, key, collection) => {
      mapped.push(iterator(value, key, collection));
    });

    return mapped;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = (collection, key) => _.map(collection, (value) => value[key]);

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = (collection, iterator, accumulator) => {
    if (accumulator === undefined) {
      accumulator = collection[0];
      collection = collection.slice(1);
    }

    _.each(collection, (value) => {
      accumulator = iterator(accumulator, value);
    });

    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = (collection, target) => _.reduce(collection, (accumulator, value) => {
    if (accumulator) {
      return true;
    }
    return value === target;
  }, false);

  // Determine whether all of the elements match a truth test.
  _.every = (collection, iterator = _.identity) => _.reduce(collection, (accumulator, value) => {
    if (accumulator) {
      return !!iterator(value);
    }
    return false;
  }, true);

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = (collection, iterator = _.identity) => !_.every(collection, (value) => !iterator(value));

  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function (object) {
    _.each([...arguments].slice(1), (obj) => {
      _.each(obj, (value, key) => {
        object[key] = value;
      });
    });

    return object;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function (object) {
    _.each([...arguments].slice(1), (obj) => {
      _.each(obj, (value, key) => {
        if (object[key] === undefined) {
          object[key] = value;
        }
      });
    });

    return object;
  };

  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = (func) => {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    let alreadyCalled = false;
    let result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function () {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = (func) => {
    const memos = {};

    return function () {
      const args = JSON.stringify(arguments);
      if (!memos[args]) {
        memos[args] = func.apply(this, arguments);
      }
      return memos[args];
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function (func, wait) {
    const args = [...arguments].slice(2);
    setTimeout(func, wait, ...args);
  };

  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = (array) => {
    const copy = array.slice();
    let currentIx = array.length - 1;
    let temp; let
      swapIx;

    while (currentIx) {
      swapIx = Math.floor(Math.random() * currentIx);

      currentIx -= 1;

      temp = copy[currentIx];
      copy[currentIx] = copy[swapIx];
      copy[swapIx] = temp;
    }

    return copy;
  };

  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = (collection, functionOrKey, args) => _.map(collection, (value) => {
    let method;

    if (typeof functionOrKey === 'string') {
      method = value[functionOrKey];
    } else {
      method = functionOrKey;
    }

    return method.apply(value, args);
  });

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = (collection, iterator) => {
    if (typeof iterator === 'string') {
      const iter = iterator;
      iterator = (value) => value[iter];
    }

    return collection.sort((a, b) => iterator(a) - iterator(b));
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function () {
    let max = 0;
    const zipped = [];
    _.each(arguments, (arg) => {
      max = Math.max(arg.length, max);
    });

    for (let i = 0; i < max; i += 1) {
      zipped[i] = _.pluck(arguments, i);
    }

    return zipped;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = (nestedArray) => _.reduce(nestedArray, (accumulator, value) => {
    if (Array.isArray(value)) {
      return accumulator.concat(_.flatten(value));
    }
    return accumulator.concat([value]);
  }, []);

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function () {
    const others = [...arguments].slice(1);

    return _.filter(
      _.uniq(arguments[0]), (value) => _.every(others, (array) => _.indexOf(array, value) > -1),
    );
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function (array) {
    const others = _.flatten([...arguments].slice(1));

    return _.filter(array, (value) => !_.contains(others, value));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function (func, wait) {
    let flag = false;

    return function () {
      if (flag !== true) {
        flag = true;
        func.apply([...arguments]);

        setTimeout(() => {
          flag = false;
        }, wait);
      }
    };
  };
}());
