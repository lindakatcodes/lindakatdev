// eslint-disable-next-line import/no-extraneous-dependencies
import Vue from 'vue';
import VueTippy, { TippyComponent } from 'vue-tippy';

Vue.use(VueTippy, {
  directive: 'tippy',
  arrow: true,
  animation: 'scale',
  duration: [275, 325],
  onShow(instance) {
    if (instance.id === 2) {
      setTimeout(() => {
        instance.hide();
      }, 2000);
    }
  },
});

Vue.component('Tippy', TippyComponent);
