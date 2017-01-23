import Vue from 'Vue';
import modalSetting from 'components/modal';

// 获得遮盖层构造器
const Modal = Vue.extend(modalSetting);

export default{
  // modal初始化时的zindex
  modalZIndex: 20000,
  // 不断增加的zIndex
  zIndex: 20000,

  // 缓存所有弹出层实例
  popupInstances: [],
  // 缓存遮盖层实例
  modalInstance: false,

  nextZIndex() {
    this.zIndex += 1;
    return this.zIndex;
  },

  // 获取遮盖层实例 没有缓存则实例化一个
  getModal() {
    let modalInstance = this.modalInstance;
    if (!modalInstance) {
      modalInstance = new Modal().$mount();
      document.body.appendChild(modalInstance.$el);
      this.modalInstance = modalInstance;

      modalInstance.$el.addEventListener('touchmove', (event) => {
        event.preventDefault();
        event.stopPropagation();
      });
      modalInstance.$on('modalClick', () => {
        this.doOnModalClick();
      });
    }

    return modalInstance;
  },

  // 如果已有一个弹出层，则更新遮盖层，否则，显示遮盖层
  onPopupOpen(instance) {
    if (!instance) {
      return;
    }
    if (this.popupInstances.length === 0) {
      this.showModal(instance);
    }
    this.updateZIndex(instance);
    this.updateModal(instance);
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
      this.closeModal();
    } else if (i === len - 1) {
      this.updateZIndex(popupInstances[i - 1]);
      this.updateModal(popupInstances[i - 1]);
    }
  },
  // 如果还没有遮盖层实例，则实例化一个遮盖层对象，并挂载到文档中
  // 更新遮盖层并显示
  showModal() {
    const modalInstance = this.getModal();
    modalInstance.show = true;
  },
  // 用新弹出层的属性更新遮盖层对象
  updateModal(instance) {
    const modalInstance = this.getModal();
    modalInstance.bgColor = instance.modalColor;
    modalInstance.opacity = instance.modalOpacity;
    modalInstance.zIndex = instance.modalZIndex;
    modalInstance.transitionDuration = instance.modalTransitionDuration;
  },
  updateZIndex(instance) {
    // 是否覆盖其他弹出层
    if (instance.cover) {
      instance.modalZIndex = this.nextZIndex();
    } else {
      instance.modalZIndex = this.modalZIndex;
    }
    instance.$el.style.zIndex = this.nextZIndex();
  },
  // 移除遮盖层
  closeModal() {
    const modalInstance = this.getModal();
    modalInstance.show = false;
  },
  doOnModalClick() {
    const topInstance = this.popupInstances[this.popupInstances.length - 1];
    if (!topInstance) {
      this.closeModal();
      return;
    }
    topInstance.$emit('modalClick');
    if (topInstance.closeOnClickModal) {
      topInstance.show = false;
      this.closeModal();
    }
  },
};
