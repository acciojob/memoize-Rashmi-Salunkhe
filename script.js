  function memoize(callback, resolver = (...args) => JSON.stringify(args)) {
            const cache = new Map();

            const memoizedFn = function(...args) {
                const key = resolver(...args);
                if (cache.has(key)) {
                    return cache.get(key);
                }
                const result = callback(...args);
                cache.set(key, result);
                return result;
            };

            // Method to clear the entire cache
            memoizedFn.clear = function() {
                cache.clear();
            };

            // Method to delete a specific cache entry
            memoizedFn.delete = function(...args) {
                const key = resolver(...args);
                return cache.delete(key);
            };

            // Method to check if a cache entry exists
            memoizedFn.has = function(...args) {
                const key = resolver(...args);
                return cache.has(key);
            };

            return memoizedFn;
        }

        // Sample usage
        const callback = (...args) => args;
        const memoized = memoize(callback);

        console.log(memoized(123)); // calls callback, returns [123]
        console.log(memoized(123)); // returns [123] from cache
        console.log(memoized(123, 'abc')); // calls callback, returns [123, 'abc']
        console.log(memoized(123, 'abc')); // returns [123, 'abc'] from cache

        // Custom resolver example
        const memoized2 = memoize(callback, args => args[0]);
        console.log(memoized2(123)); // calls callback, returns 123
        console.log(memoized2(123)); // returns 123 from cache
        console.log(memoized2(123, 'abc')); // returns 123 (based on first argument)
        console.log(memoized2('abc', 123)); // calls callback, returns ['abc', 123]

        // Check cache methods
        console.log(memoized.has(123)); // true
        memoized.delete(123); // delete entry for [123]
        console.log(memoized.has(123)); // false
        memoized.clear(); // clear entire cache
  module.exports = memoize;
  
