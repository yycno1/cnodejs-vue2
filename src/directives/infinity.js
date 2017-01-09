import util from '../common/util';

export default{
  name: 'infinity',

  inserted(el, binding, { context }) {
    const wait = 200;

    let flag = false;

    function scrollHandler() {
      const offsetH = el.offsetHeight;
      const scrollH = el.scrollHeight;
      const scrollTop = el.scrollTop;
      if (flag || scrollH - offsetH - scrollTop > 0) {
        return;
      }
      flag = true;
      const infinityCall = binding.value;
      if (typeof infinityCall === 'function') {
        Promise.resolve(infinityCall.call(context))
          .then(() => {
            flag = false;
          })
          .catch(() => {
            flag = false;
          });
      }
    }

    // 控制回调执行频率
    const throttleHandler = util.throttle(scrollHandler, wait);
    // 用于解绑
    el.scrollHandler = throttleHandler;
    el.addEventListener('scroll', throttleHandler);
  },
  unbind(el) {
    el.removeEventListener('scroll', el.scrollHandler);
  },
};
