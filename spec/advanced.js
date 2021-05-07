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

  describe("Advanced", () => {
    describe("invoke, when provided a function reference", () => {
      checkForNativeMethods(() => {
        _.invoke(["dog", "cat"], _.identity);
      });

      it("runs the input function on each item in the array, and returns a list of results", () => {
        const reverse = function () {
          return this.split("").reverse().join("");
        };

        const reversedStrings = _.invoke(["dog", "cat"], reverse);

        expect(reversedStrings).to.eql(["god", "tac"]);
      });
    });

    describe("invoke, when provided a method name", () => {
      checkForNativeMethods(() => {
        _.invoke(["dog", "cat"], "toUpperCase");
      });

      it("runs the specified method on each item in the array, and returns a list of results", () => {
        const upperCasedStrings = _.invoke(["dog", "cat"], "toUpperCase");

        expect(upperCasedStrings).to.eql(["DOG", "CAT"]);
      });
    });

    describe("sortBy", () => {
      checkForNativeMethods(() => {
        _.sortBy(
          [
            { name: "curly", age: 50 },
            { name: "moe", age: 30 },
          ],
          person => person.age
        );
      });

      it("should sort by age", () => {
        let people = [
          { name: "curly", age: 50 },
          { name: "moe", age: 30 },
        ];
        people = _.sortBy(people, person => person.age);

        expect(_.pluck(people, "name")).to.eql(["moe", "curly"]);
      });

      it("should handle undefined values", () => {
        const list = [undefined, 4, 1, undefined, 3, 2];
        const result = _.sortBy(list, i => i);

        expect(result).to.eql([1, 2, 3, 4, undefined, undefined]);
      });

      it("should sort by length", () => {
        const list = ["one", "two", "three", "four", "five"];
        const sorted = _.sortBy(list, "length");

        expect(sorted).to.eql(["one", "two", "four", "five", "three"]);
      });

      it("should produce results that change the order of the list as little as possible", () => {
        const Pair = function (x, y) {
          this.x = x;
          this.y = y;
        };

        const collection = [
          new Pair(1, 1),
          new Pair(1, 2),
          new Pair(1, 3),
          new Pair(1, 4),
          new Pair(1, 5),
          new Pair(1, 6),
          new Pair(2, 1),
          new Pair(2, 2),
          new Pair(2, 3),
          new Pair(2, 4),
          new Pair(2, 5),
          new Pair(2, 6),
          new Pair(undefined, 1),
          new Pair(undefined, 2),
          new Pair(undefined, 3),
          new Pair(undefined, 4),
          new Pair(undefined, 5),
          new Pair(undefined, 6),
        ];

        const actual = _.sortBy(collection, pair => pair.x);

        expect(actual).to.eql(collection);
      });
    });

    describe("flatten", () => {
      checkForNativeMethods(() => {
        _.flatten([1, [2], [3, [[[4]]]]]);
      });

      it("can flatten nested arrays", () => {
        const nestedArray = [1, [2], [3, [[[4]]]]];

        expect(_.flatten(nestedArray)).to.eql([1, 2, 3, 4]);
      });
    });

    describe("zip", () => {
      checkForNativeMethods(() => {
        _.zip(["moe", "larry", "curly"], [30, 40, 50], [true]);
      });

      it("should zip together arrays of different lengths", () => {
        const names = ["moe", "larry", "curly"];
        const ages = [30, 40, 50];
        const leaders = [true];

        expect(_.zip(names, ages, leaders)).to.eql([
          ["moe", 30, true],
          ["larry", 40, undefined],
          ["curly", 50, undefined],
        ]);
      });
    });

    describe("intersection", () => {
      checkForNativeMethods(() => {
        _.intersection(["moe", "curly", "larry"], ["moe", "groucho"]);
      });

      it("should take the set intersection of two arrays", () => {
        const stooges = ["moe", "curly", "larry"];
        const leaders = ["moe", "groucho"];

        expect(_.intersection(stooges, leaders)).to.eql(["moe"]);
      });
    });

    describe("difference", () => {
      checkForNativeMethods(() => {
        _.difference([1, 2, 3], [2, 30, 40]);
      });

      it("should return the difference between two arrays", () => {
        const diff = _.difference([1, 2, 3], [2, 30, 40]);

        expect(diff).to.eql([1, 3]);
      });

      it("should return the difference between three arrays", () => {
        const result = _.difference([1, 2, 3, 4], [2, 30, 40], [1, 11, 111]);

        expect(result).to.eql([3, 4]);
      });
    });

    describe("throttle, when given a wait of 100ms", () => {
      let callback;

      beforeEach(() => {
        callback = sinon.spy();
      });

      checkForNativeMethods(() => {
        _.throttle(callback, 100);
      });

      it("should return a function callable twice in the first 200ms", () => {
        const fn = _.throttle(callback, 100);
        fn(); // called
        setTimeout(fn, 50);
        setTimeout(fn, 100); // called
        setTimeout(fn, 150);
        setTimeout(fn, 199);
        clock.tick(200);

        expect(callback).to.have.been.calledTwice;
      });
    });
  });
})();
