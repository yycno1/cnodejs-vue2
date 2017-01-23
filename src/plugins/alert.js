import AlertConstructor from 'components/alert';
import util from '../common/util';

let instance;

function $alert(text, callback, options) {
  if (!instance) {
    instance = new AlertConstructor().$mount();
    document.body.appendChild(instance.$el);
  }

  if (util.typeof(callback)) {

  }
}

function install(Vue) {

}

export default{
  install(Vue) {

  },
};
