(function () {
  const checkForNativeMethods = function (runUnderbarFunction) {
    it("should not use the native version of any underbar methods in its implementation", () => {
      // These spies are set up in testSupport.js
      runUnderbarFunction();
      expect(Array.prototype.map.called).to.equal(false);
      expect(Array.prototype.indexOf.called).to.equal(false);
      expect(Array.prototype.forEach.called).to.equal(false);
      expect(Array.prototype.filter.called).to.equal(false);
      expect(Array.prototype.reduce.called).to.equal(false);
      expect(Array.prototype.every.called).to.equal(false);
      expect(Array.prototype.some.called).to.equal(false);
      expect(Array.prototype.flat.called).to.equal(false);
    });
  };

  describe("Part I", () => {
    describe("identity", () => {
      checkForNativeMethods(() => {
        _.identity(1);
      });

      it("should return whatever value is passed into it", () => {
        const uniqueObject = {};
        expect(_.identity(1)).to.equal(1);
        expect(_.identity("string")).to.equal("string");
        expect(_.identity(false)).to.be.false;
        expect(_.identity(uniqueObject)).to.equal(uniqueObject);
      });
    });

    describe("first", () => {
      checkForNativeMethods(() => {
        _.first([1, 2, 3]);
      });

      it("should be able to pull out the first element of an array", () => {
        expect(_.first([1, 2, 3])).to.equal(1);
      });

      it("should accept an index argument", () => {
        expect(_.first([1, 2, 3], 2)).to.eql([1, 2]);
      });

      it("should return empty array if zero is passed in as the index", () => {
        expect(_.first([1, 2, 3], 0)).to.eql([]);
      });

      it("should return all the array's elements if the index argument is larger than the length of the array", () => {
        expect(_.first([1, 2, 3], 5)).to.eql([1, 2, 3]);
      });
    });

    describe("last", () => {
      checkForNativeMethods(() => {
        _.last([1, 2, 3]);
      });

      it("should pull the last element from an array", () => {
        expect(_.last([1, 2, 3])).to.equal(3);
      });

      it("should accept an index argument", () => {
        expect(_.last([1, 2, 3], 2)).to.eql([2, 3]);
      });

      it("should return empty array if zero is passed in as the index", () => {
        expect(_.last([1, 2, 3], 0)).to.eql([]);
      });

      it("should return all the array's elements if the index argument is larger than the length of the array", () => {
        expect(_.last([1, 2, 3], 5)).to.eql([1, 2, 3]);
      });
    });

    describe("each", () => {
      checkForNativeMethods(() => {
        _.each([1, 2, 3, 4], number => {});
      });

      it("should not return anything", () => {
        const returnValue = _.each([], () => {});
        expect(returnValue).to.not.exist;
      });

      it("should not mutate the input array", () => {
        const input = [1, 2, 3, 4, 5];
        const result = _.each(input, _.identity);

        expect(input).to.eql([1, 2, 3, 4, 5]);
      });

      it("should iterate over arrays and provide access to each value", () => {
        const letters = ["a", "b", "c"];
        const iterations = [];

        _.each(letters, letter => {
          iterations.push(letter);
        });

        expect(iterations).to.eql(["a", "b", "c"]);
      });

      it("should iterate over arrays and provide access to each index", () => {
        const letters = ["a", "b", "c"];
        const iterations = [];

        _.each(letters, (letter, index) => {
          iterations.push([letter, index]);
        });

        expect(iterations).to.eql([
          ["a", 0],
          ["b", 1],
          ["c", 2],
        ]);
      });

      it("should iterate over arrays and provide access to the original collection", () => {
        const letters = ["a", "b", "c"];
        const iterations = [];

        _.each(letters, (letter, index, collection) => {
          iterations.push([letter, index, collection]);
        });

        expect(iterations).to.eql([
          ["a", 0, letters],
          ["b", 1, letters],
          ["c", 2, letters],
        ]);
      });

      it("should only iterate over numeric keys of an array, not all properties", () => {
        const iterations = [];
        const letters = ["a", "b", "c"];
        letters.someProperty = "Do not iterate over me!";

        _.each(letters, (letter, index, collection) => {
          iterations.push(letter);
        });

        expect(iterations).to.not.include("Do not iterate over me!");
      });

      it("should iterate over objects and provide access to each value", () => {
        const letters = { d: "dog", e: "elephant", f: "flotsam" };
        const iterations = [];

        _.each(letters, value => {
          iterations.push(value);
        });

        expect(iterations).to.eql(["dog", "elephant", "flotsam"]);
      });

      it("should iterate over objects and provide access to each key", () => {
        const letters = { d: "dog", e: "elephant", f: "flotsam" };
        const iterations = [];

        _.each(letters, (value, property) => {
          iterations.push([value, property]);
        });

        expect(iterations).to.eql([
          ["dog", "d"],
          ["elephant", "e"],
          ["flotsam", "f"],
        ]);
      });

      it("should iterate over objects and provide access to the original object", () => {
        const letters = { d: "dog", e: "elephant", f: "flotsam" };
        const iterations = [];

        _.each(letters, (value, property, object) => {
          iterations.push([value, property, object]);
        });

        expect(iterations).to.eql([
          ["dog", "d", letters],
          ["elephant", "e", letters],
          ["flotsam", "f", letters],
        ]);
      });

      it("should not confuse an object with a `length` property for an array", () => {
        const dresser = { length: 39, width: 79, height: 127 };
        const iterations = [];

        _.each(dresser, (value, property, object) => {
          iterations.push([value, property, object]);
        });

        expect(iterations).to.eql([
          [39, "length", dresser],
          [79, "width", dresser],
          [127, "height", dresser],
        ]);
      });
    });

    describe("indexOf", () => {
      checkForNativeMethods(() => {
        _.indexOf([1, 2, 3], 2);
      });

      it("should find 40 in the list", () => {
        const numbers = [10, 20, 30, 40, 50];

        expect(_.indexOf(numbers, 40)).to.equal(3);
      });

      it("should be able to compute indexOf even when the native function is undefined", () => {
        const numbers = [10, 20, 30];

        expect(_.indexOf(numbers, 20)).to.equal(1);
      });

      it("returns -1 when the target cannot be found not in the list", () => {
        const numbers = [10, 20, 30, 40, 50];

        expect(_.indexOf(numbers, 35)).to.equal(-1);
      });

      it("returns the first index that the target can be found at when there are multiple matches", () => {
        const numbers = [1, 2, 2, 2, 3];
        expect(_.indexOf(numbers, 2)).to.equal(1);
      });
    });

    describe("filter", () => {
      checkForNativeMethods(() => {
        const isEven = function (num) {
          return num % 2 === 0;
        };
        _.filter([1, 2, 3, 4], isEven);
      });

      it("should return all even numbers in an array", () => {
        const isEven = function (num) {
          return num % 2 === 0;
        };
        const evens = _.filter([1, 2, 3, 4, 5, 6], isEven);

        expect(evens).to.eql([2, 4, 6]);
      });

      it("should return all odd numbers in an array", () => {
        const isOdd = function (num) {
          return num % 2 !== 0;
        };
        const odds = _.filter([1, 2, 3, 4, 5, 6], isOdd);

        expect(odds).to.eql([1, 3, 5]);
      });

      it("should produce a brand new array instead of modifying the input array", () => {
        const isOdd = function (num) {
          return num % 2 !== 0;
        };
        const numbers = [1, 2, 3, 4, 5, 6];
        const evens = _.filter(numbers, isOdd);

        expect(evens).to.not.equal(numbers);
      });
    });

    describe("reject", () => {
      checkForNativeMethods(() => {
        const isEven = function (num) {
          return num % 2 === 0;
        };
        _.reject([1, 2, 3, 4, 5, 6], isEven);
      });

      it("should reject all even numbers", () => {
        const isEven = function (num) {
          return num % 2 === 0;
        };
        const odds = _.reject([1, 2, 3, 4, 5, 6], isEven);

        expect(odds).to.eql([1, 3, 5]);
      });

      it("should reject all odd numbers", () => {
        const isOdd = function (num) {
          return num % 2 !== 0;
        };
        const evens = _.reject([1, 2, 3, 4, 5, 6], isOdd);

        expect(evens).to.eql([2, 4, 6]);
      });

      it("should produce a brand new array instead of modifying the input array", () => {
        const isOdd = function (num) {
          return num % 2 !== 0;
        };
        const numbers = [1, 2, 3, 4, 5, 6];
        const evens = _.reject(numbers, isOdd);

        expect(evens).to.not.equal(numbers);
      });
    });

    describe("uniq", () => {
      checkForNativeMethods(() => {
        _.uniq([1, 2, 3, 4]);
      });

      it("should not mutate the input array", () => {
        const input = [1, 2, 3, 4, 5];
        const result = _.uniq(input);

        expect(input).to.eql([1, 2, 3, 4, 5]);
      });

      it("should return all unique values contained in an unsorted array", () => {
        const numbers = [1, 2, 1, 3, 1, 4];

        expect(_.uniq(numbers)).to.eql([1, 2, 3, 4]);
      });

      it("should handle iterators that work with a sorted array", () => {
        const iterator = function (value) {
          return value === 1;
        };
        const numbers = [1, 2, 2, 3, 4, 4];

        expect(_.uniq(numbers, true, iterator)).to.eql([1, 2]);
      });

      it("should produce a brand new array instead of modifying the input array", () => {
        const numbers = [1, 2, 1, 3, 1, 4];
        const uniqueNumbers = _.uniq(numbers);

        expect(uniqueNumbers).to.not.equal(numbers);
      });
    });

    describe("map", () => {
      checkForNativeMethods(() => {
        _.map([1, 2, 3, 4], num => num * 2);
      });

      it("should not mutate the input array", () => {
        const input = [1, 2, 3, 4, 5];
        const result = _.map(input, _.identity);

        expect(input).to.eql([1, 2, 3, 4, 5]);
      });

      it("should apply a function to every value in an array", () => {
        const multiplyByTwo = function (num) {
          return num * 2;
        };

        expect(_.map([1, 2, 3], multiplyByTwo)).to.eql([2, 4, 6]);
      });

      it("should produce a brand new array instead of modifying the input array", () => {
        const numbers = [1, 2, 3];
        const mappedNumbers = _.map(numbers, num => num);

        expect(mappedNumbers).to.not.equal(numbers);
      });
    });

    describe("pluck", () => {
      checkForNativeMethods(() => {
        const people = [
          { name: "moe", age: 30 },
          { name: "curly", age: 50 },
        ];
        _.pluck(people, "name");
      });

      it("should return values contained at a user-defined property", () => {
        const people = [
          { name: "moe", age: 30 },
          { name: "curly", age: 50 },
        ];

        expect(_.pluck(people, "name")).to.eql(["moe", "curly"]);
      });

      it("should not modify the original array", () => {
        const people = [
          { name: "moe", age: 30 },
          { name: "curly", age: 50 },
        ];

        _.pluck(people, "name");

        expect(people).to.eql([
          { name: "moe", age: 30 },
          { name: "curly", age: 50 },
        ]);
      });
    });

    describe("reduce", () => {
      checkForNativeMethods(() => {
        const add = function (tally, item) {
          return tally + item;
        };
        _.reduce([1, 2, 3, 4], add);
      });

      it("should return a value", () => {
        const result = _.reduce([3, 2, 1], (memo, item) => item);
        expect(result).to.be.defined;
      });

      it("should not mutate the input array", () => {
        const input = [1, 2, 3, 4, 5];
        const result = _.reduce(input, (memo, item) => item);

        expect(input).to.eql([1, 2, 3, 4, 5]);
      });

      it("should invoke the iterator function with arguments (memo, item) in that order", () => {
        let memoInCallback;
        let itemInCallback;

        _.reduce(
          ["item"],
          (memo, item) => {
            memoInCallback = memo;
            itemInCallback = item;
          },
          "memo"
        );

        expect(memoInCallback).to.equal("memo");
        expect(itemInCallback).to.equal("item");
      });

      it("should pass items of the array into the iterator from left to right", () => {
        const orderTraversed = [];

        _.reduce(
          [1, 2, 3, 4],
          (memo, item) => {
            orderTraversed.push(item);
            return memo;
          },
          10
        );

        expect(orderTraversed).to.eql([1, 2, 3, 4]);
      });

      it("should continue to call iterator even if the iterator returns undefined", () => {
        let callCount = 0;
        const returnFalsy = function (total, item) {
          callCount += 1;
          if (callCount === 1) {
            return undefined;
          }
          return item + 1;
        };

        const total = _.reduce([1, 1, 2], returnFalsy);
        expect(total).to.equal(3);
      });

      it("should pass every item of the array into the iterator if a memo is passed in", () => {
        const result = _.reduce([1, 2, 3], (memo, item) => memo - item, 10);

        expect(result).to.equal(4);
      });

      it("should accept falsy value as an accumulator", () => {
        const result = _.reduce([1, 2, 3], (memo, item) => memo * item, 0);

        expect(result).to.equal(0);
      });

      it("should set memo to be the first item of the array if no memo is passed in", () => {
        const result = _.reduce([1, 2, 3], memo => memo);

        expect(result).to.equal(1);
      });

      it("should pass the second item of the array into the iterator first if a memo is not passed in", () => {
        const result = _.reduce([3, 2, 1], (memo, item) => memo - item);

        expect(result).to.equal(0);
      });
    });
  });
})();
