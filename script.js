  function memoize(callback, resolver = (...args) => JSON.stringify(args)) {
            const cache = new Map();

            const memoizedFn = function(...args) {
                // Generate the cache key either with the resolver or JSON.stringify by default
                const key = resolver(...args);

                if (cache.has(key)) {
                    return cache.get(key);  // Return cached result
                }

                const result = callback(...args);  // Call the original function
                cache.set(key, result);  // Cache the result
                return result;
            };

            // Clear all cache
            memoizedFn.clear = function() {
                cache.clear();
            };

            // Delete specific cache entry
            memoizedFn.delete = function(...args) {
                const key = resolver(...args);
                return cache.delete(key);
            };

            // Check if cache entry exists
            memoizedFn.has = function(...args) {
                const key = resolver(...args);
                return cache.has(key);
            };

            return memoizedFn;
        }

        // Sample usage
        const callback = (...args) => args;

        // Test 1: Memoizing based on all arguments
        const memoized = memoize(callback);
        console.log(memoized(123)); // calls callback, returns [123]
        console.log(memoized(123)); // returns [123] from cache
        console.log(memoized(123, 'abc')); // calls callback, returns [123, 'abc']
        console.log(memoized(123, 'abc')); // returns [123, 'abc'] from cache

        // Test 2: Custom resolver (caches based on the first argument only)
        const memoized2 = memoize(callback, args => args[0]);
        console.log(memoized2(123)); // calls callback, returns [123]
        console.log(memoized2(123)); // returns [123] from cache
        console.log(memoized2(123, 'abc')); // returns [123] from cache, due to custom resolver
        console.log(memoized2('abc', 123)); // calls callback, returns ['abc', 123]

        // Testing cache methods
        console.log(memoized2.has(123)); // true
        memoized2.delete(123); // delete entry for [123]
        console.log(memoized2.has(123)); // false
        memoized2.clear(); // clear entire cache
  module.exports = memoize;
  
