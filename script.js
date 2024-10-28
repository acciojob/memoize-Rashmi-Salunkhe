function memoize(callback, resolver = JSON.stringify) {
    let cache = new Map();
  
    const memoizedFn = (...args) => {
      const key = resolver(...args);
  
      if (cache.has(key)) {
        return cache.get(key);
      }
  
      const val = callback(...args);
      cache.set(key, val);
  
      return val;
    };
  
    memoizedFn.clear = () => cache.clear();
  
    memoizedFn.delete = (...args) => {
      const key = resolver(...args);
      cache.delete(key);
    };
  
    memoizedFn.has = (...args) => {
      const key = resolver(...args);
      return cache.has(key);
    };
  
    return memoizedFn;
  }
  
  module.exports = memoize;
