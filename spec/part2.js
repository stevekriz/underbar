(function () {
  const checkForNativeMethods = function (runUnderbarFunction) {
    it('should not use the native version of any underbar methods in its implementation', () => {
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

  describe('Part II', () => {
    describe('contains', () => {
      checkForNativeMethods(() => {
        _.contains([4, 5, 6], 2);
      });

      it('should not mutate the input array', () => {
        const input = [1, 2, 3, 4, 5];
        const result = _.contains(input, 4);

        expect(result).to.be.true;
      });

      it('should return true given an array and a value from that array', () => {
        const array = [1, 2, 3];
        const value = 1;
        expect(_.contains(array, value)).to.be.true;
      });

      it('should return false given an array and a value not in that array', () => {
        const array = [1, 2, 3];
        const value = 4;
        expect(_.contains(array, value)).to.be.false;
      });

      it('should return true given a object and a value from that object', () => {
        const object = { a: 1, b: 2, c: 3 };
        const value = 1;
        expect(_.contains(object, value)).to.be.true;
      });

      it('should return false given an object and a value not in that object', () => {
        const object = { a: 1, b: 2, c: 3 };
        const value = 4;
        expect(_.contains(object, value)).to.be.false;
      });
    });

    describe('every', () => {
      const isEven = function (num) {
        return num % 2 === 0;
      };

      checkForNativeMethods(() => {
        _.every([4, 5, 6], _.identity);
      });

      it('passes by default for an empty collection', () => {
        expect(_.every([], _.identity)).to.be.true;
      });

      it('passes for a collection of all-truthy values', () => {
        expect(_.every([true, {}, 1], _.identity)).to.be.true;
      });

      it('fails for a collection of all-falsy values', () => {
        expect(_.every([null, 0, undefined], _.identity)).to.be.false;
      });

      it('fails for a collection containing mixed falsy and truthy values', () => {
        expect(_.every([true, false, 1], _.identity)).to.be.false;
        expect(_.every([1, undefined, true], _.identity)).to.be.false;
      });

      it('should work when provided a collection containing undefined values', () => {
        expect(_.every([undefined, undefined, undefined], _.identity)).to.be
          .false;
      });

      it('should cast the result to a boolean', () => {
        expect(_.every([1], _.identity)).to.be.true;
        expect(_.every([0], _.identity)).to.be.false;
      });

      it('should handle callbacks that manipulate the input', () => {
        expect(_.every([0, 10, 28], isEven)).to.be.true;
        expect(_.every([0, 11, 28], isEven)).to.be.false;
      });

      it('should work when no callback is provided', () => {
        expect(_.every([true, true, true])).to.be.true;
        expect(_.every([true, true, false])).to.be.false;
        expect(_.every([false, false, false])).to.be.false;
      });
    });

    describe('some', () => {
      const isEven = function (number) {
        return number % 2 === 0;
      };

      checkForNativeMethods(() => {
        _.some([4, 5, 6], _.identity);
      });

      it('should fail by default for an empty collection', () => {
        expect(_.some([])).to.be.false;
      });

      it('should pass for a collection of all-truthy results', () => {
        expect(_.some([true, {}, 1], _.identity)).to.be.true;
      });

      it('should fail for a collection of all-falsy results', () => {
        expect(_.some([null, 0, undefined], _.identity)).to.be.false;
      });

      it('should pass for a collection containing mixed falsy and truthy results', () => {
        expect(_.some([true, false, 1], _.identity)).to.be.true;
      });

      it('should pass for a set containing one truthy value that is a string', () => {
        expect(_.some([null, 0, 'yes', false], _.identity)).to.be.true;
      });

      it('should fail for a set containing no matching values', () => {
        expect(_.some([1, 11, 29], isEven)).to.be.false;
      });

      it('should pass for a collection containing one matching value', () => {
        expect(_.some([1, 10, 29], isEven)).to.be.true;
      });

      it('should cast the result to a boolean', () => {
        expect(_.some([1], _.identity)).to.be.true;
        expect(_.some([0], _.identity)).to.be.false;
      });

      it('should work when no callback is provided', () => {
        expect(_.some([true, true, true])).to.be.true;
        expect(_.some([true, true, false])).to.be.true;
        expect(_.some([false, false, false])).to.be.false;
      });
    });

    describe('extend', () => {
      checkForNativeMethods(() => {
        _.extend({ a: 1 }, { b: 1 }, { c: 1 });
      });

      it('returns the first argument', () => {
        const destination = {};
        const source = {};
        const extended = _.extend(destination, source);

        expect(extended).to.equal(destination);
      });

      it('should extend an object with the attributes of another', () => {
        const destination = {};
        const source = { a: 'b' };
        const extended = _.extend(destination, source);

        expect(extended.a).to.equal('b');
      });

      it('should override properties found on the destination', () => {
        const destination = { a: 'x' };
        const source = { a: 'b' };
        const extended = _.extend(destination, source);

        expect(extended.a).to.equal('b');
      });

      it('should not override properties not found in the source', () => {
        const destination = { x: 'x' };
        const source = { a: 'b' };
        const extended = _.extend(destination, source);

        expect(extended.x).to.equal('x');
      });

      it('should extend from multiple source objects', () => {
        const extended = _.extend({ x: 1 }, { a: 2 }, { b: 3 });

        expect(extended).to.eql({ x: 1, a: 2, b: 3 });
      });

      it("in the case of a conflict, it should use the last property's values when extending from multiple source objects", () => {
        const extended = _.extend({ x: 'x' }, { a: 'a', x: 2 }, { a: 1 });

        expect(extended).to.eql({ x: 2, a: 1 });
      });
    });

    describe('defaults', () => {
      checkForNativeMethods(() => {
        _.defaults({ a: 1 }, { b: 1 }, { c: 1 });
      });

      it('should return the original target object', () => {
        const destination = {};
        const source = {};
        const defaulted = _.defaults(destination, source);

        expect(defaulted).to.equal(destination);
      });

      it('should copy a property if that key is not already set on the target', () => {
        const destination = {};
        const source = { a: 1 };

        _.defaults(destination, source);

        expect(destination.a).to.equal(1);
      });

      it('should copy any property whose key is not already set on the target', () => {
        const destination = { a: 10 };
        const source = { a: 1 };

        _.defaults(destination, source);

        expect(destination.a).to.equal(10);
      });

      it('should not copy a property if that key is already set on the target', () => {
        const destination = { a: 10 };
        const source = { a: 1 };

        _.defaults(destination, source);

        expect(destination.a).to.equal(10);
      });

      it('should not copy any property whose key is already set on the target', () => {
        const destination = { a: 1, b: 2 };
        const source = { a: 100, b: 200, c: 300 };

        _.defaults(destination, source);

        expect(destination.a).to.equal(1);
        expect(destination.b).to.equal(2);
        expect(destination.c).to.equal(300);
      });

      it('should not copy a property if that key is already set on the target, even if the value for that key is falsy', () => {
        const destination = { a: '', b: 0, c: NaN };
        const source = { a: 1, b: 2, c: 3 };

        _.defaults(destination, source);

        expect(destination.a).to.equal('');
        expect(destination.b).to.equal(0);
        expect(isNaN(destination.c)).to.equal(true);
      });

      it('should copy properties source an arbitrary number of source objects', () => {
        const destination = {};
        const source = { a: 1 };
        const anotherSource = { b: 2, c: 'three' };
        const aThirdSource = { d: 'four' };

        _.defaults(destination, source, anotherSource, aThirdSource);

        expect(destination.a).to.equal(1);
        expect(destination.b).to.equal(2);
        expect(destination.c).to.equal('three');
        expect(destination.d).to.equal('four');
      });

      it('should prefer the first value found when two objects are provided with properties at the same key', () => {
        const destination = {};
        const source = { a: 1 };
        const anotherSource = { a: 'one' };

        _.defaults(destination, source, anotherSource);

        expect(destination.a).to.equal(1);
      });
    });

    describe('once', () => {
      checkForNativeMethods(() => {
        let num = 0;
        const increment = _.once(() => {
          num += 1;
        });
      });

      it('should return a function', () => {
        const noop = _.once(() => {});

        expect(noop).to.be.an.instanceOf(Function);
      });

      it('should only run a user-defined function if it has not been run before', () => {
        let num = 0;
        const increment = _.once(() => {
          num += 1;
        });

        increment();
        increment();
        increment();

        expect(num).to.equal(1);
      });

      it('should apply arguments to the user-defined function', () => {
        const add = _.once((x, y, z) => x + y + z);

        expect(add(1, 2, 3)).to.equal(6);
      });

      it('should return the result of the first call for every subsequent call', () => {
        const add = _.once((x, y, z) => x + y + z);

        expect(add(1, 2, 3)).to.equal(6);
        expect(add(4, 5, 6)).to.equal(6);
        expect(add(7, 8, 9)).to.equal(6);
      });
    });

    describe('memoize', () => {
      let add;
      let memoAdd;

      beforeEach(() => {
        add = function (a, b) {
          return a + b;
        };

        memoAdd = _.memoize(add);
      });

      checkForNativeMethods(() => {
        _.memoize((a, b) => a + b);
      });

      it('should produce the same result as the non-memoized version', () => {
        expect(add(1, 2)).to.equal(3);
        expect(memoAdd(1, 2)).to.equal(3);
      });

      it('should give different results for different arguments', () => {
        expect(memoAdd(1, 2)).to.equal(3);
        expect(memoAdd(3, 4)).to.equal(7);
        expect(memoAdd(1, 3)).to.equal(4);
      });

      it('should not run the memoized function twice when given a primitive type as an argument', () => {
        const spy = sinon.spy(() => 'Dummy output');
        const memoSpy = _.memoize(spy);

        memoSpy(10);
        expect(spy).to.have.been.calledOnce;
        memoSpy(10);
        expect(spy).to.have.been.calledOnce;
      });

      it('should not run the memoized function twice when given a reference type as an argument', () => {
        const spy = sinon.spy(() => 'Dummy output');
        const memoSpy = _.memoize(spy);

        memoSpy([1, 2, 3]);
        expect(spy).to.have.been.calledOnce;
        memoSpy([1, 2, 3]);
        expect(spy).to.have.been.calledOnce;
      });

      it('should run the memoized function twice when given an array and then given a list of arguments', () => {
        const spy = sinon.spy(() => 'Dummy output');
        const memoSpy = _.memoize(spy);

        memoSpy([1, 2, 3]);
        expect(spy).to.have.been.calledOnce;
        memoSpy(1, 2, 3);
        expect(spy).to.have.been.calledTwice;
      });
    });

    describe('delay', () => {
      let callback;

      beforeEach(() => {
        callback = sinon.spy();
      });

      checkForNativeMethods(() => {
        _.delay(callback, 100);
      });

      it('should only execute the function after the specified wait time', () => {
        _.delay(callback, 100);
        clock.tick(99);

        expect(callback).to.have.not.been.called;

        clock.tick(1);

        expect(callback).to.have.been.calledOnce;
      });

      it('should have successfully passed function arguments in', () => {
        _.delay(callback, 100, 1, 2);
        clock.tick(100);

        expect(callback).to.have.been.calledWith(1, 2);
      });
    });

    describe('shuffle', () => {
      checkForNativeMethods(() => {
        _.shuffle([1, 2, 3, 4]);
      });

      it('should not modify the original object', () => {
        const numbers = [4, 5, 6];
        const shuffled = _.shuffle(numbers).sort();

        expect(shuffled).to.not.equal(numbers);
        expect(numbers).to.eql([4, 5, 6]);
      });

      it('should maintain same array length', () => {
        const numbers = [1, 1, 2, 3];
        const shuffled = _.shuffle(numbers);

        expect(shuffled.length).to.equal(numbers.length);
      });

      it('should have the same elements as the original object', () => {
        const numbers = [4, 5, 6];
        const shuffled = _.shuffle(numbers).sort();

        expect(shuffled).to.eql([4, 5, 6]);
      });

      it('should not be in the same order as the original object', () => {
        const numbers = [4, 5, 6, 7, 8, 9, 10];
        const shuffled = _.shuffle(numbers);

        // This test will fail 1/9! times
        expect(shuffled).to.not.eql([4, 5, 6, 7, 8, 9, 10]);
      });
    });
  });
})();
