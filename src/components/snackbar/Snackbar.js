import Snackbar from "./Snackbar.vue";
import Vue from 'vue'

const v = new Vue({
  render(createElement) {
    return createElement(Snackbar);
  }
});
v.$mount();
document.body.appendChild(v.$el);

const snackbar = v.$children[0];

function info(mes,color) {
  snackbar.info(mes,color);
}

export default {
  info,
}
