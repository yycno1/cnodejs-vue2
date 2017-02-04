import Alert from 'components/confirm';
import util from '../common/util';

const nameSpace = '$confirm';
const dialogContentSelector = '.dialog-content';

let instance;

export default{
  install(Vue) {
    function alert(...args) {
      const argsLen = args.length;
      let options = {};

      if (argsLen === 0) {
        throw new Error(`${nameSpace} function needs at least one argument`);
      }

      if (!instance) {
        const ConfirmComponent = Vue.extend(Alert);
        instance = new ConfirmComponent().$mount();
        document.body.appendChild(instance.$el);
      } else {
        instance.$off('confirm');
        instance.$off('cancel');
      }

      const type1 = util.typeof(args[0]);
      const type2 = util.typeof(args[1]);

      if (type1 === 'object') {
        options = args[0];
      } else {
        if (type2 === 'function') {
          options.onConfirm = args[1];
        } else if (type2 === 'object') {
          options = args[1];
        }
        options.content = String(args[0]);
      }

      for (const key of Object.keys(options)) {
        if (key === 'content') {
          instance.$el.querySelector(dialogContentSelector).innerHTML = options[key];
        } else if (key === 'onConfirm') {
          instance.$on('confirm', options[key]);
        } else if (key === 'onCancel') {
          instance.$on('cancel', options[key]);
        } else {
          instance[key] = options[key];
        }
      }

      instance.showDialog = true;
      return instance;
    }

    Vue.prototype[nameSpace] = alert;
  },
};
