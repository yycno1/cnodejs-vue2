function getNow() {
  return new Date().getTime();
}

export default{
  throttle(action, delay) {
    let context = null;
    let argsCache = null;
    let previous = getNow();
    let timer = null;

    function timeout() {
      previous = getNow();
      timer = null;
      action.apply(context, argsCache);
      if (!timer) {
        context = argsCache = null;
      }
    }

    function throttleFunc(...args) {
      const now = getNow;
      const rest = delay - (now - previous);
      context = this;
      argsCache = args;
      if (rest <= 0 || rest > delay) {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        previous = now;
        action.apply(context, argsCache);
        if (!timer) {
          context = argsCache = null;
        }
      } else if (!timer) {
        timer = setTimeout(timeout, delay);
      }
    }
    return throttleFunc;
  },
};
