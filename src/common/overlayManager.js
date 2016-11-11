import Vue from 'Vue';
import overlaySetting from 'components/overlay';

// 获得遮盖层构造器
const Overlay = Vue.extend(overlaySetting);

// 遮盖层zIndex
const overlayIndex = 20000;

// 自增的弹出层zIndex
let index = 20001;

function getIndex() {
  index += 1;
  return index;
}

const overlayManager = {
  // 缓存所有弹出层实例
  popupInstances: [],
  // 唯一遮盖层实例
  overlayInstance: false,
  // 如果已有一个弹出层，则更新遮盖层，否则，显示一个遮盖层
  onPopupOpen(instance) {
    if (!instance) {
      return;
    }
    if (this.popupInstances.length > 0) {
      this.updateOverlay(instance);
    } else {
      this.showOverlay(instance);
    }
    this.popupInstances.push(instance);
  },
  // 如果只有一个弹出层，则关闭遮盖层
  // 如果关闭的是最外层弹出层，则更新遮盖层
  onPopupClose(instance) {
    const popupInstances = this.popupInstances;
    const len = popupInstances.length;
    const i = popupInstances.indexOf(instance);
    if (!instance || len === 0 || i === -1) {
      return;
    }
    popupInstances.splice(i, 1);
    if (i === 0) {
      this.closeOverlay();
    } else if (i === len - 1) {
      this.updateOverlay(popupInstances[i - 1]);
    }
  },
  // 如果还没有遮盖层实例，则实例化一个遮盖层对象，并挂载到文档中
  // 更新遮盖层并显示
  showOverlay(instance) {
    if (!this.overlayInstance) {
      const overlay = this.overlayInstance = new Overlay().$mount();
      document.body.appendChild(overlay.$el);
      overlay.show = true;
      overlay.zIndex = overlayIndex;
    }
    this.overlayInstance.show = true;
    this.updateOverlay(instance);
  },
  // 用新弹出层的属性更新遮盖层对象
  updateOverlay(instance) {
    const overlay = this.overlayInstance;
    overlay.bgColor = instance.overlayColor;
    overlay.opacity = instance.overlayOpacity;
    if (typeof instance.overlayClick === 'function') {
      overlay.overlayClick = instance.overlayClick;
    }
    instance.$el.style.zIndex = getIndex();
  },
  // 移除遮盖层
  closeOverlay() {
    this.overlayInstance.show = false;
  },
};

export default overlayManager;
